import styled from "styled-components";

const StyledPageItem = styled.div``;

function PageItem(props) {
    return (
        <StyledPageItem>
            {props.name}
        </StyledPageItem>
    );
}

export default PageItem;
