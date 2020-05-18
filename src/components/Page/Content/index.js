/**
 * Holds the content of the page excluding the tree.
 */

import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import { renderToC } from "./renderToC";
import Editor from "./Editor";
import useWarnIfUnsavedChanges from "./useWarnIfUnsavedChanges";

const GET_PAGE = gql`
    query Page($url: String!) {
        allPages(where: { url: $url }) {
            id
            name
            content
            modifiedBy {
                name
            }
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
        ${(props) =>
            !props.hasContent &&
            `
        position: absolute;
        top: 162px;
        `}
        display: flex;
        align-items: baseline;
        .edit {
            color: ${(props) => props.theme.blue};
            font-weight: bold;
            cursor: pointer;
            display: inline-block;
            margin-right: 10px;
        }
        .edit:hover {
            text-decoration: underline;
        }
        .updating {
            color: ${(props) => props.theme.gray};
            cursor: auto;
            text-decoration: none !important;
        }
        .message {
            color: ${(props) => props.theme.gray};
            font-size: 0.9em;
        }
    }
`;

function Content({ edit, setEdit, page, collapseWidth }) {
    // Fetches page data
    const { loading, error, data, refetch } = useQuery(GET_PAGE, {
        variables: { url: page ? page : "" },
    });
    // The content to be rendered and changed
    const [content, setContent] = React.useState("");
    // Tells webapp if it is updating its data
    const [updating, setUpdating] = React.useState(false);
    // Tells webapp if it is saving its data
    const [saving, setSaving] = React.useState(false);
    useWarnIfUnsavedChanges(saving);

    // Every time the page is changed, refetch and set updating state
    React.useEffect(() => {
        if (data) {
            setUpdating(true);
            refetch().then(() => {
                setUpdating(false);
            });
        }
        // When changing pages and is currently in edit mode (pressing back) then toggle edit
        if (edit) {
            toggleEdit();
            setUpdating(false);
            setSaving(false);
        }
    }, [page]);

    // When data is changed after refetch or initial setup, update the content.
    React.useEffect(() => {
        if (data) {
            if (data.allPages[0]) {
                if (data.allPages[0].content === null) {
                    setContent("");
                } else {
                    setContent(data.allPages[0].content);
                }
            }
        }
    }, [data]);

    /** RETURN loading */
    if (loading) return <p>Loading...</p>;
    /** RETURN Error */
    if (error) return <p>{error.message}</p>;
    /** RETURN 404 when page does not exist */
    if (!data.allPages[0]) return <p style={{ fontWeight: 400 }}>Page not found...</p>;

    /**
     * Sets page to editing mode.
     */
    function toggleEdit() {
        setEdit(!edit);
        if (!edit) {
            // Executes when transferring into edit mode
            document.getElementById("editButton").innerHTML = "Done";
            setTimeout(() => (document.getElementById("navbar").style.visibility = "hidden"), 100);
            document.getElementsByClassName("tox-toolbar-overlord")[0].style.visibility = "visible";
            document.getElementsByClassName("tox-toolbar-overlord")[0].style.opacity = 1;
        } else {
            // Executes when transferring into viewing mode
            document.getElementById("navbar").style.visibility = "visible";
            setTimeout(
                () =>
                    (document.getElementsByClassName("tox-toolbar-overlord")[0].style.visibility =
                        "hidden"),
                200
            );
            document.getElementsByClassName("tox-toolbar-overlord")[0].style.opacity = 0;
            document.getElementById("editButton").innerHTML = "Edit";
        }
    }

    return (
        <>
            {/* Sets the title of the page as 'Page Name • Wiki'  */}
            <Head>
                <title>{data.allPages[0].name} • Wiki</title>
            </Head>
            <StyledContent hasContent={content !== ""} collapseWidth={collapseWidth} id="pageContent">
                <h1 className="header">{data.allPages[0].name}</h1>
                {/* Table of contents */}
                {renderToC(content)}
                {/* Editor / viewing */}
                <Editor
                    readOnly={!edit}
                    pageId={data.allPages[0].id}
                    content={content}
                    setContent={setContent}
                    setSaving={setSaving}
                />
                {/* Footer (edit button, updating, last edited by..) */}
                <div className="footer">
                    <p
                        className={`edit ${(updating || saving) && "updating"}`}
                        id="editButton"
                        onClick={() => !updating && !saving && toggleEdit()}
                    >
                        {/* 'Edit' turns into 'Done' when editing */}
                        Edit
                    </p>

                    {!edit ? (
                        updating ? (
                            <p className="message">Updating...</p>
                        ) : (
                            data.allPages[0].modifiedBy && (
                                <p className="message">
                                    Last edited by {data.allPages[0].modifiedBy.name}
                                </p>
                            )
                        )
                    ) : saving ? (
                        <p className="message">Saving...</p>
                    ) : (
                        <p className="message">All changes saved.</p>
                    )}
                </div>
            </StyledContent>
        </>
    );
}

export default Content;
