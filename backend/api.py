from fastapi import APIRouter
from .schemas import Snapshot
router = APIRouter()
@router.get('/snapshot', response_model=Snapshot)
async def snapshot(sector: str = None):
    # return cached or placeholder snapshot; filter by sector if provided
    return {"timestamp":"now","stocks":[]}
@router.get('/sectors')
async def sectors():
    return ["Technology","Finance","Healthcare"]