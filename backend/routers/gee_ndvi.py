import ee
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List

router = APIRouter()

# Request model: polygon coordinates from frontend
class NDVIRequest(BaseModel):
    coordinates: List[List[List[float]]]  # [[[lon, lat], [lon, lat], ...]]

# Initialize Earth Engine
try:
    ee.Initialize(project="expanded-system-451208-u6")
except Exception as e:
    raise RuntimeError(f"Failed to initialize Earth Engine: {e}")

@router.post("/ndvi")
def get_ndvi(request: NDVIRequest):
    """
    Generate NDVI visualization for the given polygon (ROI).
    Returns NDVI URL + statistics for that exact region.
    """
    try:
        coords = request.coordinates
        if not coords:
            raise HTTPException(status_code=400, detail="No coordinates provided.")

        # Create EE polygon from coordinates
        polygon = ee.Geometry.Polygon(coords[0])

        # Load Sentinel-2 image (cloud-free, recent)
        image = (
            ee.ImageCollection("COPERNICUS/S2_SR")
            .filterBounds(polygon)
            .filterDate("2025-10-01", "2025-10-27")
            .sort("CLOUDY_PIXEL_PERCENTAGE")
            .first()
        )

        if image is None:
            raise HTTPException(status_code=404, detail="No satellite image found for this region.")

        # NDVI = (NIR - RED) / (NIR + RED)
        ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI")

        # Compute stats for the selected polygon
        stats = ndvi.reduceRegion(
            reducer=ee.Reducer.minMax().combine(ee.Reducer.mean(), sharedInputs=True),
            geometry=polygon,
            scale=10,
            bestEffort=True
        ).getInfo()

        mean_ndvi = stats.get("NDVI_mean")
        min_ndvi = stats.get("NDVI_min")
        max_ndvi = stats.get("NDVI_max")

        # Determine health
        if mean_ndvi is None:
            health = "Data unavailable"
        elif mean_ndvi < 0.3:
            health = "Poor (stressed vegetation)"
        elif mean_ndvi < 0.6:
            health = "Moderate (needs monitoring)"
        else:
            health = "Good (healthy vegetation)"

        # Visualization URL for the selected region
        vis_params = {"min": 0, "max": 1, "palette": ["red", "yellow", "green"]}
        ndvi_url = ndvi.getThumbURL({
            **vis_params,
            "region": polygon.getInfo(),
            "dimensions": 512
        })

        return JSONResponse({
            "ndvi_url": ndvi_url,
            "mean_ndvi": mean_ndvi,
            "min_ndvi": min_ndvi,
            "max_ndvi": max_ndvi,
            "health": health
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

