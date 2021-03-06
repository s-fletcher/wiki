/**
 * Holds the tree to the left of each page.
 */

import styled from "styled-components";
import TreeItem from "./TreeItem";

const StyledTree = styled.div`
    /* min-width: 230px; */
    /* width: 32%; */
    min-width: 230px;
    max-width: max-content;
    position: relative;
    margin: 0 30px 0 0;
    .items {
        position: absolute;
        width: 100%;
        overflow-y: scroll;
        height: calc(100vh - 85px);
    }
    .sticky {
        top: 25px;
        width: 230px;
        position: fixed !important;
    }
`;

function Tree({ collapseWidth, fromMenu, setMenu, currentPage, loading, error, data }) {
    /** RETURN Loading */
    if (loading) return <p>Loading...</p>;
    /** RETURN Error */
    if (error) return <p>{error.message}</p>;
    /** RETURN Dashboard */

    // On component mount, add scroll listener to keep tree in viewport on scroll
    React.useEffect(() => {
        if (!fromMenu) {
            window.onscroll = function () {
                if (window.innerWidth > collapseWidth) handleScroll();
            };

            var header = document.getElementById("stickyTree");
            // This is the height of the navbar
            var sticky = document.getElementById("navbar").offsetHeight;

            // Adds sticky class to tree once scrolls past height of navbar
            function handleScroll() {
                if (window.pageYOffset > sticky) {
                    header.classList.add("sticky");
                } else {
                    header.classList.remove("sticky");
                }
            }
        }
    }, []);

    return (
        <StyledTree>
            <div className="items" id={!fromMenu ? "stickyTree" : ""}>
                {/* Renders all individual categories with their page children */}
                {Object.keys(data.allCategories).map((i) => {
                    return (
                        <TreeItem
                            setMenu={setMenu}
                            key={data.allCategories[i].name}
                            name={data.allCategories[i].name}
                            emoji={data.allCategories[i].emoji}
                            pages={data.allCategories[i].pages}
                            currentPage={currentPage}
                        />
                    );
                })}
            </div>
        </StyledTree>
    );
}

export default Tree;
