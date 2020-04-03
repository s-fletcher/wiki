import styled from "styled-components";

const StyledDropDown = styled.div`
    position: fixed;
    top: 70px;
    right: ${props => props.right};
    background: rgb(248, 248, 248);
    border: 1px solid rgb(213, 213, 213);
    border-radius: 5px;
    box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.05);
    padding: 7px 0;
    text-align: left;
    z-index: 100;
    min-width: 180px;
    p {
        padding: 5px 20px;
        font-size: 0.85em;
        cursor: pointer;
    }
    p:hover {
        background: rgb(233, 233, 233);
    }
    .divider {
        width: 100%;
        height: 1px;
        background: rgb(213, 213, 213);
        margin: 6px 0;
    }
`;

function DropDown(props) {
    if (props.type === "settings") {
        return (
            <StyledDropDown right='15px' id="dropdown">
                <p>Export Data</p>
                <p>Toggle Dark Mode</p>
                <div className="divider" />
                <p>Sign Out</p>
            </StyledDropDown>
        );
    }
    if (props.type === "add") {
        return (
            <StyledDropDown right="65px" id="dropdown">
                <p>Add Page</p>
                <div className="divider" />
                <p>Add Category</p>
            </StyledDropDown>
        );
    }
    if (props.type === "filter") {
        return (
            <StyledDropDown right="115px" id="dropdown">
                <p>filter1</p>
                <p>filter2</p>
                <p>filter3</p>
                <p>filter4</p>
                <p>filter5</p>
                <div className="divider" />
                <p>Clear Filters</p>
            </StyledDropDown>
        );
    }
    return null;
}

export default DropDown;
