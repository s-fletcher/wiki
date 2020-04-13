/**
 * Helper function for NavBar which renders the logo
 */

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

    @media screen and (max-width: ${(props) => props.theme.mobileWidth}) {
        display: none;
    }
`;

const StyledHamburger = styled.div`
    margin: -2px -20px 0 5px;
    .hamburger {
        padding: 12px 20px;
        cursor: pointer;
        div {
            margin: 5px 0;
            height: 3px;
            width: 25px;
            border-radius: 5px;
            background: ${(props) => props.theme.gray};
        }
        .middle {
            width: 20px;
        }
    }
`;

function Logo({ tree, setTree, collapseWidth }) {
    const [windowWidth, setWindowWidth] = React.useState();

    React.useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    // React.useEffect(() => {
    //     return () => {
    //     };
    // }, []);

    if (windowWidth > collapseWidth) {
        return (
            <Link href="/">
                <StyledLogo>
                    <img src="/assets/images/logo.png" alt="logo" />
                    <p>Wiki</p>
                </StyledLogo>
            </Link>
        );
    } else {
        return (
            <StyledHamburger>
                <div className="hamburger" onClick={() => setTree(!tree)}>
                    <div className="top" />
                    <div className="middle" />
                    <div className="bottom" />
                </div>
            </StyledHamburger>
        );
    }
}

export default Logo;
