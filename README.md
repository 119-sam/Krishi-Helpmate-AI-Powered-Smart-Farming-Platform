# 🌱 Krishi Helpmate – AI-Powered Smart Farming Platform

Krishi Helpmate is a full-stack intelligent agriculture platform that leverages **AI, satellite imagery, and real-time data** to assist farmers in making informed decisions.

It integrates **NDVI analysis, plant disease detection, weather intelligence, and an AI chatbot assistant** into a single unified system.

---

## 🚀 Features

### 🌿 NDVI Crop Health Analysis

* Draw polygons on an interactive map
* Fetch satellite imagery using Google Earth Engine
* Calculate NDVI values (min, max, mean)
* Visualize vegetation health using overlays

---

### 🔍 Plant Disease Detection

* Upload plant images (drag & drop supported)
* CNN-based deep learning model for classification
* Returns:

  * Disease name
  * Confidence score
  * Scientific classification
  * Health status

---

### 🌦️ Weather Forecasting + Smart Farming Tips

* Real-time weather data using OpenWeatherMap API
* 5-day forecast
* Intelligent farming suggestions based on:

  * Temperature
  * Humidity
  * Rainfall
  * Wind conditions

---

### 🤖 AI Farming Assistant (Chatbot)

* Powered by LLM (Groq + LangChain)
* Provides:

  * Crop management advice
  * Pest control strategies
  * Agricultural best practices
* Maintains short conversational context

---

## 🧠 Plant Disease Detection Model

### 📊 Dataset

* **Dataset:** New Plant Diseases Dataset (Kaggle)
* ~87,000 RGB images of crop leaves
* 38 classes (healthy + diseased across multiple crops)
* 80/20 train-validation split
* Created using offline augmentation from PlantVillage dataset

---

### 🏗️ Model Architecture

| Component    | Details                          |
| ------------ | -------------------------------- |
| Input Size   | 128 × 128 × 3                    |
| Architecture | Sequential CNN                   |
| Conv Layers  | 3 layers (32 → 64 → 128 filters) |
| Dense Layer  | 128 units                        |
| Dropout      | 0.5                              |
| Output       | 38-class Softmax                 |

---

### ⚙️ Training Configuration

| Parameter     | Value                                         |
| ------------- | --------------------------------------------- |
| Optimizer     | Adam                                          |
| Loss Function | Categorical Crossentropy                      |
| Epochs        | 10                                            |
| Batch Size    | 32                                            |
| Augmentation  | Rotation, Shift, Shear, Zoom, Horizontal Flip |

---

### 📈 Model Performance

* **Validation Accuracy:** ~82%
* Optimized for real-time inference
* Capable of identifying multiple crop diseases and healthy plants

---

### 🔄 Inference Pipeline

1. User uploads plant image
2. Image resized to 128×128
3. Pixel normalization applied
4. CNN model predicts class probabilities
5. API returns structured result

---

## 🧠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Leaflet (Maps)
* Leaflet Draw

### Backend

* FastAPI
* Python

### AI / ML

* TensorFlow / Keras (CNN Model)
* Google Earth Engine (NDVI Analysis)
* LangChain + Groq (LLM Chatbot)

### APIs

* OpenWeatherMap API
* OpenStreetMap (Geocoding)

---

## 📁 Project Structure

```bash
frontend/
  ├── pages/
  │   ├── Dashboard.js
  │   ├── NDVI.js
  │   ├── Disease.js
  │   ├── Weather.js
  │   └── Chatbot.js

backend/
  ├── main.py
  ├── routers/
  │   ├── gee_ndvi.py
  │   ├── disease.py
  │   ├── weather.py
  │   └── ndvi.py
  ├── model/
  │   ├── Plant_Disease_CNN_model.h5
  │   └── class_indices.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/krishi-helpmate.git
cd krishi-helpmate
```

---

### 2️⃣ Backend Setup (FastAPI)

```bash
cd backend
pip install -r requirements.txt
```

Create `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

---

### 3️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Frontend URL:

```
http://localhost:3000
```

---

## ⚠️ Important Notes

* Backend must be running before frontend
* Uses local API (`127.0.0.1`)
* Configure:

  * OpenWeatherMap API key
  * Groq API key
  * Google Earth Engine authentication:

    ```bash
    earthengine authenticate
    ```

---

## 📊 Key Highlights

* Full-stack AI application (React + FastAPI)
* Integration of:

  * Deep Learning (CNN)
  * Remote Sensing (NDVI)
  * LLM (Chatbot)
* Interactive geospatial visualization
* Real-world agriculture-focused solution

---

## 🔮 Future Improvements

* Dynamic NDVI date range (real-time updates)
* Deployment (AWS / Docker / Vercel)
* Authentication system
* Database integration
* Model improvements using transfer learning

---

## 🤝 Contributing

Contributions are welcome.
Feel free to fork the repository and submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built as a real-world AI-powered agriculture solution combining machine learning, geospatial data, and intelligent systems.
