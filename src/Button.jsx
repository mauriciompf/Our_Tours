export default function Button({
  children = "Not Interested",
  onClick,
  className = "mx-6 rounded-md border border-green-500 text-green-500 transition-colors hover:bg-green-500 hover:text-white focus:bg-green-500 focus:text-white",
}) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
