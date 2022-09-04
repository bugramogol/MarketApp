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
        console.log(event);
        this.setState({
            selectedOption: event.target.value,
        });
    }

    render() {
        return (
            <div className="Sorting-Container">
                <div className='Form-Label Form-Label-Color'>
                    Header
                </div>
                <form className='Form'>
                    
                    <div className="radio">
                        <label className="Radio-Label Radio-Label-Color">
                            <input
                                type="radio"
                                value="Male"
                                checked={this.state.selectedOption === "Male"}
                                onChange={this.onSortingRadioValueChange}
                            />
                            Price low to high
                        </label>
                    </div>
                    <div className="radio">
                        <label className="Radio-Label Radio-Label-Color">
                            <input
                                type="radio"
                                value="Female"
                                checked={this.state.selectedOption === "Female"}
                                onChange={this.onSortingRadioValueChange}
                            />
                            Price high to low
                        </label>
                    </div>
                    <div className="radio">
                        <label className="Radio-Label Radio-Label-Color">
                            <input
                                type="radio"
                                value="Other"
                                checked={this.state.selectedOption === "Other"}
                                onChange={this.onSortingRadioValueChange}
                            />
                            New to old
                        </label>
                    </div>
                    <div className="radio">
                        <label className="Radio-Label Radio-Label-Color">
                            <input
                                type="radio"
                                value="Other"
                                checked={this.state.selectedOption === "Other"}
                                onChange={this.onSortingRadioValueChange}
                            />
                            Old to new
                        </label>
                    </div>
                    
                </form>
                <div>Selected option is : {this.state.selectedOption}</div>

            </div>
        );
    }
}

export default Sorting;
