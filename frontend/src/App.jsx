import React, {useState,useEffect} from 'react'
import Heatmap from './components/Heatmap'
import Filters from './components/Filters'
export default function App(){
  const [data,setData]=useState([])
  useEffect(()=>{
    fetch('/snapshot').then(r=>r.json()).then(j=>setData(j.stocks||[]))
    const ws=new WebSocket('ws://localhost:8000/ws')
    ws.onmessage=e=>setData(prev=>JSON.parse(e.data))
    return ()=>ws.close()
  },[])
  return (<div><Filters onChange={()=>{}}/><Heatmap data={data}/></div>)
}