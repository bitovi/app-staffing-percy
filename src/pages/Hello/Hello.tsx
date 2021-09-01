
export default function Hello({ name }: { name: string }): JSX.Element {

  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  );
}

