from fastapi import FastAPI

app = FastAPI()

# Import the RAG class or the methods you need
from search_with_lepton import RAG  # Assume your RAG class is in rag_module.py

rag_instance = RAG()
@app.get("/")
async def read_root(query: str = "What is the capital of France?"):
    return rag_instance.get(query=query)