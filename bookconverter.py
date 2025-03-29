import os
import pdfplumber
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
from sentence_transformers import SentenceTransformer

# Load environment variables
load_dotenv()
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX = os.getenv("PINECONE_INDEX")

# Initialize Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)

# Check if the index exists, otherwise create it
if PINECONE_INDEX not in pc.list_indexes().names():
    pc.create_index(
        name=PINECONE_INDEX,
        dimension=384,  # Hugging Face model output size
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-west-1")
    )

# Connect to the index
index = pc.Index(PINECONE_INDEX)

# Load Hugging Face embedding model
hf_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def embed_text(text):
    """Convert text to embeddings using Hugging Face model."""
    return hf_model.encode(text).tolist()

def split_text(text, chunk_size=200):
    """Split text into smaller chunks to avoid exceeding Pinecone limits."""
    words = text.split()
    return [" ".join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file."""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text.strip()

def store_book_in_pinecone(book_path):
    """Read book, create embeddings, and store in Pinecone."""
    if book_path.endswith(".pdf"):
        text = extract_text_from_pdf(book_path)
    elif book_path.endswith(".txt"):
        with open(book_path, "r", encoding="utf-8") as f:
            text = f.read()
    else:
        raise ValueError("Unsupported file format. Use a .pdf or .txt file.")

    chunks = split_text(text)
    vectors = []

    for i, chunk in enumerate(chunks):
        embedding = embed_text(chunk)
        vectors.append((str(i), embedding, {"text": chunk}))

        # Pinecone 4MB limit safeguard: Upsert in batches
        if len(vectors) >= 50:
            index.upsert(vectors)
            vectors = []

    # Upsert remaining vectors
    if vectors:
        index.upsert(vectors)

    print("✅ Book stored successfully in Pinecone!")

# Run the function with your book file
book_path = './MERGED.pdf'  # Update with actual file path
store_book_in_pinecone(book_path)
