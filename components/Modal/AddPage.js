import TextField from "./Inputs/TextField";
import { gql, useMutation } from "@apollo/client";
import Router from 'next/router'

const ADD_PAGE = gql`
    mutation AddPage($name: String!, $userId: ID!) {
        createPage(name: $name, userId: $userId) {
            serializedName
        }
    }
`;

function AddPage({ setLoading, setModal }) {
    const [pageName, setPageName] = React.useState("");
    const [error, setError] = React.useState(false);
    const [addPage, { data, loading: mutationLoading, error: mutationError }] = useMutation(ADD_PAGE);

    React.useEffect(() => {
        if (mutationLoading) {
            setLoading(true);
        }
        if (!mutationLoading) {
            setLoading(false);
        }
        // Successfully added page
        if(data && !mutationError) {
            setModal(null);
            Router.push(`/${data.createPage.serializedName}`);
        }
    });

    // TODO: 
    //   - Display error messages
    //   - Dynamic UserID
    //   - Refetch dashboard maybe with React Context?
    //   - Delete pages
    //   - Select category
    function onSubmit(event) {
        event.preventDefault();
        setLoading(true);
        if (pageName === "") {
            setError(true);
            setLoading(false);
        } else {
            addPage({ variables: { name: pageName, userId: "demo-user" } });
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
            </form>
        </div>
    );
}

export default AddPage;
