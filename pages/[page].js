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

import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import Tree from "../components/Page/Tree";
import Content from "../components/Page/Content";
import { gql, useQuery } from "@apollo/client";

const CATEGORIES = gql`
    {
        categories(orderBy: index_ASC) {
            id
            name
            emoji
            pages(orderBy: index_ASC) {
                name
                serializedName
            }
        }
    }
`;

const StyledPage = styled.div`
    background: ${(props) => (props.edit ? "red" : "unset")};
    transition: background 0.5s;
    min-height: calc(100vh - 60px);
    text-align: left;
    .container {
        padding: 25px;
        display: flex;
        max-width: 1200px;
        margin: auto;
    }
`;

function Page() {
    const { loading, error, data, refetch } = useQuery(CATEGORIES);
    const router = useRouter();
    var { page } = router.query;
    const [edit, setEdit] = React.useState(false);

    return (
        <div>
            <NavBar data={data} refetch={refetch} settings add search />
            <StyledPage edit={edit}>
                <div className="container">
                    <Tree data={data} loading={loading} error={error} currentPage={page} />
                    <Content page={page} />
                </div>
            </StyledPage>
        </div>
    );
}

export default Page;
