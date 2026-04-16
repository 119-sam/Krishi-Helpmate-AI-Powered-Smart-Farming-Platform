from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv

# Import routers
from routers import NDVI, disease, weather, gee_ndvi

# Initialize FastAPI
app = FastAPI(title="Crop Health API", version="1.0.0")

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "YOUR_GROQ_API_KEY_HERE")

# Initialize LangChain Groq LLM
llm = ChatGroq(
    groq_api_key=GROQ_API_KEY,
    model="openai/gpt-oss-20b"
)

# Enable CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class ChatRequest(BaseModel):
    message: str

# Chat endpoint
@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        # Maintain small chat memory
        chat_history = getattr(app.state, "chat_history", [])
        history_txt = "\n".join([f"User: {u}\nAssistant: {a}" for u, a in chat_history[-3:]])

        # Build the context prompt
        prompt = (
            "You are an expert agricultural assistant. "
            "Provide helpful, accurate advice about farming, crops, plant diseases, pest control, and agricultural best practices.\n\n"
        )
        if history_txt:
            prompt += f"Conversation so far:\n{history_txt}\n\n"
        prompt += f"User: {request.message}\nAssistant:"

        # Call LLM
        resp = llm.invoke(prompt)
        reply = getattr(resp, "content", str(resp))

        # Update chat history
        chat_history.append((request.message, reply))
        app.state.chat_history = chat_history

        return {"reply": reply}

    except Exception as e:
        print(f"Groq API error: {e}")
        return {"reply": "Sorry, I'm having trouble responding right now. Please try again."}

# Include API routers - FIXED ROUTING
app.include_router(gee_ndvi.router, prefix="/api/ndvi", tags=["NDVI"])
app.include_router(disease.router, prefix="/api/plant-diseases", tags=["Plant Diseases"])
app.include_router(weather.router, prefix="/api/weather", tags=["Weather"])

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Crop Health API is running"}




