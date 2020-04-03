import styled from "styled-components";
import { IoMdSettings, IoMdAdd } from "react-icons/io";
import { FaFilter, FaPlus } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const StyledButtons = styled.div`
    /* background: red; */
    margin-right: 10px;
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
        transition: color .5s;
    }
    .icon:hover {
        color: ${props => props.theme.blue};
    }
`;

function Buttons(props) {
    return (
        <StyledButtons>
            {props.filter ? (
                <Tooltip title="Filter">
                    <IconButton className="icon">
                        <FaFilter className="filter" />
                    </IconButton>
                </Tooltip>
            ) : null}
            {props.add ? (
                <Tooltip title="Add">
                    <IconButton className="icon">
                        <FaPlus className="add" />
                    </IconButton>
                </Tooltip>
            ) : null}
            {props.settings ? (
                <Tooltip title="Settings">
                    <IconButton className="icon">
                        <IoMdSettings className="settings" />
                    </IconButton>
                </Tooltip>
            ) : null}
        </StyledButtons>
    );
}

export default Buttons;
