import './globals.css'

export const metadata = {
	title: 'Monogram Coding Standards MCP Server',
	description:
		'Model Context Protocol Server providing comprehensive coding standards for Next.js, TypeScript, and ESLint',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	)
}
