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
    margin: 0 40px 0 0;
    .items {
        position: absolute;
        width: 100%;
        overflow-y: scroll;
        height: calc(100vh - 50px);
    }
    .sticky {
        top: 25px;
        width: 230px;
        position: fixed;
    }
`;

function Tree({ currentPage, loading, error, data }) {
    /** RETURN Loading */
    if (loading) return <p>Loading...</p>;
    /** RETURN Error */
    if (error) return <p>{error.message}</p>;
    /** RETURN Dashboard */

    React.useEffect(() => {
        window.onscroll = function () {
            myFunction();
        };

        var header = document.getElementById("stickyTree");
        var sticky = header.getBoundingClientRect().top - 25;

        function myFunction() {
            if (window.pageYOffset > sticky) {
                header.classList.add("sticky");
            } else {
                header.classList.remove("sticky");
            }
        }
    }, []);

    return (
        <StyledTree>
            <div className="items" id="stickyTree">
                {Object.keys(data.categories).map((i) => {
                    return (
                        <TreeItem
                            key={data.categories[i].name}
                            name={data.categories[i].name}
                            emoji={data.categories[i].emoji}
                            pages={data.categories[i].pages}
                            currentPage={currentPage}
                        />
                    );
                })}
            </div>
        </StyledTree>
    );
}

export default Tree;
