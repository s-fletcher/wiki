/**
 * Helper function for NavBar which renders the logo or menu
 */

import Menu from "./Menu";
import Logo from "./Logo";

function LeftParent({ data, menuOpen }) {
    if (menuOpen || typeof menuOpen === "undefined") {
        return <Logo />;
    } else {
        return <Menu data={data} />;
    }
}

export default LeftParent;
