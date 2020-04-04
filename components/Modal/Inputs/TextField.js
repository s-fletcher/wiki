import styled from "styled-components";

const StyledTextField = styled.div`
    p {
        font-weight: 700;
    }
    input {
        font-size: 0.95em;
        border: none;
        padding: 6px 12px;
        margin: 4px 0;
        border-radius: 5px;
        box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.07);
        width: calc(100% - 24px);
        border: 1px solid rgb(213, 213, 213);
    }
    input:focus {
        outline: none;
    }
    input.inputError {
        border-color: ${props => props.theme.red};
    }
`;

function TextField({ error, required, value, setValue, label }) {
    return (
        <StyledTextField className="textField">
            <p>{label}</p>
            <input
                onChange={() => setValue(event.target.value)}
                value={value}
                required={required}
                className={error ? 'inputError' : null}
            />
        </StyledTextField>
    );
}

export default TextField;
