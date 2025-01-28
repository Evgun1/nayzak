export default function ErrorComponent(error?: Error) {
  console.log(error);
  return <div>{error?.message}</div>;
}
