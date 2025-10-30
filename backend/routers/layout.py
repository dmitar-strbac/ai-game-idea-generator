from fastapi import APIRouter
from pydantic import BaseModel
from services.ai_generator import generate_game_with_layout

router = APIRouter()

class GamePrompt(BaseModel):
    prompt: str

@router.post("/generate")
def generate_game(data: GamePrompt):
    result = generate_game_with_layout(data.prompt)
    return {"result": result}
