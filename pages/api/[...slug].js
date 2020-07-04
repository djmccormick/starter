import simplifyInflector from '@graphile-contrib/pg-simplify-inflector';
import { postgraphile } from 'postgraphile';

const isDevelopment = process.env.MODE === 'development';

export default postgraphile(
	process.env.DATABASE_AUTHENTICATOR_URL,
	process.env.DATABASE_SCHEMA_PUBLIC,
	{
		ownerConnectionString: process.env.DATABASE_OWNER_URL || undefined,
		graphqlRoute: '/api',
		retryOnInitFail: !isDevelopment,
		subscriptions: true,
		watchPg: isDevelopment,
		dynamicJson: true,
		setofFunctionsContainNulls: false,
		ignoreRBAC: false,
		ignoreIndexes: false,
		showErrorStack: isDevelopment ? 'json' : false,
		disableQueryLog: !isDevelopment,
		extendedErrors: isDevelopment ? ['hint', 'detail', 'errcode'] : ['errcode'],
		exportGqlSchemaPath: isDevelopment ? 'schema.graphql' : undefined,
		graphiqlRoute: '/api/graphiql',
		graphiql: isDevelopment,
		enhanceGraphiql: isDevelopment,
		allowExplain: isDevelopment ? (req) => true : false,
		enableQueryBatching: true,
		legacyRelations: 'omit',
		pgSettings(req) {
			return {
				role: process.env.DATABASE_VISITOR_ROLE,
				'user.id': '6c48046c-bd95-11ea-9d5a-972c68cb00f3'
			};
		},
		appendPlugins: [simplifyInflector]
	}
);

export const config = {
	api: {
		bodyParser: false
	}
};
