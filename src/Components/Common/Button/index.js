"use client"
import "./index.css"

function Button({
    children,
    variant = "primary",
    size = "medium",
    className = "",
    icon,
    onClick,
    disabled = false,
    ...props
}) {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${className} ${icon ? 'with-icon' : ''}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            {children}
        </button>
    )
}

export default Button 