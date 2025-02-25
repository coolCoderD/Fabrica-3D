import os
from fastapi import FastAPI, HTTPException
import requests
from starlette.responses import StreamingResponse
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this for better security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load API key from environment variables
API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev"
HEADERS = {"Authorization": f"Bearer {os.getenv('HF_API_KEY')}"}

@app.post("/generate-image/")
async def generate_image(data: dict):
    if "inputs" not in data:
        raise HTTPException(status_code=422, detail="Missing 'inputs' field in request body")
    
    response = requests.post(API_URL, headers=HEADERS, json=data)
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    
    image_bytes = BytesIO(response.content)
    
    return StreamingResponse(image_bytes, media_type="image/png")

@app.get("/")
async def root():
    return {"message": "Hello World"}
