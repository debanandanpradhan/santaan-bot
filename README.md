# Santaan Chatbot
Santaan-RAG Bot is a full-stack MERN chatbot that integrates retrieval-augmented generation (RAG) with AI models, Pinecone, and scientific databases to provide precise, research-backed answers related to In Vitro Fertilization (IVF), In Vitro Maturation (IVM), and Assisted Reproductive Technologies (ART). It is desiged with an interactive UI to help end users explore different topics and related questions.

The chatbot enhances user experience by combining vector embeddings, Firebase authentication, and advanced AI APIs to offer users personalized and concise responses. It stores preprocessed book content as vectorized embeddings in Pinecone, enabling fast search and retrieval. By integrating OpenAlex and Hugging Face models, it also fetches the latest scientific insights to deliver accurate, real-time answers. The chatbot responds to user queries with text-based responses refined through Groq AI offering multi-dimensional insights from both textbook data and live research sources. This makes the bot useful for researchers, IVF practitioners, and medical students.
# Key Features
## User Authentication:
Secure login/signup using Firebase.
## Book Vector Storage: 
Textbook content chunked and stored as embeddings in Pinecone.
## Scientific API Integration:
Fetches real-time data from OpenAlex.
## Concise Answers: 
Uses Groq API for optimized response generation.
## Interactive UI:
Smooth user experience with React.js with high accuracy of the query responses.
# Backend
## Express.js & Node.js Setup:
The backend forms the foundation of the Santaan-RAG Bot. Built on Node.js and Express.js, it handles server-side operations, API requests, and database interactions. The backend includes multiple routes to process login, signup, and query handling requests. Middleware like helmet (for security), morgan (for logging), and rate-limit (to limit excessive requests) have been integrated to enhance the reliability and security of the backend. Additionally, the project uses dotenv to manage environment variables such as API keys and Firebase configurations.
## Pinecone Vector Database Integration:
The backend integrates with Pinecone, a powerful vector database used to store book content in vectorized form. Each book is split into chunks (200-word segments), converted into embeddings using the Hugging Face Inference API (MiniLM-L6-v2), and stored as high-dimensional vectors in Pinecone. This allows fast vector similarity search whenever users ask a question, helping the chatbot retrieve the most contextually relevant text chunks.
## Authentication:
User authentication is implemented via Firebase Admin SDK, allowing users to securely log in and maintain session persistence. Token-based authentication ensures that only authenticated users can interact with the chatbot. The Firebase setup supports email-password-based login and maintains user data securely.
## Steps to setup backend:
### 1. Upload the book into Pinecone using `bookcoverter.py`
run this into command line after opening the script```pip install pdfplumber python-dotenv pinecone-client sentence-transformers```
### 2. Create a `.env` file in the root folder and paste these
```
PINECONE_API_KEY=
PINECONE_INDEX=
PINECONE_ENVIRONMENT=
OPENAI_API_KEY=
GROQ_API_KEY=

```
### 3. Run `bookconverter.py`
### 4. Navigate to backend folder and run this in command line if setting up from scratch
`npm install axios cors dotenv express express-rate-limit firebase-admin helmet morgan @huggingface/inference @pinecone-database/pinecone` else if cloning `npm install` 
### 5. Make sure to setup firebase and get the `serviceAccontKey.json`
### 6. create a .env file in backend folder and paste these
```
PORT=5000
FIREBASE_PROJECT_ID=
PINECONE_API_KEY=
PINECONE_INDEX=
PINECONE_ENVIRONMENT=
PINECONE_HOST=
GROQ_API_KEY=
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
HUGGINGFACE_API_KEY=
OPENALEX_API_KEY=424242

```
# Frontend Setup:
 
### 7. Navigate to the frontend folder and run these in command line if setting up from scratch
`npm install axios firebase react react-dom react-router-dom react-scripts` else if cloning `npm install` 
### 8. create a .env file in backend folder and paste these
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_BACKEND_URL=
REACT_APP_FIREBASE_MEASUREMENT_ID=

```
### 9. Go to backend folder in command line using `cd backend` and run `node server.js`
### 10. Go to frontend folder in command line using `cd frontend` and run `npm start`


