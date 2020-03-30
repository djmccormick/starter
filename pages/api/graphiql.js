import runMiddleware, { postgraphile } from '../../utilities/middleware';

export default async function graphiql(req, res) {
	await runMiddleware(req, res, postgraphile);
}
