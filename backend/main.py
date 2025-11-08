from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio
app = FastAPI()
clients = set()
@app.websocket('/ws')
async def ws(ws: WebSocket):
    await ws.accept()
    clients.add(ws)
    try:
        while True:
            await ws.receive_text()
    except WebSocketDisconnect:
        clients.remove(ws)

async def broadcast(msg):
    for c in list(clients):
        try: await c.send_text(msg)
        except: clients.remove(c)

from .data_fetcher import start_fetch_loop
@app.on_event('startup')
async def startup():
    asyncio.create_task(start_fetch_loop(broadcast))