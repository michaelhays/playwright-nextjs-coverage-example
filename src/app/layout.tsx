import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
	const lang = "en";

	return (
		<html lang={lang}>
			<body>{children}</body>
		</html>
	);
}
