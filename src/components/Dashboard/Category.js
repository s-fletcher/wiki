/**
 * Generates the categories name as a header and then maps through it's pages
 * to display those as PageItems. Also allows user to edit attributes on hover.
 * 
 * TODO:
 *  - Edit category attributes feature
 *  - Display emoji of category
 *  - See PageItem.js component
 */

import styled from "styled-components";
import PageItem from "./PageItem";

const StyledCategory = styled.div`
    margin-bottom: 20px; /* Spacing between surrounding categories */
    page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;

    .heading {
        display: inline-block;
        h1 {
            font-size: 1.5em;
            font-weight: 900;
        }
        .underline {
            height: 2px;
            background: ${props => props.theme.lightGray};
            margin-top: 3px;
        }
    }
    .pages {
        margin-top: 10px; /* Spacing between header and page list */
    }
`;

function Category(props) {
    return (
        <StyledCategory>
            <div className="heading">
                <h1>{props.name}</h1>
                <div className="underline" />
            </div>
            {Object(props.pages).length > 0 ? (
                <div className="pages">
                    {Object.keys(props.pages).map(page => {
                        return (
                            <PageItem
                                key={props.pages[page].url}
                                url={props.pages[page].url}
                                name={props.pages[page].name}
                                status={props.pages[page].status}
                            />
                        );
                    })}
                </div>
            ) : null}
        </StyledCategory>
    );
}

export default Category;
