/**
 * Main DropDown component that controls the routing of which type of dropdown
 * to show. It also styles the container.
 */

import styled from "styled-components";
import Settings from "./Settings";
import Add from "./Add";
import Filter from "./Filter";
import Modal from "../Modal";
import { CSSTransition } from "react-transition-group";

const StyledDropDown = styled.div`
    position: fixed;
    top: 70px;
    margin-left: ${(props) => props.right};
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

const Animations = styled.div`
    .modal-enter {
        opacity: 0;
    }
    .modal-enter-active {
        opacity: 1;
        transition: opacity ${(props) => props.timeout * 2 + "ms"};
    }
    .modal-exit {
        opacity: 1;
    }
    .modal-exit-active {
        opacity: 0;
        transition: opacity ${(props) => props.timeout + "ms"};
    }
`;

function DropDown(props) {
    const [modal, setModal] = React.useState(null);
    const timeout = 125;

    return (
        <Animations timeout={timeout}>
            {/* Settings drop down */}
            <CSSTransition
                in={props.type === "settings"}
                timeout={0}
                unmountOnExit
                classNames="dropdown"
            >
                <StyledDropDown right={props.page ? "-85px" : "-32px"} className="cancelClose">
                    <Settings setModal={setModal} />
                </StyledDropDown>
            </CSSTransition>

            {/* Add drop down */}
            <CSSTransition
                in={props.type === "add"}
                timeout={0}
                unmountOnExit
                classNames="dropdown"
            >
                <StyledDropDown right={props.page ? "-128px" : "-82px"} className="cancelClose">
                    <Add setModal={setModal} />
                </StyledDropDown>
            </CSSTransition>

            {/* Filter drop down */}
            <CSSTransition
                in={props.type === "filter"}
                timeout={0}
                unmountOnExit
                classNames="dropdown"
            >
                <StyledDropDown right="-132px" className="cancelClose">
                    <Filter />
                </StyledDropDown>
            </CSSTransition>

            {/* Modals */}
            <CSSTransition in={modal !== null} timeout={timeout} unmountOnExit classNames="modal">
                <Modal
                    data={props.data}
                    refetch={props.refetch}
                    timeout={timeout}
                    modal={modal}
                    setModal={setModal}
                />
            </CSSTransition>
        </Animations>
    );
}

export default DropDown;
