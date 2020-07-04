import Head from 'next/head';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const query = gql`
	{
		me {
			nodeId
			id
			firstName
			lastName
		}
	}
`;

const Home = () => {
	const result = useQuery(query);
	const me = result.data?.me || {};

	return (
		<div>
			<Head>
				<title>Home - Starter</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1 className="title">Home</h1>
				<p>
					Hello, {me.firstName} {me.lastName}!
				</p>
			</main>
		</div>
	);
};

export default Home;
