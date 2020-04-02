import simplifyInflector from '@graphile-contrib/pg-simplify-inflector';
import { postgraphile } from 'postgraphile';

const isDevelopment = process.env.MODE === 'development';

export default postgraphile(process.env.DATABASE_URL, {
	ownerConnectionString: process.env.OWNER_DATABASE_URL || undefined,
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
		return {};
	},
	appendPlugins: [simplifyInflector]
});
