/**
 * Child component for Modal to add a page.
 *
 * @param setModal Set's the modal to render in viewport
 * @param refetch Refetch the data to update dashboard
 * @param setLoading Displays the loading icon in button
 */

import TextField from "./Inputs/TextField";
import Select from "./Inputs/Select";
import { gql, useMutation } from "@apollo/client";
import Router from "next/router";

const ADD_PAGE = gql`
    mutation AddPage($name: String!, $categoryId: ID!) {
        createPage(data: { name: $name, category: { connect: { id: $categoryId } } }) {
            url
        }
    }
`;

function AddPage({ setLoading, setModal, allCategories }) {
    const [pageName, setPageName] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [error, setError] = React.useState(false);
    const [addPage, { data, loading: mutationLoading, error: mutationError }] = useMutation(
        ADD_PAGE
    );

    React.useEffect(() => {
        if (mutationLoading) {
            setLoading(true);
        }
        if (!mutationLoading) {
            setLoading(false);
        }
        // Successfully added page
        if (data && !mutationError) {
            setModal(null);
            Router.push(`/${data.createPage.url}`);
        }
    });

    // TODO:
    //   - Display error messages
    //   - Dynamic UserID
    //   - Delete pages
    //   - Add character limits
    function onSubmit(event) {
        event.preventDefault();
        setLoading(true);
        if (pageName === "") {
            setError(true);
            setLoading(false);
        } else if (category === "") {
            addPage({ variables: { name: pageName } });
            setError(false);
        } else {
            addPage({ variables: { name: pageName, categoryId: category } });
            console.log(`Adding ${pageName} to ${category}`);
            
            setError(false);
        }
    }

    return (
        <div>
            <form id="modalForm" onSubmit={onSubmit}>
                <TextField
                    label="Page Name"
                    error={error}
                    setValue={setPageName}
                    value={pageName}
                    id="pageName"
                />
                <Select
                    options={allCategories}
                    label="Category"
                    optional
                    setValue={setCategory}
                    value={category}
                    id="category"
                />
            </form>
        </div>
    );
}

export default AddPage;
