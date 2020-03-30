export default function api(req, res) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');

	res.end(JSON.stringify({ hello: 'world' }));
};
