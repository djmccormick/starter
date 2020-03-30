import postgraphile from '../../utilities/middleware/postgraphile';

export default async function api(req, res) {
	postgraphile(req, res);
}

export const config = {
	api: {
		bodyParser: false
	}
};
