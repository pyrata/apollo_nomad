import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost:4000',
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				Movie: {
					isLiked: {
						read() {
							return false;
						},
					},
				},
			},
		},
	}),
});
export default client;
