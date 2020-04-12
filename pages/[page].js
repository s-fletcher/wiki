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
    const router = useRouter();
    var { page } = router.query;
    const [edit, setEdit] = React.useState(false);

    return (
        <div>
            <NavBar settings add search />
            <StyledPage edit={edit}>
                <div className="container">
                    <Tree currentPage={page} />
                    <Content page={page} />
                </div>
            </StyledPage>
        </div>
    );
}

export default Page;
