import { postgraphile } from 'postgraphile';

export default postgraphile('postgres://postgres@localhost/project', 'public', {
	graphqlRoute: '/api',
	subscriptions: true,
	watchPg: true,
	dynamicJson: true,
	setofFunctionsContainNulls: false,
	ignoreRBAC: false,
	ignoreIndexes: false,
	showErrorStack: 'json',
	extendedErrors: ['hint', 'detail', 'errcode'],
	exportGqlSchemaPath: 'schema.graphql',
	graphiqlRoute: '/api/graphiql',
	graphiql: true,
	enhanceGraphiql: true,
	allowExplain(req) {
		return true;
	},
	enableQueryBatching: true,
	legacyRelations: 'omit',
	pgSettings(req) {
		return { role: 'visitor' };
	},
	appendPlugins: [require('@graphile-contrib/pg-simplify-inflector')]
});
