import runMiddleware, { postgraphile } from '../../utilities/middleware';

export default async function api(req, res) {
	await runMiddleware(req, res, postgraphile);
}
