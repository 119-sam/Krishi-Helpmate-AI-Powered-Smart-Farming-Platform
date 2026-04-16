from fastapi import APIRouter, UploadFile, File, HTTPException
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import json
import os

router = APIRouter()

# Load your CNN model
MODEL_PATH = "model/Plant_Disease_CNN_model.h5"

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# Load class indices
CLASS_INDICES_PATH = "model/class_indices.json"


try:
    with open(CLASS_INDICES_PATH, 'r') as f:
        class_indices = json.load(f)
    # Reverse the dictionary to get index -> class name mapping
    CLASS_NAMES = {v: k for k, v in class_indices.items()}
    print("✅ Class indices loaded successfully!")
    print(f"📊 Number of classes: {len(CLASS_NAMES)}")
except Exception as e:
    print(f"❌ Error loading class indices: {e}")
    CLASS_NAMES = {}

@router.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    """
    Predict plant disease from uploaded image
    """
    print(f"📨 Received file: {file.filename}")
    
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    if not CLASS_NAMES:
        raise HTTPException(status_code=500, detail="Class indices not loaded")
    
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        # Read and process image
        contents = await file.read()
        print(f"📊 File size: {len(contents)} bytes")
        
        # Open image
        image = Image.open(io.BytesIO(contents)).convert('RGB')
        print("🖼️ Image opened successfully")
        
        # Resize image to match model input - CHANGED TO 128x128
        image = image.resize((128, 128))
        print("🔄 Image resized to 128x128")
        
        # Convert to numpy array and normalize
        image_array = np.array(image) / 255.0
        print("🔢 Image converted to array")
        
        # Add batch dimension
        image_batch = np.expand_dims(image_array, axis=0)
        print("📦 Batch dimension added")
        
        # Make prediction
        print("🤖 Making prediction...")
        predictions = model.predict(image_batch)
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_idx])
        
        print(f"🎯 Prediction result - Index: {predicted_class_idx}, Confidence: {confidence}")
        
        # Get class name from class indices
        predicted_class = CLASS_NAMES.get(predicted_class_idx, "Unknown")
        formatted_disease = format_disease_name(predicted_class)
        
        print(f"✅ Final diagnosis: {formatted_disease}")
        
        return {
            "disease": formatted_disease,
            "confidence": round(confidence * 100, 2),
            "scientific_name": predicted_class,
            "is_healthy": "healthy" in predicted_class.lower()
        }
        
    except Exception as e:
        print(f"❌ Error in prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

def format_disease_name(class_name):
    """Format the class name for better display"""
    if '___' in class_name:
        crop, disease = class_name.split('___')
        if disease == 'healthy':
            return f"{crop.replace('_', ' ').title()} - Healthy"
        else:
            return f"{crop.replace('_', ' ').title()} - {disease.replace('_', ' ').title()}"
    return class_name.replace('_', ' ').title()