from fastapi import APIRouter
from pydantic import BaseModel
from services.ai_generator import generate_game_with_layout
from services.image_generator import generate_game_image

router = APIRouter(tags=["Image Generation"])

class GamePrompt(BaseModel):
    prompt: str

@router.post("/generate")
def generate_image_route(data: GamePrompt):
    game_data = generate_game_with_layout(data.prompt)
    layout = game_data.get("layout")
    image = generate_game_image(data.prompt, layout)
    return {"result": game_data, "image": image}
