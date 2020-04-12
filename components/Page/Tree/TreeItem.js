import styled from "styled-components";

const StyledTreeItem = styled.div`
    min-width: 230px;
    background: gray;
    width: 32%;
    max-width: max-content;
`;

function TreeItem({ category }) {
    return <StyledTreeItem>{category}</StyledTreeItem>;
}

export default TreeItem;
