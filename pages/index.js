import { useQuery, gql } from "@apollo/client";
import Head from "next/head";
import styled from "styled-components";
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

const StyledIndex = styled.div`
    column-count: 2; /* Maximum number of columns */
    column-width: 230px; /* TWEAK Minimum width for each column */
    column-gap: 0;
    max-width: 650px; /* TWEAK */
    margin: 50px auto;
    padding: 0 50px;
    text-align: left;
    position: relative;
    @media screen and (max-width: ${props => props.theme.mobileWidth}) {
        padding: 0 20px;
    }
`;

function Index() {
    const { loading, error, data } = useQuery(CATEGORIES);

    /** RETURN Loading */
    if (loading) return (
                     <div>
                         <NavBar />
                         <p>Loading...</p>
                     </div>
                 );
    /** RETURN Error */
    if (error) return <p>{error.message}</p>;
    /** RETURN Dashboard */
    return (
        <div>
            <Head>
                <title>Wiki</title>
            </Head>
            <NavBar settings add filter search />
            <StyledIndex>
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
        </div>
    );
}

export default Index;
