import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';

const CustomApp = ({ Component, pageProps, apollo }) => (
	<ApolloProvider client={apollo}>
		<Component {...pageProps} />
	</ApolloProvider>
);

export default withApollo(({ ctx, initialState }) => {
	let req, res;

	if (ctx) {
		req = ctx.req;
		res = ctx.res;
	}

	return new ApolloClient({
		ssrMode: !process.browser,
		link: createIsomorphicLink(req, res),
		cache: new InMemoryCache({
			dataIdFromObject: (object) => object.nodeId || null
		}).restore(initialState || {})
	});
})(CustomApp, { getDataFromTree });

function createIsomorphicLink(req, res) {
	//if (!process.browser) {
	//    const { ApolloLinkPostgraphile } = require('../utilities/apollo-link-postgraphile');

	//    return new ApolloLinkPostgraphile({
	//        req,
	//        res,
	//        postgraphileMiddleware: req.app.get('postgraphileMiddleware'),
	//    });
	//}

	const { HttpLink } = require('apollo-link-http');

	return new HttpLink({
		uri: '/api',
		credentials: 'same-origin'
	});
}
