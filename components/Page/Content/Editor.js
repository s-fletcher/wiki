import styled from "styled-components";

// Modules for editor
const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { header: "3" }],
        ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
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
    "code-block",
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
    }
    .ql-toolbar {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        padding: 17px 0;
        border: none !important;
        z-index: 100;
        text-align: center;
        background: white;
    }
    .ql-container {
        border: none !important;
    }
    .ql-editor {
        padding: 0;
    }
`;

function Editor({ content, readOnly }) {
    if (document) {
        const Quill = require("react-quill");
        return (
            <StyledEditor>
                <Quill
                    readOnly={readOnly}
                    value={content}
                    placeholder="There is nothing here..."
                    // onChange={this.handleChange}
                    modules={modules}
                    formats={formats}
                />
            </StyledEditor>
        );
    } else return null;
}

export default Editor;
