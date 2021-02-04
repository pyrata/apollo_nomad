import { useQuery, gql } from '@apollo/client';

const GET_MOVIES = gql`
	query {
		movies {
			id
			medium_cover_image
		}
	}
`;
export default () => {
	const { loading } = useQuery;
	console.log(loading);
	return <h1>Home</h1>;
};
