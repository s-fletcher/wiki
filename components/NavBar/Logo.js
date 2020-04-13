/**
 * Helper function for NavBar which renders the logo
 */

import styled from "styled-components";
import Link from "next/link";

const StyledLogo = styled.a`
    height: 34px;
    cursor: pointer;
    align-items: center;
    display: inline-flex;
    /* background: red; */
    margin: 13px 0 13px 25px;
    img {
        height: 90%;
    }
    p {
        font-weight: 700;
        font-size: 1.25em;
        margin-left: 5px;
    }

    @media screen and (max-width: ${(props) => props.theme.mobileWidth}) {
        display: ${(props) => (props.override ? "inline-flex" : "none")};
    }
`;

function Logo({ override }) {
    return (
        <Link href="/">
            <StyledLogo id="logo" override={override}>
                <img src="/assets/images/logo.png" alt="logo" />
                <p>Wiki</p>
            </StyledLogo>
        </Link>
    );
}

export default Logo;
