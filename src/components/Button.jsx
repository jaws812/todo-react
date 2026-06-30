const Button = (props) => {
  const {
    className = '',
    type = 'button',
    children,
    onClick,
    isDisabled,
  } = props

  return (
    <button
      className={`button ${className}`}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button