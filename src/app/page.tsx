import PageComponentClient from "./ComponentClient.tsx";
import PageComponentServer from "./ComponentServer.tsx";

export default function Home() {
	const pageTitle = "Page Title";

	return (
		<main>
			<h1>{pageTitle}</h1>

			<PageComponentServer />

			<PageComponentClient buttonText="Click me" />

			{pageTitle === "Page Title" ? (
				<p>Reached</p>
			) : (
				<p>Never reached</p>
			)}
		</main>
	);
}
