/* eslint-disable */

import {
	ApolloLink,
	FetchResult,
	NextLink,
	Observable,
	Operation
} from 'apollo-link';

export class ApolloLinkPostgraphile extends ApolloLink {
	constructor() {
		super();
	}

	request(operation, _forward) {
		const { postgraphileMiddleware, req, res, rootValue } = this.options;

		return new Observable((observer) => {
			(async () => {
				try {
					const op = getOperationAST(operation.query, operation.operationName);

					if (!op || op.operation !== 'query') {
						if (!observer.closed) {
							/* Only do queries (not subscriptions) on server side */
							observer.complete();
						}
						return;
					}

					const schema = await postgraphileMiddleware.getGraphQLSchema();
					const data = await postgraphileMiddleware.withPostGraphileContextFromReqRes(
						req,
						res,
						{},
						(context) =>
							execute(
								schema,
								operation.query,
								rootValue || {},
								context,
								operation.variables,
								operation.operationName
							)
					);

					if (!observer.closed) {
						observer.next(data);
						observer.complete();
					}
				} catch (e) {
					if (!observer.closed) {
						observer.error(e);
					} else {
						console.error(e);
					}
				}
			})();
		});
	}
}
