import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";

// Modules for editor
const modules = {
    imageCompress: {
        quality: 0.7,
        maxWidth: 500,
        maxHeight: 500,
        imageType: "image/jpeg",
        debug: true,
    },
    magicUrl: true,
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
    const [unsavedContent, setUnsavedContent] = React.useState("");

    // When being edited, check for a change every 2 seconds and save.
    React.useEffect(() => {
        if (!readOnly) {
            const interval = setInterval(checkChange, 2000);
            return () => clearInterval(interval);
        }
    });

    // Checks if something changed and calls the saved function
    function checkChange() {
        if (unsavedContent.length > 0) {
            console.log("Saving changes");
            save(unsavedContent);
            setUnsavedContent("");
        }
    }

    // Saves passed variable
    function save(val) {
        editContent({
            variables: { pageSerial: pageSerial, userId: "demo-user", content: val },
        }).then(setSaving(false));
    }

    // On change of content, update the content state unsaved state and show that it is saving.
    function handleChange(val, delta, source, editor) {
        if (source === "user") {
            setContent(val);
            setUnsavedContent(val);
            setSaving(true);
        }
    }

    if (document && window) {
        // Get quill after document is rendered due to not supporting SSR
        const ReactQuill = require("react-quill");
        const ImageCompress = require("quill-image-compress");
        const MagicUrl = require("quill-magic-url");
        ReactQuill.Quill.register({
            "modules/imageCompress": ImageCompress.imageCompressor,
            "modules/magicUrl": MagicUrl.default,
        });
        return (
            <StyledEditor>
                <ReactQuill
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
