import openai

openai.api_key = "YOUR_OPENAI_API_KEY"

def generate_game_idea(prompt: str):
    system_prompt = (
        "You are a creative game designer. Based on user input, generate a structured JSON "
        "for a game idea including title, genre, setting, main_character, mechanics, and levels."
    )

    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ]
    )

    text = response.choices[0].message.content
    return {"result": text}
