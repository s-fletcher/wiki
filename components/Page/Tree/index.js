import styled from "styled-components";
import TreeItem from "./TreeItem";

const StyledTree = styled.div`
    min-width: 230px;
    background: lightgray;
    width: 32%;
    max-width: max-content;
`;

function Tree() {
    return <StyledTree><TreeItem category={"Sponsoring"} /></StyledTree>;
}

export default Tree;
