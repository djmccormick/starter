import runMiddleware, { postgraphile } from '../../utilities/middleware';

export default async function stream(req, res) {
	await runMiddleware(req, res, postgraphile);
}
