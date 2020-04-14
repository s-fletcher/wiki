/**
 * Holds the content of the page excluding the tree.
 */

import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import { renderToC } from "./renderToC";
import Editor from "./Editor";

const GET_PAGE = gql`
    query Page($serializedName: String!) {
        page(where: { serializedName: $serializedName }) {
            name
            content
        }
    }
`;

const StyledContent = styled.div`
    margin: auto;
    width: 100%;
    max-width: 950px;
    .header {
        font-weight: 900;
        padding-bottom: 3px;
        display: inline-block;
        margin-bottom: 20px;
        border-bottom: 2px solid ${(props) => props.theme.lightGray};
    }
    .footer {
        .edit {
            color: ${(props) => props.theme.blue};
            font-weight: bold;
            cursor: pointer;
            display: inline-block;
        }
        .edit:hover {
            text-decoration: underline;
        }
    }
`;

function Content({ setEdit, page, collapseWidth }) {
    const { loading, error, data } = useQuery(GET_PAGE, {
        variables: { serializedName: page ? page : "" },
    });
    const [readOnly, setReadOnly] = React.useState(true);
    /** RETURN loading */
    if (loading) return <p>Loading...</p>;
    /** RETURN Error */
    if (error) return <p>{error.message}</p>;
    /** RETURN 404 when page does not exist */
    if (!data.page) return <Error statusCode={"404"} />;

    function toggleEdit() {
        setReadOnly(!readOnly);
        setEdit(readOnly);
        if (readOnly) {
            document.getElementById("editButton").innerHTML = "Done";
            setTimeout(() => document.getElementById("navbar").style.visibility = "hidden", 100);
            document.getElementsByClassName("ql-toolbar")[0].style.visibility = "visible";
            document.getElementsByClassName("ql-toolbar")[0].style.opacity = 1;
            document.getElementsByClassName("ql-header")[0].innerHTML = "H1";
            document.getElementsByClassName("ql-header")[1].innerHTML = "H2";
            document.getElementsByClassName("ql-header")[2].innerHTML = "H3";
        } else {
            document.getElementById("navbar").style.visibility = "visible";
            setTimeout(() => document.getElementsByClassName("ql-toolbar")[0].style.visibility = "hidden", 200);
            document.getElementsByClassName("ql-toolbar")[0].style.opacity = 0;
            document.getElementById("editButton").innerHTML = "Edit";
        }
    }

    return (
        <>
            {/* Sets the title of the page as 'Page Name • Wiki'  */}
            <Head>
                <title>{data.page.name} • Wiki</title>
            </Head>
            <StyledContent collapseWidth={collapseWidth} id="pageContent">
                <h1 className="header">{data.page.name}</h1>
                {renderToC(data.page.content)}
                <Editor readOnly={readOnly} content={data.page.content} />
                <div className="footer">
                    <p className="edit" id="editButton" onClick={() => toggleEdit()}>
                        Edit
                    </p>
                </div>
            </StyledContent>
        </>
    );
}

export default Content;
