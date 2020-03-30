import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);

		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
					<hr />
					<p>Running in {process.env.MODE} mode.</p>
				</body>
			</Html>
		);
	}
}
