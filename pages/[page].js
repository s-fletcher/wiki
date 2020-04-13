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
import { CSSTransition } from "react-transition-group";

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

var maxWidth = 1200;

const StyledPage = styled.div`
    background: ${(props) => (props.edit ? "red" : "unset")};
    transition: background 0.5s;
    min-height: calc(100vh - 60px);
    text-align: left;
    .container {
        padding: 25px;
        display: flex;
        max-width: ${`${maxWidth}px`};
        margin: auto;
    }
    .tree-enter {
        opacity: 0;
        transform: translateX(-100px);
        width: 0;
    }
    .tree-enter-active {
        opacity: 1;
        width: 230px;
        transform: translateX(0px);
        transition: 0.2s;
    }
    .tree-exit {
        width: 230px;
        transform: translateX(0px);
        opacity: 1;
    }
    .tree-exit-active {
        width: 0;
        opacity: 0;
        transition: 0.2s;
        transform: translateX(-100px);
    }
`;

/**
 * The window width to collapse the tree
 */
const collapseWidth = 800;

function Page({ theme }) {
    const { loading, error, data, refetch } = useQuery(CATEGORIES);
    const [tree, setTree] = React.useState(false);
    const [windowWidth, setWindowWidth] = React.useState();
    const router = useRouter();
    var { page } = router.query;
    const [edit, setEdit] = React.useState(false);

    React.useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.onresize = function () {
            setWindowWidth(window.innerWidth);
        };
    }, []);

    return (
        <div>
            <NavBar
                tree={tree}
                setTree={setTree}
                collapseWidth={collapseWidth}
                maxWidth={maxWidth}
                data={data}
                refetch={refetch}
                settings
                add
                search
            />
            <StyledPage edit={edit}>
                <div className="container">
                    <CSSTransition
                        in={tree || windowWidth > collapseWidth}
                        timeout={200}
                        classNames="tree"
                        unmountOnExit
                    >
                        <div className="treeContainer">
                            <Tree
                                className="test"
                                data={data}
                                loading={loading}
                                error={error}
                                currentPage={page}
                            />
                        </div>
                    </CSSTransition>
                    <Content tree={tree} collapseWidth={collapseWidth} page={page} />
                </div>
            </StyledPage>
        </div>
    );
}

export default Page;
