import React, {useRef,useEffect} from 'react'
import * as d3 from 'd3'
export default function Heatmap({data}){
  const ref=useRef()
  useEffect(()=>{
    const svg=d3.select(ref.current)
    .attr('width',800).attr('height',600)
    // bind data and create/update rects with color scale and transitions
    const color=d3.scaleLinear().domain([-5,0,5]).range(['#d73027','#ffffbf','#1a9850'])
    const rects=svg.selectAll('rect').data(data,(d)=>d.symbol)
    rects.enter().append('rect').attr('x',(_,i)=>i%20*38).attr('y',(_,i)=>Math.floor(i/20)*30).attr('width',36).attr('height',28)
      .merge(rects).transition().duration(300).style('fill',d=>color(d.change))
    rects.exit().remove()
  },[data])
  return <svg ref={ref}></svg>
}