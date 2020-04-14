import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";

// Modules for editor
const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { header: "3" }],
        ["bold", "italic", "underline", "strike", "blockquote", "code"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
    ],
};

// Formats for editor
const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
];

const StyledEditor = styled.div`
    .ql-container {
        font-size: 1em;
        h1,
        h2,
        h3 {
            font-weight: 700;
            margin-top: 18px;
            strong {
                font-weight: 900;
            }
        }
        * {
            margin: 10px 0;
        }
        *:first-child {
            margin-top: 0;
        }
        li {
            margin: 3px 0;
        }
        code {
            font-family: Menlo;
            color: #444;
        }
    }
    .ql-toolbar {
        visibility: hidden;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        padding: 18px 0;
        border: none !important;
        z-index: 100;
        text-align: center;
        background: white;
        transition: opacity 0.2s;
        opacity: 0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        .ql-header {
            font-weight: 900;
            font-size: 1em;
            color: #444;
            margin-top: -2px;
        }
    }
    .ql-container {
        border: none !important;
        .ql-blank {
            white-space: nowrap;
            position: relative;
            /* left: -15px; */
        }
        .ql-blank::before {
            left: 0;
        }
    }
    .ql-editor {
        padding: 0;
    }
`;

const EDIT_CONTENT = gql`
    mutation EditContent($pageSerial: String!, $userId: ID!, $content: String!) {
        editContent(pageSerial: $pageSerial, userId: $userId, content: $content) {
            content
        }
    }
`;

function Editor({ setSaving, readOnly, pageSerial, content, setContent }) {
    const [editContent, data] = useMutation(EDIT_CONTENT);

    // When saving, update the save state to display to user
    React.useEffect(() => {
        setSaving(data.loading);
    }, [data.loading])

    // On change of content, update the content state and the database.
    function handleChange(val) {
        setContent(val);
        editContent({
            variables: { pageSerial: pageSerial, userId: "demo-user", content: val },
        });
    }

    if (document) {
        // Get quill after document is rendered due to not supporting SSR
        const Quill = require("react-quill");
        return (
            <StyledEditor>
                <Quill
                    placeholder="There is nothing here..."
                    readOnly={readOnly}
                    value={content}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                />
            </StyledEditor>
        );
    } else return null;
}

export default Editor;
