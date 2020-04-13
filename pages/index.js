/**
 * The Dashboard that loads at the root url. This displays all of the categories
 * and their associated pages. From here you can edit the category attributes and page
 * attributes. The navbar component is also called to allow the user to filter, add
 * pages & categories, and view the settings.
 *
 * TODO:
 *  - See Category.js component
 *  - See PageItem.js component
 */

import { useQuery, gql } from "@apollo/client";
import Head from "next/head";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Category from "../components/Dashboard/Category";

const CATEGORIES = gql`
    {
        categories(orderBy: index_ASC) {
            id
            name
            emoji
            pages(orderBy: index_ASC) {
                name
                serializedName
                status
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
    @media screen and (max-width: ${(props) => props.theme.mobileWidth}) {
        padding: 0 20px;
    }
`;

function Index() {
    const { loading, error, data, refetch } = useQuery(CATEGORIES);

    /** RETURN Loading */
    if (loading)
        return (
            <div>
                <NavBar settings add filter search />
                <p>Loading...</p>
            </div>
        );
    /** RETURN Error */
    if (error)
        return (
            <div>
                <NavBar />
                <p>{error.message}</p>
            </div>
        );

        console.log(data.categories.length === 0);
        
    /** RETURN Dashboard */
    return (
        <div>
            <Head>
                <title>Wiki</title>
            </Head>
            <NavBar data={data} refetch={refetch} settings add filter search />
            {/* Iterates through categories and displays them */}
            <StyledIndex>
                {data.categories.length === 0 ? <p>There is nothing here...</p> :
                Object.keys(data.categories).map((i) => {
                    return (
                        <Category
                            key={data.categories[i].name}
                            name={data.categories[i].name}
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
