import styled from "styled-components";
import Logo from "./Logo";
import Buttons from "./Buttons";

const StyledNavBar = styled.div`
    width: 100vw;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    background: white;
    .container {
        max-width: 1000px;
        margin: auto;
        height: 60px;
        justify-content: space-between;
        align-items: center;
        display: flex;
    }
`;

function NavBar(props) {
    return (
        <StyledNavBar>
            <div className="container">
                <Logo />
                <Buttons filter={props.filter} add={props.add} settings={props.settings} />
            </div>
        </StyledNavBar>
    );
}

export default NavBar;
