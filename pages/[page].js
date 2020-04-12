/**
 * A page view where a user can view and edit pages. The file name is [page].js
 * so that a user can navigate to wiki.hacklahoma.org/demo-page and view the
 * demo-page. It's basically a parent for all the pages.
 *
 * TODO:
 *  - Implementing category tree
 *  - Implement viewing the page's content
 *  - Implement editing the page's content
 */

import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Error from "next/error";
import Head from "next/head";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import Tree from "../components/Page/Tree";
import Content from "../components/Page/Content";

const GET_PAGE = gql`
    query Page($serializedName: String!) {
        page(where: { serializedName: $serializedName }) {
            name
            serializedName
        }
    }
`;

const StyledPage = styled.div`
    background: ${(props) => (props.edit ? "red" : "unset")};
    transition: background 0.5s;
    min-height: calc(100vh - 60px);
    text-align: left;
    /* background: red; */
    .container {
        padding: 25px;
        display: flex;
        max-width: 1350px;
        margin: auto;
    }
`;

function Page() {
    const router = useRouter();
    const { page } = router.query;
    const [edit, setEdit] = React.useState(false);
    const { loading, error, data } = useQuery(GET_PAGE, {
        variables: { serializedName: page ? page : "" },
    });
    /** RETURN loading */
    if (loading)
        return (
            <div>
                <NavBar settings add search />
                <p>Loading...</p>
            </div>
        );
    /** RETURN Error */
    if (error) return <p>{error.message}</p>;
    /** RETURN 404 when page does not exist */
    if (!data.page) return <Error statusCode={"404"} />;

    return (
        <div>
            {/* Sets the title of the page as 'Page Name • Wiki'  */}
            <Head>
                <title>{data.page.name} • Wiki</title>
            </Head>
            <NavBar settings add search />

            <StyledPage edit={edit}>
                <div className="container">
                    <Tree />
                    <Content data={data} />
                </div>
            </StyledPage>
        </div>
    );
}

export default Page;
