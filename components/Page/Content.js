/**
 * Holds the content of the page excluding the tree.
 */

import styled from "styled-components";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Head from "next/head";

const GET_PAGE = gql`
    query Page($serializedName: String!) {
        page(where: { serializedName: $serializedName }) {
            name
        }
    }
`;

const StyledContent = styled.div`
`;

function Content({ page, collapseWidth }) {
    const { loading, error, data } = useQuery(GET_PAGE, {
        variables: { serializedName: page ? page : "" },
    });
    /** RETURN loading */
    if (loading) return <p>Loading...</p>;
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
            <StyledContent collapseWidth={collapseWidth} id="pageContent">
                <h1>{data.page.name}</h1>
                <p>
                    Setting up the room Two laptops are needed in the room to attest for manual
                    check-ins. Don't forget laptop chargers. Badges need to be labeled by shapes
                    before check-in starts. X's on the badges means they have a dietary restriction
                    There should then be 5 other shapes of the same quantity given to hackers. The
                    shapes go as followed: Squares Circles Triangles Hearts Stars Directing the
                    hacker to the check-in room Staff/volunteers are needed at both entrances
                    guiding hackers into the correct area by holding signs with arrows and welcoming
                    them in. If volunteers don't show up or we don't have enough resources, signs
                    need to be posted starting from the entrance to the check-in room. Controlling
                    traffic Traffic needs to be controlled by hackers entering with the room’s West
                    doors and exiting with the room’s East doors. The three step process should be
                    obvious to the hackers by using either stanchions or a carpet. See it as showing
                    the hacker a yellow brick road. Hacker Walk Through The check in process should
                    be quick and easy in the eyes of the hacker. Divided into three stations, the
                    following includes what people and their roles needed. Step 1: Checking in Two
                    staff members are assigned at the check-in station. Their role includes helping
                    check in hackers, but more importantly, answer questions or handle any
                    complications. Two volunteers are assigned at the check in station. The role of
                    these two people is to check hackers in and direct all questions to the staff
                    members. It’s important that volunteers send questions to the staff members to
                    prevent line congestion. Once checked in, volunteers should direct hackers to
                    pick up their badge. Step 2: Badge pickup One staff member is assigned to the
                    badge pickup station. Their job is to assist the volunteers, but more
                    importantly, answer any questions from the hackers while periodically looking
                    over the swag table to restock. Two volunteers are assigned at the badge pickup
                    station. When hackers approach, the first thing volunteers should ask is “Do you
                    have any dietary restrictions?” If so, hand them the designated badge. Then have
                    hackers fill out their own badge. It's important to have space on the table for
                    hackers to write their names on the badges. Volunteers are not to fill out the
                    badges themselves to prevent congestion. Once done, volunteers should direct
                    hackers to the swag station, then exit out the West door, and then hang out
                    until the opening ceremony begins. Step 3: Swag pickup No one is assigned at
                    this station. Hackers should know to pick up the swag and then exit out the West
                    door.
                </p>
            </StyledContent>
        </div>
    );
}

export default Content;
