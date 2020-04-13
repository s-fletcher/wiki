/**
 * NavBar container that displays it's child components
 */

import styled from "styled-components";
import Logo from "./Logo";
import Buttons from "./Buttons";
import Search from "./Search";
import Router from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart = () => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => {
    NProgress.done();
};
Router.onRouteChangeError = () => {
    NProgress.done();
};

const StyledNavBar = styled.div`
    width: 100vw;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    background: white;
    .container {
        max-width: ${props => props.maxWidth + "px"};
        margin: auto;
        height: 60px;
        justify-content: space-between;
        align-items: center;
        display: flex;
    }
`;

function NavBar(props) {
    return (
        <StyledNavBar maxWidth={props.maxWidth === undefined ? 1000 : props.maxWidth + 50}>
            <div className="container">
                <Logo collapseWidth={props.collapseWidth} tree={props.tree} setTree={props.setTree} />
                {props.search ? <Search /> : null}
                <Buttons
                    data={props.data}
                    refetch={props.refetch}
                    filter={props.filter}
                    add={props.add}
                    settings={props.settings}
                />
            </div>
        </StyledNavBar>
    );
}

export default NavBar;
