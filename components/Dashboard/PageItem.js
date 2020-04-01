import styled from "styled-components";
import Link from "next/link";

const StyledPageItem = styled.div`
    a {
        text-decoration: none;
        color: #1d1d1d;
    }
    a:hover {
        text-decoration: underline;
    }
`;

function PageItem(props) {
    return (
        <StyledPageItem>
            <Link href="/[page]" as={`/${props.id}`}>
                <a>{props.name}</a>
            </Link>
        </StyledPageItem>
    );
}

export default PageItem;
