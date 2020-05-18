/**
 * Child component for DropDown to display options of settings.
 * 
 * TODO:
 *  - Add functionality to toggle dark mode
 *  - Add functionality to sign the user out
 * 
 * @param setModal Set's the modal to render in viewport
 */

function Settings({ setModal }) {
    return (
        <div className="cancelClose">
            <p onClick={() => setModal("exportData")} className="dropItem">
                Export Data
            </p>
            <p className="dropItem cancelClose">Toggle Dark Mode</p>
            <div className="divider cancelClose" />
            <p className="dropItem">Sign Out</p>
        </div>
    );
}

export default Settings;
