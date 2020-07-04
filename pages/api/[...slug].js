import { postgraphileMiddleware } from '../../utilities/postgraphile-middleware';

export default function api(req, res) {
	return postgraphileMiddleware(req, res);
}

export const config = {
	api: {
		bodyParser: false
	}
};
