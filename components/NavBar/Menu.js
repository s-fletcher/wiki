/**
 * Renders menu for page view when in mobile mode. An abstraction from 
 * LeftParent.
 */
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import Tree from "../Page/Tree";
import { useRouter } from "next/router";
import Logo from "./Logo";

const width = 270;

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
    .menu {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
        height: 100vh;
        width: ${width + "px"};
        background: white;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 13;
        text-align: left;
        .menuContent {
            margin: 25px 20px 0 20px;
            #logo {
                margin: 0 0 25px 0;
            }
        }
    }
    .menuClose {
        background: rgba(0, 0, 0, 0.1);
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        cursor: pointer;
        z-index: 12;
    }
    /* CSS TRANSITIONS */
    .menuCloseWrapper-enter {
        opacity: 0;
    }
    .menuCloseWrapper-enter-active {
        opacity: 1;
        transition: 0.2s;
    }
    .menuCloseWrapper-exit {
        opacity: 1;
    }
    .menuCloseWrapper-exit-active {
        opacity: 0;
        transition: 0.2s;
    }

    .menuWrapper-enter {
        opacity: 0;
        transform: translateX(-${width}px);
        width: 0;
    }
    .menuWrapper-enter-active {
        opacity: 1;
        width: ${width + "px"};
        transform: translateX(0px);
        transition: 0.2s;
    }
    .menuWrapper-exit {
        width: ${width + "px"};
        transform: translateX(0px);
        opacity: 1;
    }
    .menuWrapper-exit-active {
        width: 0;
        opacity: 0;
        transition: 0.2s;
        transform: translateX(-${width}px);
    }
`;

function Menu({data}) {
    const [menu, setMenu] = React.useState(false);
    const router = useRouter();
    var { page } = router.query;
    React.useEffect(() => {
        if (menu) var event = new Event("menuOpen");
        else var event = new Event("menuClose");
        document.dispatchEvent(event);
    }, [menu]);

    return (
        <StyledHamburger>
            <div className="hamburger" onClick={() => setMenu(true)}>
                <div className="top" />
                <div className="middle" />
                <div className="bottom" />
            </div>
            <CSSTransition in={menu} timeout={200} classNames="menuWrapper" unmountOnExit>
                <div className="menu">
                    <div className="menuContent">
                        <Logo override={true} />
                        <Tree currentPage={page} fromMenu={true} setMenu={setMenu} data={data} />
                    </div>
                </div>
            </CSSTransition>
            <CSSTransition in={menu} timeout={200} classNames="menuCloseWrapper" unmountOnExit>
                <div className="menuClose" onClick={() => setMenu(false)} />
            </CSSTransition>
        </StyledHamburger>
    );
}

export default Menu;
