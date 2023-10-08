export default function Button({ children = "Not Interested", onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
