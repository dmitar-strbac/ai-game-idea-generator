# Copyright (c) 2025 Dmitar Strbac
# Licensed under the Apache License, Version 2.0. See LICENSE file in the project root for full license information.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import layout  

app = FastAPI(title="AI Game Idea Generator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(layout.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "AI Game Idea Generator API running"}

@app.get("/api/test")
def test_backend():
    return {"status": "ok", "message": "Backend connected successfully 🚀"}
