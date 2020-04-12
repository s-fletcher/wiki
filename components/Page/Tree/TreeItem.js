/**
 * Each individual category that will display their children pages upon click.
 */

import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

const StyledTreeItem = styled.div`
    /* background: gray; */
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .icon {
            transition: transform .1s;
            transform: ${props => props.expanded ? 'rotate(90deg)' : 'rotate(0deg)'};
        }
    }
    .pages {
        .active {
            color: blue;
        }
        .item {
            cursor: pointer;
            display: inline-block;
            margin-left: 30px;
        }
        .item:hover {
            text-decoration: underline;
        }
        .treeItem-enter {
            overflow-y: hidden;
            height: 0;
        }
        .treeItem-enter-active {
            height: calc(${(props) => props.num} * 22px);
            transition: all 100ms;
        }
        .treeItem-exit {
            height: calc(${(props) => props.num} * 22px);
        }
        .treeItem-exit-active {
            overflow-y: hidden;
            height: 0;
            transition: all 100ms;
        }
    }
`;

function TreeItem({ name, emoji, pages, currentPage }) {
    const [expanded, setExpanded] = React.useState(
        pages.some((e) => e.serializedName === currentPage)
    );

    /**
     * Renders the individual pages of the category
     */
    function renderChildren() {
        var result = [];
        for (var i in pages) {
            if (pages[i].serializedName === currentPage)
                result.push(
                    <p key={pages[i].serializedName} className="active item">
                        {pages[i].name}
                    </p>
                );
            else
                result.push(
                    <div key={pages[i].serializedName}>
                        <Link href="/[page]" as={`/${pages[i].serializedName}`}>
                            <p className="item">{pages[i].name}</p>
                        </Link>
                    </div>
                );
        }
        return result;
    }

    return (
        <StyledTreeItem expanded={expanded} num={pages.length}>
            <div onClick={() => setExpanded(!expanded)} className="header">
                <h3>{name}</h3>
                <MdKeyboardArrowRight className="icon" />
            </div>
            <div className="pages">
                <CSSTransition classNames="treeItem" in={expanded} timeout={100} unmountOnExit>
                    <div>{renderChildren()}</div>
                </CSSTransition>
            </div>
        </StyledTreeItem>
    );
}

export default TreeItem;
