from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import generator

app = FastAPI(title="AI Game Idea Generator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generator.router)

@app.get("/")
def root():
    return {"message": "AI Game Idea Generator API running"}
