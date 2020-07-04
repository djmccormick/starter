import { ApolloLink, Observable } from 'apollo-link';
import { execute, getOperationAST } from 'graphql';

import { postgraphileMiddleware } from './postgraphile-middleware';

export class ApolloLinkPostgraphile extends ApolloLink {
	constructor(options) {
		super();

		this.options = options;
	}

	request(operation, _forward) {
		const { req, res, rootValue } = this.options;

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
