import asyncio, httpx
API_URL = 'https://example.com/market'  # replace
async def start_fetch_loop(broadcast):
    backoff = 1
    async with httpx.AsyncClient(timeout=10) as client:
        while True:
            try:
                r = await client.get(API_URL, params={"symbols":"ALL"})
                r.raise_for_status()
                await broadcast(r.text)
                backoff = 1
            except httpx.HTTPStatusError as e:
                # handle rate limits (429) and other status codes
                backoff = min(backoff*2, 60)
            except Exception:
                backoff = min(backoff*2, 60)
            await asyncio.sleep(backoff)
