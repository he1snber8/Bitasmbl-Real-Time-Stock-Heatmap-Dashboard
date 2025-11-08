export function makeSocket(url, onMsg){
  let ws,backoff=1000
  function connect(){
    ws=new WebSocket(url)
    ws.onopen=()=>backoff=1000
    ws.onmessage=e=>onMsg(e.data)
    ws.onclose=()=>setTimeout(connect,backoff=(Math.min(30000,backoff*2)))
  }
  connect()
  return ()=>ws && ws.close()
}