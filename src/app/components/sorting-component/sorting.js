import React from "react";
import "./sorting.css";

class Sorting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null
        };
        this.onRadioValueChange = this.onRadioValueChange.bind(this);
    }

    onRadioValueChange(event) {
        this.setState({
            selectedOption: event.target.value
        });
        this.props.onSortingRadioValueChange(event.target.value)
    }

    render() {
        return (
            <div className="Sorting-Container">
                <div className='Form-Label Form-Label-Color'>
                    Sorting
                </div>
                <div className='radio-Container'>


                    <label className="radio-label">
                        <input
                            type="radio"
                            onChange={(e) => this.onRadioValueChange(e)}
                            value={'priceAsc'}
                            checked={this.state.selectedOption === "priceAsc"}
                            style={{ display: 'none' }}
                        />
                        {
                            this.state.selectedOption === "priceAsc" ? (
                                <div className="radio radio-checked" >
                                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 1L3.5 6L1 3.72727" stroke="#1EA4CE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </div>
                            ) : (
                                <div className="radio"></div>
                            )
                        }
                        <div className="radio-label-content">
                            Price low to high
                        </div>
                    </label>

                    <label className="radio-label">
                        <input
                            type="radio"
                            onChange={(e) => this.onRadioValueChange(e)}
                            value={'priceDesc'}
                            checked={this.state.selectedOption === "priceDesc"}
                            style={{ display: 'none' }}
                        />
                        {
                            this.state.selectedOption === "priceDesc" ? (
                                <div className="radio radio-checked">
                                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 1L3.5 6L1 3.72727" stroke="#1EA4CE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </div>
                            ) : (
                                <div className="radio"></div>
                            )
                        }
                        <div className="radio-label-content">
                            Price high to low
                        </div>
                    </label>

                    <label className="radio-label">
                        <input
                            type="radio"
                            onChange={(e) => this.onRadioValueChange(e)}
                            value={'addedDesc'}
                            checked={this.state.selectedOption === "addedDesc"}
                            style={{ display: 'none' }}
                        />
                        {
                            this.state.selectedOption === "addedDesc" ? (
                                <div className="radio radio-checked">
                                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 1L3.5 6L1 3.72727" stroke="#1EA4CE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </div>
                            ) : (
                                <div className="radio"></div>
                            )
                        }
                        <div className="radio-label-content">
                            New to old
                        </div>
                    </label>

                    <label className="radio-label">
                        <input
                            type="radio"
                            onChange={(e) => this.onRadioValueChange(e)}
                            value={'addedAsc'}
                            checked={this.state.selectedOption === "addedAsc"}
                            style={{ display: 'none' }}
                        />
                        {
                            this.state.selectedOption === "addedAsc" ? (
                                <div className="radio radio-checked">
                                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 1L3.5 6L1 3.72727" stroke="#1EA4CE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </div>
                            ) : (
                                <div className="radio"></div>
                            )

                        }
                        <div className="radio-label-content">
                            Old to new
                        </div>
                    </label>

                </div>

            </div>
        );
    }
}

export default Sorting;
/*
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
*/