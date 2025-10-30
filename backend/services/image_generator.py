import os
import base64
import requests
from dotenv import load_dotenv

load_dotenv()

HF_KEY = os.getenv("HF_API_KEY")
USE_HF = os.getenv("USE_HF", "false").lower() in ("1", "true", "yes")
USE_MOCK = os.getenv("USE_MOCK", "true").lower() in ("1", "true", "yes")

OPENAI_KEY = os.getenv("OPENAI_API_KEY")
USE_OPENAI = bool(OPENAI_KEY and not USE_MOCK and not USE_HF)

if USE_OPENAI:
    try:
        from openai import OpenAI
        client = OpenAI(api_key=OPENAI_KEY)
    except Exception:
        USE_OPENAI = False


def generate_game_image(prompt: str, layout=None):
    """Prioritet: HuggingFace > OpenAI > Mock"""

    if USE_HF and HF_KEY:
        try:
            url = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
            headers = {"Authorization": f"Bearer {HF_KEY}"}
            payload = {"inputs": f"concept art of {prompt}, 2D game level, pixel-art style"}

            response = requests.post(url, headers=headers, json=payload, timeout=60)
            if response.status_code == 200:
                image_b64 = base64.b64encode(response.content).decode("utf-8")
                return {
                    "image_url": f"data:image/png;base64,{image_b64}",
                    "note": "Generated via Hugging Face Stable Diffusion 2"
                }
            else:
                print("HF error:", response.text)
        except Exception as e:
            print("⚠️ HF fallback:", e)

    if USE_OPENAI:
        try:
            result = client.images.generate(
                model="gpt-image-1",
                prompt=f"2D pixel-art concept art for {prompt}",
                size="512x512",
            )
            return {"image_url": result.data[0].url, "note": "Generated via OpenAI"}
        except Exception as e:
            print("⚠️ OpenAI fallback:", e)

    return _mock_image(prompt)


def _mock_image(prompt: str):
    svg = f"""
    <svg width='512' height='512' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='#1e293b'/>
      <text x='50%' y='50%' fill='#38bdf8' text-anchor='middle'
            font-family='monospace' font-size='20'>
        Mock Image for {prompt}
      </text>
    </svg>
    """
    image_b64 = base64.b64encode(svg.encode("utf-8")).decode("utf-8")
    return {
        "image_url": f"data:image/svg+xml;base64,{image_b64}",
        "note": "Mock image generated locally (no API key)"
    }
