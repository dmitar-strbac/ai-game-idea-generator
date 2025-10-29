import os
import json
import random
from dotenv import load_dotenv

load_dotenv()

USE_MOCK = os.getenv("USE_MOCK", "true").lower() in ("1", "true", "yes")
OPENAI_KEY = os.getenv("OPENAI_API_KEY")

USE_OPENAI = (OPENAI_KEY is not None) and not USE_MOCK

if USE_OPENAI:
    try:
        from openai import OpenAI
        client = OpenAI(api_key=OPENAI_KEY)
    except Exception:
        USE_OPENAI = False


def _mock_layout(size=8):
    return [[random.choice([0, 0, 0, 1]) for _ in range(size)] for _ in range(size)]


def _mock_generate(prompt: str):
    title_words = ["Neon", "Rebellion", "Shadow", "Legacy", "Circuit", "Golem", "Sky"]
    title = f"{random.choice(title_words)} {random.choice(title_words)}"
    genre = random.choice(["2D Action Platformer", "Puzzle Platformer", "Roguelike", "Metroidvania"])
    main_character = random.choice(["Rin the Android", "Mira the Hacker", "Kade the Runner"])
    mechanics = random.sample(["Wall jump", "Dash", "Energy hacking", "Stealth cloak", "Crafting"], 3)
    levels = [
        {"name": "The Slums", "objective": "Hack the mainframe"},
        {"name": "Corporate Tower", "objective": "Defeat security drones"}
    ]
    layout = _mock_layout(8)
    return {
        "title": title,
        "genre": genre,
        "main_character": main_character,
        "mechanics": mechanics,
        "levels": levels,
        "layout": layout,
        "note": "generated_by_mock"
    }


def generate_game_with_layout(prompt: str):
    """
    Returns a dict with textual idea and layout.
    If USE_OPENAI True, attempt to call OpenAI; otherwise return mock result.
    """
    if USE_OPENAI:
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",  
                messages=[
                    {"role": "system", "content": "You are an AI game design assistant that returns valid JSON only."},
                    {"role": "user", "content": f"""Based on the following idea: "{prompt}",
                    generate a JSON object with: title (string), genre (string), main_character (string),
                    mechanics (array), levels (array with name and objective), layout (8x8 grid of 0/1).
                    Return *only* JSON (no extra commentary)."""}
                ],
                temperature=0.7,
                max_tokens=800,
            )
            content = response.choices[0].message.content
            try:
                parsed = json.loads(content)
                return parsed
            except Exception:
                return {"raw_response": content}
        except Exception as e:
            mock = _mock_generate(prompt)
            mock["_fallback_error"] = str(e)
            return mock
    else:
        return _mock_generate(prompt)
