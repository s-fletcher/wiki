/**
 * A page view where a user can view and edit pages. The file name is [page].js 
 * so that a user can navigate to wiki.hacklahoma.org/demo-page and view the 
 * demo-page. It's basically a parent for all the pages.
 * 
 * TODO:
 *  - Implementing category tree
 *  - Implement viewing the page's content
 *  - Implement editing the page's content
 */

import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Error from "next/error";
import Head from "next/head";
import NavBar from "../components/NavBar";

const GET_PAGE = gql`
    query Page($serializedName: String!) {
        page(where: { serializedName: $serializedName }) {
            name
            serializedName
        }
    }
`;

function Page() {
    const router = useRouter();
    const { page } = router.query;
    const { loading, error, data } = useQuery(GET_PAGE, {
        variables: { serializedName: page },
    });

    /** RETURN loading */
    if (loading)
        return (
            <div>
                <NavBar settings add filter search />
                <p>Loading...</p>
            </div>
        );
    /** RETURN Error */
    if (error) return <p>{error.message}</p>;
    /** RETURN 404 when page does not exist */
    if (!data.page) return <Error statusCode={"404"} />;

    return (
        <div>
            {/* Sets the title of the page as 'Page Name • Wiki'  */}
            <Head>
                <title>{data.page.name} • Wiki</title>
            </Head>
            <NavBar settings add search />
            {/* Page content below */}
            <Link href="/">
                <a>Home</a>
            </Link>
            <p>/{data.page.serializedName}</p>
            <h1>{data.page.name}</h1>
        </div>
    );
}

export default Page;
