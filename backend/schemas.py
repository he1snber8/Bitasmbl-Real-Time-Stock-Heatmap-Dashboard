from pydantic import BaseModel
from typing import List
class Stock(BaseModel):
    symbol: str
    price: float
    change: float
    sector: str
class Snapshot(BaseModel):
    timestamp: str
    stocks: List[Stock]