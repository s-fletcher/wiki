import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { Editor as TinyMCE } from "@tinymce/tinymce-react";
import Compress from "compress.js";

// Content styles for editor
const ContentStyles = `
    * {
        font-family: Avenir;
        color: #1d1d1d;
    } 
    *:first-child {
        margin-top: 0
    } 
    body {
        margin: 0
    } 
    pre {
        font-size: .85em !important; 
        cursor:auto !important;
    } 
    pre * {
        font-family: Menlo
    } 
    h1,h2,h3 {
        font-weight: 500
    }
    a {
        color: #007FFF;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
`;

// Plugins for editor
const plugins = "autolink lists link image imagetools code autoresize table paste codesample";
// Editor toolbar
const toolbar =
    "h1 h2 h3 | " +
    "bold italic underline strikethrough | " +
    "bullist numlist outdent indent | " +
    "link image codesample table | " +
    "removeformat";

const StyledEditor = styled.div`
    .tox-toolbar-overlord {
        visibility: hidden;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        padding: 10.5px 0;
        border: none !important;
        z-index: 100;
        text-align: center;
        background: white;
        transition: opacity 0.2s;
        opacity: 0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        .tox-toolbar__primary {
            background: none !important;
            justify-content: center;
            .tox-tbtn {
                cursor: pointer;
                span {
                    font-weight: 600;
                    cursor: pointer;
                }
            }
            .tox-tbtn--disabled {
                cursor: not-allowed !important;
                pointer-events: none;
                span {
                    cursor: not-allowed;
                }
            }
        }
    }
    .tox-tinymce {
        border: none !important;
    }
    .editor-placeholder {
        margin-top: -68px;
        margin-bottom: 46px;
        font-style: italic;
        opacity: 0.5;
    }
`;

const EDIT_CONTENT = gql`
    mutation EditContent($id: ID!, $content: String!) {
        updatePage(id: $id, data: { content: $content }) {
            content
        }
    }
`;

function Editor({ setSaving, readOnly, pageId, content, setContent }) {
    const [editContent, data] = useMutation(EDIT_CONTENT);
    const [unsavedContent, setUnsavedContent] = React.useState(null);

    // When being edited, check for a change every 2 seconds and save.
    React.useEffect(() => {
        if (!readOnly) {
            const interval = setInterval(checkChange, 2000);
            return () => clearInterval(interval);
        }
    });

    // Checks if something changed and calls the saved function
    function checkChange() {
        if (unsavedContent !== null) {
            console.log("Saving changes");
            save(unsavedContent);
            setUnsavedContent(null);
        }
    }

    // Saves passed variable
    function save(val) {
        editContent({
            variables: { id: pageId, content: val },
        }).then(setSaving(false));
    }

    // On change of content, update the content state unsaved state and show that it is saving.
    function handleChange(val, editor, event) {
        if (!readOnly) {
            console.log(val);
            setContent(val);
            setUnsavedContent(val);
            setSaving(true);
        }
    }

    // Compresses and uploads image for TinyMCE image upload
    function imageHandler(blobInfo, success, failure) {
        const compress = new Compress();
        const file = [blobInfo.blob()];
        compress
            .compress(file, {
                size: 2, // the max size in MB, defaults to 2MB
                quality: 0.75, // the quality of the image, max is 1,
                maxWidth: 1000, // the max width of the output image, defaults to 1920px
                maxHeight: 1000, // the max height of the output image, defaults to 1920px
                resize: true, // defaults to true, set false if you do not want to resize the image width and height
            })
            .then((data) => {
                success("data:" + blobInfo.blob().type + ";base64," + data[0].data);
            });
    }

    // Called during setup of TinyMCE
    function setup(editor) {
        // Handles pressing on a link when in readOnly mode
        function linkHandler(e) {
            e.preventDefault();
            window.open(e.target.getAttribute("href"), e.target.getAttribute("target"));
        }

        editor.on("SwitchMode", (e) => {
            if (e.mode === "readonly") {
                Array.from(editor.getDoc().querySelectorAll("a")).map((el) => {
                    el.addEventListener("click", linkHandler);
                });
            } else {
                Array.from(editor.getDoc().querySelectorAll("a")).map((el) => {
                    el.removeEventListener("click", linkHandler);
                });
            }
        });
    }

    return (
        <StyledEditor>
            <TinyMCE
                apiKey="pmhesmdd6l3y6l6a67skj9o6hxhwah5g0e9zp657qo7ci68w"
                value={content}
                disabled={readOnly}
                init={{
                    menubar: false,
                    statusbar: false,
                    autoresize_bottom_margin: 30,
                    link_title: false,
                    link_quicklink: true,
                    target_list: false,
                    link_context_toolbar: true,
                    default_link_target: "_blank",
                    content_style: ContentStyles,
                    plugins: plugins,
                    toolbar: toolbar,
                    contextmenu: "link copy paste",
                    images_upload_handler: imageHandler,
                    setup: (editor) => setup(editor),
                }}
                onEditorChange={handleChange}
            />
            {/* Show placeholder if no content and is readOnly */}
            {!content && readOnly && <p className="editor-placeholder">There is nothing here...</p>}
        </StyledEditor>
    );
}

export default Editor;
