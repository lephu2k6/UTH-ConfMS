from fastapi import APIRouter, HTTPException
from datetime import datetime

from services.deadline.deadline_manager import DeadlineManager

router = APIRouter(prefix="/deadlines", tags=["Deadlines"])


@router.get("/health")
def health():
    """Simple health endpoint for deadline manager."""
    return {"status": "ok", "time": datetime.utcnow().isoformat()}


@router.post("/run", response_model=dict)
async def run_deadline_once():
    """Run the deadline manager check once immediately (manual trigger).

    Useful for testing. This will execute the same logic as the background
    task's single pass (`run_once`).
    """
    try:
        manager = DeadlineManager()
        await manager.run_once()
        return {"message": "deadline check executed"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error executing deadline check: {str(e)}")
