import styled from "styled-components";
import PageItem from "./PageItem";

const StyledCategory = styled.div``;

function Category(props) {
    return (
        <StyledCategory>
            {props.name}
            {Object.keys(props.pages).map(page => {
                return (
                    <PageItem
                        key={props.pages[page].id}
                        id={props.pages[page].id}
                        name={props.pages[page].name}
                        status={props.pages[page].status}
                        index={props.pages[page].index}
                    />
                );
            })}
        </StyledCategory>
    );
}

export default Category;
