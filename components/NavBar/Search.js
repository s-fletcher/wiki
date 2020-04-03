import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";

const StyledSearch = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    max-width: 600px;
    margin: 0 40px;
    .icon {
        color: ${props => props.theme.gray};
        width: 26px;
        height: 26px;
        margin-right: 10px;
    }
    input {
        height: 26px;
        width: 100%;
        background: none;
        font-size: 1em;
        color: ${props => props.theme.gray};
        border: none;
        outline: none;
    }
    input::placeholder {
        opacity: .7;
    }
`;

function Search() {
    return (
        <StyledSearch>
            <IoMdSearch className="icon" />
            <input id="search" placeholder="Search for..." />
        </StyledSearch>
    );
}

export default Search;