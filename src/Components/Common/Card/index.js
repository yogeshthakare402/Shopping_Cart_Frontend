"use client"
import "./index.css"

function Card({
    children,
    variant = "default",
    className = "",
    hoverable = false,
    ...props
}) {
    return (
        <div
            className={`card card-${variant} ${hoverable ? 'card-hover' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

export default Card 