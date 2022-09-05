import React from "react";
import "./Sorting.css";

class Sorting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
        };
        this.onSortingRadioValueChange = this.onSortingRadioValueChange.bind(this);
    }

    onSortingRadioValueChange(event) {
        this.setState({
            selectedOption: event.target.value,
        });
        this.props.onSortingRadioValueChange(event.target.value)
    }

    render() {
        return (
            <div className="Sorting-Container">
                <div className='Form-Label Form-Label-Color'>
                    Sorting
                </div>
                <form className='Form'>

                    <div className="radio">
                        <label className="Radio-Label Radio-Label-Color">
                            <input
                                type="radio"
                                value="priceAsc"
                                checked={this.state.selectedOption === "priceAsc"}
                                onChange={this.onSortingRadioValueChange}
                            />
                            Price low to high
                        </label>
                    </div>
                    <div className="radio">
                        <label className="Radio-Label Radio-Label-Color">
                            <input
                                type="radio"
                                value="priceDesc"
                                checked={this.state.selectedOption === "priceDesc"}
                                onChange={this.onSortingRadioValueChange}
                            />
                            Price high to low
                        </label>
                    </div>
                    <div className="radio">
                        <label className="Radio-Label Radio-Label-Color">
                            <input
                                type="radio"
                                value="addedDesc"
                                checked={this.state.selectedOption === "addedDesc"}
                                onChange={this.onSortingRadioValueChange}
                            />
                            New to old
                        </label>
                    </div>
                    <div className="radio">
                        <label className="Radio-Label Radio-Label-Color">
                            <input
                                type="radio"
                                value="addedAsc"
                                checked={this.state.selectedOption === "addedAsc"}
                                onChange={this.onSortingRadioValueChange}
                            />
                            Old to new
                        </label>
                    </div>

                </form>

            </div>
        );
    }
}

export default Sorting;
