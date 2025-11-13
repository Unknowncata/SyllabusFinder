function InfoField({ Icon, children, className = "" }) {
  return (
    <span className={`flex items-center gap-2 text-sm text-gray-600 ${className}`}>
      {Icon ? <Icon /> : null}
      {children || "情報なし"}
    </span>
  );
}

export default InfoField;
