from fastapi import APIRouter
from pydantic import BaseModel
from services.ai_generator import generate_game_idea_with_layout

router = APIRouter(prefix="/api/generator", tags=["Generator"])

class GameIdeaRequest(BaseModel):
    prompt: str

@router.post("/")
async def generate_idea(req: GameIdeaRequest):
    return generate_game_idea_with_layout(req.prompt)
