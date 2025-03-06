export default function ErrorComponent(error?: Error) {
    return <div>{error?.message}</div>;
}
