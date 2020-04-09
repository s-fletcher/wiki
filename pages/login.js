/** 
 * This is where a user can log into the wiki. They can do so by slack authentication.
 * 
 * Currently only styling is implemented and it's linked to the slack api. This doesn't yet communicate 
 * with our backend and anyone can view the wiki without logging in.
 * 
 * TODO: 
 *  - Communicate with backend and create a user on new login
 *  - Route everything to this page when a valid cookie is not found
 */

import styled from "styled-components";
import NavBar from "../components/NavBar";
import Head from "next/head";

const StyledLogin = styled.div`
    text-align: center;
    .content {
        margin-top: 30vh;
        h1 {
            margin-bottom: 10px;
        }
        img {
            clip-path: inset(5px 5px 5px 5px);
        }
    }
`;

function Login() {
    return (
        <StyledLogin>
            <Head>
                <title>Login • Wiki</title>
            </Head>
            <div className="content">
                <h1>Hacklahoma's team knowledge base</h1>
                <a
                    href={`https://slack.com/oauth/authorize?scope=identity.basic&client_id=${process.env.SLACK_CLIENT_ID}`}
                >
                    <img
                        alt="Sign in with Slack"
                        height="40"
                        width="172"
                        src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
                        srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
                    />
                </a>
            </div>
        </StyledLogin>
    );
}

export default Login;
