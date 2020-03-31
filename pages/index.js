import { useQuery, gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import NavBar from "../components/NavBar";

const PAGES = gql`
    {
        pages {
            id
            name
        }
    }
`;

function Index() {
    const { loading, error, data } = useQuery(PAGES);

    /** RETURN Loading */
    if (loading) return <p>Loading...</p>;
    /** RETURN Error */
    if (error) return <p>{error.message}</p>;
    /** RETURN Dashboard */
    return (
        <div>
            {/* <Head>
                <title>Wiki</title>
            </Head> */}
            <NavBar />
            Dashboard
            {Object.keys(data.pages).map(i => {
                var id = data.pages[i].id;
                var name = data.pages[i].name;
                return (
                    <div className="item" key={id}>
                        <Link href={`/[page]`} as={`/${id}`}>
                            <a>{name}</a>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default Index;
