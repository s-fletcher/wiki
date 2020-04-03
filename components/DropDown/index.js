import styled from "styled-components";
import Settings from "./Settings";
import Add from "./Add";
import Filter from "./Filter";
import Modal from "../Modal";

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
    .dropItem {
        padding: 5px 20px;
        font-size: 0.85em;
        cursor: pointer;
    }
    .dropItem:hover {
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
    const [modal, setModal] = React.useState();
    if (modal === "addPage") return <Modal setModal={setModal} />;
    if (props.type === "settings") {
        return (
            <StyledDropDown right="15px" className="cancelClose">
                <Settings />
            </StyledDropDown>
        );
    }
    if (props.type === "add") {
        return (
            <StyledDropDown right="65px" className="cancelClose">
                <Add setModal={setModal} />
            </StyledDropDown>
        );
    }
    if (props.type === "filter") {
        return (
            <StyledDropDown right="115px" className="cancelClose">
                <Filter />
            </StyledDropDown>
        );
    }
    return null;
}

export default DropDown;
