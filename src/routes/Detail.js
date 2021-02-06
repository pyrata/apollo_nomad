import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import Movie from '../components/Movie';
const GET_MOVIE = gql`
	query getMovie($id: Int!) {
		movie(id: $id) {
			title
			medium_cover_image
			language
			rating
			description_intro
		}
		suggestions(id: $id) {
			id
			medium_cover_image
		}
	}
`;
const Container = styled.div`
	height: 100vh;
	background-image: linear-gradient(-45deg, #d754ab, #fd723a);
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-items: center;
	color: white;
`;
const Column = styled.div`
	margin-left: 10px;
	width: 50%;
	flex: 1 1 400px;
`;

const Title = styled.h1`
	font-size: 65px;
	margin-bottom: 15px;
`;

const Subtitle = styled.h4`
	font-size: 35px;
	margin-bottom: 10px;
`;

const Description = styled.p`
	font-size: 28px;
`;

const Poster = styled.div`
	background-image: url(${(props) => props.bg});
	width: 25%;
	height: 60%;
	background-color: transparent;
	background-size: cover;
	background-position: center center;
	flex: 0 1 400px;
	border-radius: 10px;
	margin: 10px;
`;
const Movies = styled.div`
	margin-top: 100px;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	grid-gap: 25px;
	width: 60%;
	position: relative;
	top: -50px;
	flex: 1 1 170px;
`;
export default () => {
	let { id } = useParams();
	const { loading, error, data } = useQuery(GET_MOVIE, {
		variables: { id: +id },
	});
	return (
		<Container>
			<Column>
				<Title>{loading ? 'loading...' : data.movie.title}</Title>
				<Subtitle>
					Audio: {data?.movie?.language}
					<> Rating: {data?.movie?.rating}</>
				</Subtitle>
				<Description>{data?.movie?.description_intro} </Description>
			</Column>
			<Poster bg={data?.movie?.medium_cover_image ?? ' '}></Poster>
			<Movies>
				{data?.suggestions?.map((m) => (
					<Movie key={m.id} id={m.id} bg={m.medium_cover_image} />
				))}
			</Movies>
		</Container>
	);
};
