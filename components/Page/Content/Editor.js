import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { Editor as TinyMCE } from "@tinymce/tinymce-react";
import Compress from "compress.js";

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
    mutation EditContent($pageSerial: String!, $userId: ID!, $content: String!) {
        editContent(pageSerial: $pageSerial, userId: $userId, content: $content) {
            content
        }
    }
`;

function Editor({ setSaving, readOnly, pageSerial, content, setContent }) {
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
            variables: { pageSerial: pageSerial, userId: "demo-user", content: val },
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
                    content_style:
                        "* {font-family: Avenir} *:first-child {margin-top: 0} body {margin: 0} pre {font-size: .85em !important; cursor:auto !important;} pre * {font-family: Menlo} h1,h2,h3{font-weight: 500}",
                    plugins: [
                        "autolink lists link image imagetools code autoresize table paste codesample",
                    ],
                    toolbar:
                        "h1 h2 h3 | bold italic underline strikethrough | bullist numlist outdent indent | image codesample table | removeformat",
                    images_upload_handler: function (blobInfo, success, failure) {
                        console.log(blobInfo.base64());
                        console.log(blobInfo.blob());
                        console.log(blobInfo);
                        const compress = new Compress();

                        // Attach listener
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
                                console.log(data);
                                success(
                                    "data:" + blobInfo.blob().type + ";base64," + data[0].data
                                );
                            });
                    },
                    codesample_languages: [
                        { text: "HTML/XML", value: "markup" },
                        { text: "JavaScript", value: "javascript" },
                        { text: "CSS", value: "css" },
                        { text: "PHP", value: "php" },
                        { text: "Python", value: "python" },
                    ],
                }}
                onEditorChange={handleChange}
            />
            {content.length === 0 && readOnly && (
                <p className="editor-placeholder">There is nothing here...</p>
            )}
        </StyledEditor>
    );
}

export default Editor;
