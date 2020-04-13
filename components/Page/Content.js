/**
 * Holds the content of the page excluding the tree.
 */

import styled from "styled-components";
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
    h1 {
        font-weight: 900;
        padding-bottom: 3px;
        display: inline-block;
        margin-bottom: 20px;
        border-bottom: 2px solid ${(props) => props.theme.lightGray};
    }
    p {
        margin-bottom: 20px;
    }
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
                    Lorem ipsum dolor sit amet, in tale dolorem conclusionemque vix, et vis minim
                    quaerendum intellegebat. Virtute repudiare repudiandae ei ius. Ea eirmod docendi
                    pertinax eum, an vis cibo habemus patrioque. Aeque accusata facilisis vix te,
                    persius alterum nonumes vis ei, ei sapientem prodesset nec. Vis quod labores
                    expetenda no, an minim oporteat vis.
                </p>
                <p>
                    Ne impetus omnesque moderatius has, te case adipiscing has. Semper sensibus quo
                    in, id officiis gubergren sententiae usu. Vim eu esse causae, ut quo nulla
                    animal. Vidit fabellas inciderint no vis, usu an dico munere doming. At nonumy
                    vivendum expetendis qui, eam no soluta fabellas constituto. Te his perfecto
                    conclusionemque. Pri an noster inermis scripserit, no quas verear blandit has.
                </p>
                <p>
                    Vis deleniti principes in, ne his natum ridens putant. Et tation delenit
                    nominavi eos, vitae adolescens interesset ea duo. Ea dictas audire eum, id quo
                    facer voluptaria. Disputando mediocritatem ea nam, ea quo solet nominavi, eam cu
                    error maluisset. Nam modo ornatus no. Est autem fierent ei, facilis singulis
                    laboramus qui no. Minim explicari sea ei, id impetus omittam sed.
                </p>
                <p>
                    Inani vituperatoribus mei ut, quando adversarium ea vel. In quo tibique
                    moderatius. Mei te partem atomorum salutandi, alterum recusabo dignissim sed eu.
                    Pro senserit urbanitas constituto eu, pericula electram ocurreret ne duo.
                </p>
                <p>
                    Eu pro iudico oporteat evertitur. Te dico interesset sed, usu illum patrioque
                    an. Ei admodum corrumpit repudiandae ius, an mea decore saperet. Mea an justo
                    aperiri eligendi, at senserit gubergren vim. An vim aeterno regione admodum.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, in tale dolorem conclusionemque vix, et vis minim
                    quaerendum intellegebat. Virtute repudiare repudiandae ei ius. Ea eirmod docendi
                    pertinax eum, an vis cibo habemus patrioque. Aeque accusata facilisis vix te,
                    persius alterum nonumes vis ei, ei sapientem prodesset nec. Vis quod labores
                    expetenda no, an minim oporteat vis.
                </p>
                <p>
                    Ne impetus omnesque moderatius has, te case adipiscing has. Semper sensibus quo
                    in, id officiis gubergren sententiae usu. Vim eu esse causae, ut quo nulla
                    animal. Vidit fabellas inciderint no vis, usu an dico munere doming. At nonumy
                    vivendum expetendis qui, eam no soluta fabellas constituto. Te his perfecto
                    conclusionemque. Pri an noster inermis scripserit, no quas verear blandit has.
                </p>
                <p>
                    Vis deleniti principes in, ne his natum ridens putant. Et tation delenit
                    nominavi eos, vitae adolescens interesset ea duo. Ea dictas audire eum, id quo
                    facer voluptaria. Disputando mediocritatem ea nam, ea quo solet nominavi, eam cu
                    error maluisset. Nam modo ornatus no. Est autem fierent ei, facilis singulis
                    laboramus qui no. Minim explicari sea ei, id impetus omittam sed.
                </p>
                <p>
                    Inani vituperatoribus mei ut, quando adversarium ea vel. In quo tibique
                    moderatius. Mei te partem atomorum salutandi, alterum recusabo dignissim sed eu.
                    Pro senserit urbanitas constituto eu, pericula electram ocurreret ne duo.
                </p>
                <p>
                    Eu pro iudico oporteat evertitur. Te dico interesset sed, usu illum patrioque
                    an. Ei admodum corrumpit repudiandae ius, an mea decore saperet. Mea an justo
                    aperiri eligendi, at senserit gubergren vim. An vim aeterno regione admodum.
                </p>
            </StyledContent>
        </div>
    );
}

export default Content;
