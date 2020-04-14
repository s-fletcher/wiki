/**
 * Renders menu for page view when in mobile mode. An abstraction from
 * LeftParent.
 */
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import Tree from "../Page/Tree";
import { useRouter } from "next/router";
import Logo from "./Logo";
import IconButton from "@material-ui/core/IconButton";
import { MdClose } from "react-icons/md";

const width = 270;

const StyledHamburger = styled.div`
    margin: -2px -20px 0 5px;
    .hamburgerWrapper {
        margin: 0 7px;
        .hamburger {
            margin: -1.5px 0.5px;
            div {
                margin: 5px 0;
                height: 3px;
                width: 25px;
                border-radius: 5px;
                transition: background 0.5s;
                background: ${(props) => props.theme.gray};
            }
            .middle {
                width: 20px;
            }
        }
    }
    .hamburgerWrapper:hover {
        .hamburger {
            div {
                background: ${(props) => props.theme.blue};
            }
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
            .top {
                display: flex;
                margin-bottom: 20px;
                align-items: center;
                justify-content: space-between;
                #logo {
                    margin: 0;
                }
                .close {
                    transition: color 0.5s;
                }
                .close:hover {
                    color: ${(props) => props.theme.red};
                }
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

function Menu({ data }) {
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
            <IconButton className="hamburgerWrapper" onClick={() => setMenu(true)}>
                <div className="hamburger">
                    <div className="top" />
                    <div className="middle" />
                    <div className="bottom" />
                </div>
            </IconButton>
            <CSSTransition in={menu} timeout={200} classNames="menuWrapper" unmountOnExit>
                <div className="menu">
                    <div className="menuContent">
                        <div className="top">
                            <Logo override={true} />
                            <IconButton className="close" onClick={() => setMenu(false)}>
                                <MdClose />
                            </IconButton>
                        </div>
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
