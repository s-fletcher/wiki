import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";

const StyledTreeItem = styled.div`
    background: gray;
    .active {
        color: blue;
    }
    h3 {
        cursor: pointer;
    }
    .item {
        cursor: pointer;
        display: inline-block;
        margin-left: 30px;
    }
    .item:hover {
        text-decoration: underline;
    }
`;

function TreeItem({ name, emoji, pages, currentPage }) {
    const [expanded, setExpanded] = React.useState(
        pages.some((e) => e.serializedName === currentPage)
    );
    
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
        <StyledTreeItem>
            <h3 onClick={() => setExpanded(!expanded)}>{name}</h3>
            <CSSTransition in={expanded} timeout={100} unmountOnExit>
                {renderChildren}
            </CSSTransition>
        </StyledTreeItem>
    );
}

export default TreeItem;
