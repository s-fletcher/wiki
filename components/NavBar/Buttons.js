/**
 * Helper function for NavBar which renders all the individual buttons to
 * choose from.
 */

import styled from "styled-components";
import { IoMdSettings } from "react-icons/io";
import { FaFilter, FaPlus } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DropDown from "../DropDown";

const StyledButtons = styled.div`
    margin-right: 10px;
    white-space: nowrap;
    /* min-width: 150px; */
    text-align: right;
    .filter {
        height: 20px;
        width: 20px;
        padding: 3px;
    }
    .add {
        height: 23px;
        width: 23px;
        padding: 1.5px;
    }
    .settings {
        height: 26px;
        width: 26px;
    }
    .icon {
        z-index: 3;
        transition: color 0.5s;
    }
    .icon:hover {
        color: ${props => props.theme.blue};
    }
    @media screen and (max-width: ${props => props.theme.mobileWidth}) {
        margin-right: 0;
    }
`;

function Buttons(props) {
    const [type, setType] = React.useState();

    /**
     * Handles click on any of the buttons
     * @param newType the type of dropdown to render
     */
    function handleClick(newType) {
        if (type === newType) {
            setType(null);
            return;
        } else setType(newType);
        // An event listener that self destructs after use and closes dropdown when clicking
        window.addEventListener(
            "click",
            function listener(event) {
                // If clicked object is has the class of cancel close, then do nothing.
                if (event.target.classList.contains("cancelClose")) return;
                // If clicked object is the button that opened it, then only remove listener and let the function do it's thing.
                if (document.getElementById(newType).contains(event.target)) {
                    window.removeEventListener("click", listener, true);
                    return;
                }
                // If clicked object is a drop item, delay so button can activate
                if (event.target.classList.contains("dropItem")) {
                    setTimeout(() => {
                        setType(null);
                        window.removeEventListener("click", listener, true);
                    }, 100);
                    return;
                }
                // Clicking on other drop downs
                setType(null);
                window.removeEventListener("click", listener, true);
            },
            true
        );
    }
    

    return (
        <StyledButtons>
            {props.filter ? (
                <Tooltip title={type === "filter" ? "" : "Filter"}>
                    <IconButton id="filter" onClick={() => handleClick("filter")} className="icon">
                        <FaFilter className="filter" />
                    </IconButton>
                </Tooltip>
            ) : null}
            {props.add ? (
                <Tooltip title={type === "add" ? "" : "Add"}>
                    <IconButton id="add" onClick={() => handleClick("add")} className="icon">
                        <FaPlus className="add" />
                    </IconButton>
                </Tooltip>
            ) : null}
            {props.settings ? (
                <Tooltip title={type === "settings" ? "" : "Settings"}>
                    <IconButton
                        id="settings"
                        onClick={() => handleClick("settings")}
                        className="icon"
                    >
                        <IoMdSettings className="settings" />
                    </IconButton>
                </Tooltip>
            ) : null}
            <DropDown data={props.data} refetch={props.refetch} type={type} />
        </StyledButtons>
    );
}

export default Buttons;
