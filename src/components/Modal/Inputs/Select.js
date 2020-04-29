/**
 * A type of input to select from different options.
 */

import styled from "styled-components";

const StyledTextField = styled.div`
    margin: 10px 0;
    p {
        font-weight: 700;
        .optional {
            color: ${(props) => props.theme.gray};
            font-size: 0.8em;
        }
    }
    select {
        font-size: 0.95em;
        border: none;
        padding: 6px 12px;
        margin: 4px 0;
        border-radius: 5px;
        box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.07);
        /* width: calc(100% - 24px); */
        cursor: pointer;
        border: 1px solid rgb(213, 213, 213);
    }
    select:focus {
        outline: none;
    }
    select.inputError {
        border-color: ${(props) => props.theme.red};
    }
`;

function TextField({ error, required, setValue, label, optional, options }) {
    return (
        <StyledTextField className="textField">
            <p>
                {label} {optional && <span className="optional">(optional)</span>}
            </p>
            <select
                defaultValue="default"
                onChange={() => setValue(event.target.value)}
                className={error ? "inputError" : null}
            >
                <option disabled value="default">
                    -
                </option>
                {Object.values(options).map((val) => {
                    return (
                        <option key={val.id} value={val.id}>
                            {val.name}
                        </option>
                    );
                })}
            </select>
        </StyledTextField>
    );
}

export default TextField;
