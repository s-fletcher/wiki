import styled from "styled-components";
import Link from "next/link";

const StyledLogo = styled.a`
    height: calc(100% - 26px);
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
    @media screen and (max-width: ${props => props.theme.mobileWidth}) {
        display: none;
    }
`;

function Logo() {
    return (
        <Link href="/">
            <StyledLogo>
                <img src="/assets/images/logo.png" alt="logo" />
                <p>Wiki</p>
            </StyledLogo>
        </Link>
    );
}

export default Logo;
