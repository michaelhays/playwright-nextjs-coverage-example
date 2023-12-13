import PageComponent from "./Component.tsx";

export default function Home() {
	const pageTitle = "Page Title";

	return (
		<main>
			<h1>{pageTitle}</h1>

			<PageComponent buttonText="Click me" />
		</main>
	);
}
