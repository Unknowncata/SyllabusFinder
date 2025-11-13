function NavItem({ isSelected, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 text-sm font-medium transition-colors duration-200 
        hover:text-blue-600 hover:cursor-pointer focus:outline-none
        ${isSelected ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
    >
      {children}
    </button>
  );
}

export default NavItem;
