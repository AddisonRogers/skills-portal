type Props = {
	missingKeys: string[];
};

export default function MissingEnvScreen({ missingKeys }: Props) {
	return (
		<main style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
			<h1 style={{ fontSize: 24, marginBottom: 8 }}>Stop</h1>
			<p style={{ marginBottom: 16 }}>
				This app can’t start because required environment variables are missing.
			</p>

			<h2 style={{ fontSize: 16, marginBottom: 8 }}>Missing</h2>
			<ul style={{ marginBottom: 16 }}>
				{missingKeys.map((k) => (
					<li
						key={k}
						style={{
							fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
						}}
					>
						{k}
					</li>
				))}
			</ul>

			<p style={{ marginBottom: 8 }}>
				Add them to your environment (for local dev, typically{" "}
				<code>.env.local</code>), using
				<code> .env.example</code> as a reference.
			</p>

			<p style={{ color: "#666" }}>
				After setting them, restart the Next.js server.
			</p>
		</main>
	);
}
