/**
 * Holds the tree to the left of each page.
 */

import styled from "styled-components";
import TreeItem from "./TreeItem";

const StyledTree = styled.div`
    min-width: 230px;
    background: lightgray;
    width: 32%;
    max-width: max-content;
`;

function Tree({ currentPage, loading, error, data }) {
    /** RETURN Loading */
    if (loading) return <p>Loading...</p>;
    /** RETURN Error */
    if (error) return <p>{error.message}</p>;
    /** RETURN Dashboard */
    return (
        <StyledTree>
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
        </StyledTree>
    );
}

export default Tree;
