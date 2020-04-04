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
