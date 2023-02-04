import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

// will return star fill or empty based on filter rating
//it needide at 2 places in filter and below the product
function Rating({ rating, onClick, style }) {
    return (
        <>
            {[...Array(5)].map((_, i) => {
                return <span key={i} onClick={() => onClick(i)} style={style}>
                    {rating > i ? (
                        <AiFillStar fontSize={"15px"} />
                    ) : (
                        <AiOutlineStar fontSize={"15px"} />
                    )}
                </span>
            })}
        </>
    )
}

export default Rating