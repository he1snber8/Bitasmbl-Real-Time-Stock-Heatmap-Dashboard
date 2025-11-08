import React from 'react'
export default function Filters({onChange}){
  return (
    <div>
      <label>Sector:</label>
      <select onChange={e=>onChange({sector:e.target.value})}>
        <option value=''>All</option>
        <option>Technology</option>
        <option>Finance</option>
        <option>Healthcare</option>
      </select>
    </div>
  )
}