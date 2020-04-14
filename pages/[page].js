/**
 * A page view where a user can view and edit pages. The file name is [page].js
 * so that a user can navigate to wiki.hacklahoma.org/demo-page and view the
 * demo-page. It's basically a parent for all the pages.
 *
 * TODO:
 *  - Click on header to copy link and refer to it.
 *  - Collaborative editing
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
    background: ${(props) => (props.edit ? "rgba(29,30,32,0)" : "unset")};
    transition: background 0.5s, transform 0.2s;
    min-height: calc(100vh - 60px);
    text-align: left;
    .container {
        padding: 25px;
        display: flex;
        position: relative;
        max-width: ${`${maxWidth}px`};
        margin: auto;
    }
    .tree-enter {
        opacity: 0;
        transform: translateX(-100px);
        width: 0;
        margin-right: 0;
    }
    .tree-enter-active {
        opacity: 1;
        width: 230px;
        transform: translateX(0px);
        transition: 0.2s;
        margin-right: 30px;
    }
    .tree-exit {
        width: 230px;
        transform: translateX(0px);
        opacity: 1;
        margin-right: 30px;
    }
    .tree-exit-active {
        width: 0;
        opacity: 0;
        margin-right: 0;
        transition: 0.2s;
        transform: translateX(-100px);
    }
`;

/**
 * The window width to collapse the tree
 */
const collapseWidth = 800;

function Page() {
    // Fetching category data for tree component
    const { loading, error, data, refetch } = useQuery(CATEGORIES);
    // Whether menu bar is open for mobile or not
    const [menuOpen, setMenuOpen] = React.useState(true);
    // Getting the page name in the router
    const router = useRouter();
    var page = router.asPath.substring(1);

    // Whether the page is being edited or not
    const [edit, setEdit] = React.useState(false);

    // On component mount, set whether menu should be open or not and listen for events
    React.useEffect(() => {
        setMenuOpen(window.innerWidth > collapseWidth);
        window.addEventListener("resize", handleResize);

        document.addEventListener("menuOpen", onMenuOpen);
        document.addEventListener("menuClose", onMenuClose);
    }, []);

    // On component unmount, remove event listeners
    React.useEffect(() => {
        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("menuOpen", onMenuOpen);
            document.removeEventListener("menuClose", onMenuClose);
        };
    }, []);

    // Called when resizing window to auto close menu bar
    function handleResize() {
        setMenuOpen(window.innerWidth > collapseWidth);
        if (window.innerWidth > collapseWidth) {
            onMenuClose();
        }
    }

    // Change styling whenever menu opens
    function onMenuOpen() {
        document.getElementById("page").style.transform = "translateX(270px)";
        document.getElementById("searchBar").style.transform = "translateX(220px)";
        document.getElementById("buttons").style.transform = "translateX(220px)";
    }
    // Change styling whenever menu closes
    function onMenuClose() {
        document.getElementById("page").style.transform = "";
        document.getElementById("searchBar").style.transform = "";
        document.getElementById("buttons").style.transform = "";
    }

    return (
        <div>
            {/* Render navbar and send data so it can render the mobile version of the tree */}
            <NavBar
                menuOpen={menuOpen}
                maxWidth={maxWidth}
                data={data}
                refetch={refetch}
                page
                settings
                add
                search
            />
            <StyledPage id="page" edit={edit}>
                <div className="container">
                    {/* Render tree if menu should be open and not being edited (LEFT PANE) */}
                    <CSSTransition
                        in={menuOpen && !edit}
                        timeout={200}
                        classNames="tree"
                        unmountOnExit
                    >
                        <div className="treeContainer">
                            <Tree
                                collapseWidth={collapseWidth}
                                className="test"
                                data={data}
                                loading={loading}
                                error={error}
                                currentPage={page}
                            />
                        </div>
                    </CSSTransition>
                    {/* Render content (RIGHT PANE) */}
                    <Content
                        setEdit={setEdit}
                        edit={edit}
                        collapseWidth={collapseWidth}
                        page={page}
                    />
                </div>
            </StyledPage>
        </div>
    );
}

export default Page;
