/**
 * Child component for DropDown to display options to filter categories.
 * 
 * TODO:
 *  - Map through categories and display their name for each option instead of
 *    having the placeholder of filter1, filter2, etc.
 *  - Add functionality to filter categories
 *  - Add functionality to clear filters
 */

function Filter() {
    return (
        <div className="cancelClose">
            <p className="dropItem cancelClose">filter1</p>
            <p className="dropItem cancelClose">filter2</p>
            <p className="dropItem cancelClose">filter3</p>
            <p className="dropItem cancelClose">filter4</p>
            <p className="dropItem cancelClose">filter5</p>
            <div className="divider cancelClose" />
            <p className="dropItem cancelClose">Clear Filters</p>
        </div>
    );
}

export default Filter;
