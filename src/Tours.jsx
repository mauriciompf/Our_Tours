function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

export default async function Tours() {
  try {
    const res = await fetch("https://www.course-api.com/react-tours-project");

    if (!res.ok) {
      throw new Error(`Can't fetch data, error status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Error: ", error);
  }

  return (
    <section>
      <Button>Not Interested</Button>
    </section>
  );
}
