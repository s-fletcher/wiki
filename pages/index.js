import { useQuery, gql } from "@apollo/client";
import Head from "next/head";
import styled from 'styled-components'
import NavBar from "../components/NavBar";
import Category from "../components/Dashboard/Category";

const CATEGORIES = gql`
    {
        categories {
            id
            name
            index
            emoji
            pages {
                id
                name
                status
                index
            }
        }
    }
`;

const StyledIndex = styled.div``

function Index() {
    const { loading, error, data } = useQuery(CATEGORIES);

    /** RETURN Loading */
    if (loading) return <p>Loading...</p>;
    /** RETURN Error */
    if (error) return <p>{error.message}</p>;
    /** RETURN Dashboard */
    return (
        <StyledIndex>
            <Head>
                <title>Wiki</title>
            </Head>
            <NavBar />
            {Object.keys(data.categories).map(i => {
                return (
                    <Category
                        key={data.categories[i].name}
                        name={data.categories[i].name}
                        index={data.categories[i].index}
                        emoji={data.categories[i].emoji}
                        pages={data.categories[i].pages}
                    />
                );
            })}
        </StyledIndex>
    );
}

export default Index;
