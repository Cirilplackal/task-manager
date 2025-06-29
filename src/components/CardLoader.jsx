import React from 'react'

const CardLoader = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl border border-gray-200 shadow p-4 space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
    </div>
  )
}

export default CardLoader