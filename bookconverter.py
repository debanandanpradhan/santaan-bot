import os
import time
import pdfplumber
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
import cohere
from cohere.errors import TooManyRequestsError

# Load environment variables
load_dotenv()
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX = os.getenv("PINECONE_INDEX")
COHERE_API_KEY = os.getenv("COHERE_API_KEY")

# Initialize clients
pc = Pinecone(api_key=PINECONE_API_KEY)
co = cohere.Client(COHERE_API_KEY)

# Constants
EMBED_MODEL = "embed-english-v3.0"
MAX_TOKENS_PER_MIN = 100000
TOKEN_MARGIN = 5000  # To stay safely under the limit

# Create Pinecone index if it doesn’t exist
if PINECONE_INDEX not in pc.list_indexes().names():
    pc.create_index(
        name=PINECONE_INDEX,
        dimension=1024,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")
    )

index = pc.Index(PINECONE_INDEX)

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file."""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text.strip()

def split_text(text, chunk_size=200):
    """Split text into smaller chunks."""
    words = text.split()
    return [" ".join(words[i:i + chunk_size]) for i in range(0, len(words), chunk_size)]

def count_tokens(texts, model_name=EMBED_MODEL):
    """Use Cohere’s tokenize to count total tokens."""
    total_tokens = 0
    for t in texts:
        tokens = co.tokenize(text=t, model=model_name).tokens
        total_tokens += len(tokens)
    return total_tokens

def embed_text_with_retry(texts, model=EMBED_MODEL):
    """Embed text with automatic retry on rate limit."""
    while True:
        try:
            response = co.embed(
                texts=texts,
                model=model,
                input_type="search_document"
            )
            return response.embeddings
        except TooManyRequestsError as e:
            print("⚠️ Rate limit hit. Sleeping for 60 seconds...")
            time.sleep(60)

def store_book_in_pinecone(book_path):
    """Extract, chunk, embed, and upsert into Pinecone."""
    if book_path.endswith(".pdf"):
        text = extract_text_from_pdf(book_path)
    elif book_path.endswith(".txt"):
        with open(book_path, "r", encoding="utf-8") as f:
            text = f.read()
    else:
        raise ValueError("Unsupported file format. Use .pdf or .txt")

    chunks = split_text(text)
    batch = []
    token_sum = 0

    for i, chunk in enumerate(chunks):
        tokens = count_tokens([chunk])
        if token_sum + tokens > MAX_TOKENS_PER_MIN - TOKEN_MARGIN:
            # Process current batch
            embeddings = embed_text_with_retry(batch)
            vectors = [
                (f"chunk-{i - len(batch) + j}", embeddings[j], {"text": batch[j]})
                for j in range(len(batch))
            ]
            index.upsert(vectors)
            print(f"✅ Uploaded batch of {len(batch)} chunks")

            # Reset batch and tokens
            batch = [chunk]
            token_sum = tokens
            time.sleep(60)  # Wait for 1 minute to avoid token limit
        else:
            batch.append(chunk)
            token_sum += tokens

    # Final batch
    if batch:
        embeddings = embed_text_with_retry(batch)
        vectors = [
            (f"chunk-{len(chunks) - len(batch) + j}", embeddings[j], {"text": batch[j]})
            for j in range(len(batch))
        ]
        index.upsert(vectors)
        print(f"✅ Uploaded final batch of {len(batch)} chunks")

    print("🎉 Book uploaded to Pinecone successfully!")

# Run the script
store_book_in_pinecone("./MERGED.pdf")
