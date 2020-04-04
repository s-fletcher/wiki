import styled from "styled-components";
import Link from "next/link";
import { GoPrimitiveDot } from "react-icons/go";
import { withTheme } from "styled-components";

const StyledPageItem = styled.div`
    display: flex;
    align-items: center;
    a {
        text-decoration: none;
        color: #1d1d1d;
    }
    a:hover {
        text-decoration: underline;
    }
    .status {
        margin-right: 5px;
    }
`;

function PageItem(props) {
    function statusColor(status) {
        if (status === "INCOMPLETE") return props.theme.red;
        if (status === "TRANSITION") return props.theme.yellow;
        if (status === "COMPLETE") return props.theme.green;
        else return props.theme.black;
    }
    return (
        <StyledPageItem>
            <GoPrimitiveDot className="status" style={{ color: statusColor(props.status) }} />
            <Link href="/[page]" as={`/${props.url}`}>
                <a>{props.name}</a>
            </Link>
        </StyledPageItem>
    );
}

export default withTheme(PageItem);
