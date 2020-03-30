import postgraphile from '../../utilities/middleware/postgraphile';

export default async function graphiql(req, res) {
	postgraphile(req, res);
}

export const config = {
	api: {
		bodyParser: false
	}
};
