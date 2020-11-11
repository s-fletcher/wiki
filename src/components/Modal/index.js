/**
 * Main Modal component that controls the routing of which type of modal to
 * show. It also styles the container.
 * 
 * TODO:
 *  - Allow customization of "Save" button to say other things based on props
 *  - Add Edit Page modal
 *  - Add Edit Category modal
 *  - Add Error Modal
 */

import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CSSTransition } from "react-transition-group";
import AddPage from "./AddPage";
import AddCategory from "./AddCategory";

const Container = styled.div`
    cursor: pointer;
    background: ${(props) => props.theme.fadedBackground};
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 9;
    text-align: left;
`;

const StyledModal = styled.div`
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.07);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    border-radius: 8px;
    min-width: 300px;
    z-index: 10;
    cursor: auto;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    p {
        font-weight: 900;
    }
    .exit {
        height: 22px;
        width: 22px;
    }
`;

const Content = styled.div`
    background: rgba(0, 0, 0, 0.01);
    padding: 20px;
`;

const Footer = styled.div`
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.01);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    font-weight: 900;
    .MuiButton-label {
        font-weight: 700;
        font-size: 1.05em;
    }
    .save {
        background-color: ${(props) => props.theme.blue};
        opacity: 0.9;
        transition: background-color, opacity 0.5s;
        color: white;
        .loading {
            margin-left: 10px;
            color: white;
        }
    }
    .save:hover {
        background-color: ${(props) => props.theme.blue};
        opacity: 1;
    }
`;

function Modal({ setModal, modal, timeout, data, refetch}) {
    const [loading, setLoading] = React.useState(false);

    // Closes modal if clicking outside of container
    function handleClick(event) {
        if (!document.getElementsByClassName("modalContainer")[0].contains(event.target)) {
            setModal(null);
        }
    }
    return (
        <Container onClick={() => handleClick(event)}>
            <StyledModal className="modalContainer">
                <Header>
                    {/* Add Page Title */}
                    <CSSTransition in={modal === "addPage"} timeout={timeout} unmountOnExit>
                        <p>Add Page</p>
                    </CSSTransition>
                    {/* Add Category Title */}
                    <CSSTransition in={modal === "addCategory"} timeout={timeout} unmountOnExit>
                        <p>Add Category</p>
                    </CSSTransition>
                    {/* Export Data Title */}
                    <CSSTransition in={modal === "exportData"} timeout={timeout} unmountOnExit>
                        <p>Export Data</p>
                    </CSSTransition>
                    <IconButton size="small" onClick={() => setModal(null)}>
                        <IoMdClose className="exit" />
                    </IconButton>
                </Header>
                <Content>
                    {/* Add Page Content */}
                    <CSSTransition in={modal === "addPage"} timeout={timeout} unmountOnExit>
                        <AddPage
                            allCategories={data.allCategories}
                            setLoading={setLoading}
                            setModal={setModal}
                        />
                    </CSSTransition>
                    {/* Add Category Content */}
                    <CSSTransition in={modal === "addCategory"} timeout={timeout} unmountOnExit>
                        <AddCategory
                            refetch={refetch}
                            setLoading={setLoading}
                            setModal={setModal}
                        />
                    </CSSTransition>
                    {/* Export Data Content */}
                    <CSSTransition in={modal === "exportData"} timeout={timeout} unmountOnExit>
                        <p>Exporting data is not available in demo mode</p>
                    </CSSTransition>
                </Content>
                <Footer>
                    <Button size="small" onClick={() => setModal(null)}>
                        Cancel
                    </Button>
                    <Button
                        className="save"
                        size="small"
                        variant="contained"
                        disableElevation
                        type="submit"
                        form="modalForm"
                    >
                        Save
                        {loading && <CircularProgress className="loading" size={12} />}
                    </Button>
                </Footer>
            </StyledModal>
        </Container>
    );
}

export default Modal;
