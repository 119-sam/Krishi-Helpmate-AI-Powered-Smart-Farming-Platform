# routers/ndvi.py
from fastapi import APIRouter

# Create the router instance
router = APIRouter()

@router.get("/test")
def test_ndvi():
    return {"message": "NDVI router is working"}

# Add your actual NDVI endpoints here...
