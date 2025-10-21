from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

class GameIdeaRequest(BaseModel):
    genre: str
    theme: str
    style: str

@app.post("/generate")
def generate_game_idea(req: GameIdeaRequest):
    prompt = f"""
    Generate a game concept in JSON format with:
    - Title
    - Main character
    - World description
    - Gameplay mechanics
    - Level design
    Genre: {req.genre}, Theme: {req.theme}, Style: {req.style}
    """
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.9
    )
    return {"idea": response.choices[0].message.content}
