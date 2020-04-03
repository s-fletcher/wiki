function Add({ setModal }) {
    return (
        <div className="cancelClose">
            <p onClick={() => setModal("addPage")} className="dropItem">
                Add Page
            </p>
            <div className="divider cancelClose" />
            <p className="dropItem">Add Category</p>
        </div>
    );
}

export default Add;
