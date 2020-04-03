import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

const StyledModal = styled.div`
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.07);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    min-width: 300px;
    z-index: 10;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    p {
        font-weight: 700;
    }
    .exit {
        height: 22px;
        width: 22px;
    }
`;

const Content = styled.div`
    background: rgba(0, 0, 0, 0.01);
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
        background-color: ${props => props.theme.blue};
        opacity: 0.9;
        transition: background-color, opacity .5s;
        color: white;
    }
    .save:hover {
        background-color: ${props => props.theme.blue};
        opacity: 1;
    }
`;

function Modal({setModal}) {
    return (
        <StyledModal>
            <Header>
                <p>Add Page</p>
                <IconButton size="small" onClick={() => setModal(null)}>
                    <IoMdClose className="exit" />
                </IconButton>
            </Header>
            <Content>Content</Content>
            <Footer>
                <Button size="small" onClick={() => setModal(null)}>
                    Cancel
                </Button>
                <Button className="save" size="small" variant="contained" disableElevation>
                    Save
                </Button>
            </Footer>
        </StyledModal>
    );
}

export default Modal;
