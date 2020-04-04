import styled from "styled-components";
import Link from "next/link";
import { GoPrimitiveDot } from "react-icons/go";

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
        if (status === "INCOMPLETE") return "#bd2020";
        if (status === "TRANSITION") return "#ffe063";
        if (status === "COMPLETE") return "#36de2a";
        else return "#000000";
    }
    return (
        <StyledPageItem>
            <GoPrimitiveDot className="status" style={{ color: statusColor(props.status) }} />
            <Link href="/[page]" as={`/${props.id}`}>
                <a>{props.name}</a>
            </Link>
        </StyledPageItem>
    );
}

export default PageItem;
