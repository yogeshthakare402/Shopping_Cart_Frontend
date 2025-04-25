"use client"
import "./index.css"
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs"

// will return star fill or empty based on filter rating
//it needide at 2 places in filter and below the product
function Rating({ rating, onClick, style }) {
  return (
    <div style={style}>
      {[...Array(5)].map((_, i) => {
        return (
          <span key={i} onClick={() => onClick(i)}>
            {rating >= i + 1 ? (
              <BsStarFill />
            ) : rating >= i + 0.5 ? (
              <BsStarHalf />
            ) : (
              <BsStar />
            )}
          </span>
        )
      })}
    </div>
  )
}

export default Rating
