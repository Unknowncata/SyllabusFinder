function Button({ children, isDisabled = false, handleClick = () => {} }) {
  return (
    <button
      className={`transition-all duration-150 inline-block px-2 py-3 rounded-2xl ${
        !isDisabled
          ? "text-white outline-blue-600 bg-blue-600 hover:bg-transparent hover:text-blue-600 hover:cursor-pointer hover:outline-2"
          : "text-gray-700 bg-gray-300"
      }`}
      disabled={isDisabled}
      onClick={handleClick}
    >
      <p className="text-sm">{children}</p>
    </button>
  );
}

export default Button;
