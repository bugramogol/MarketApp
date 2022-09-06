import React from "react";
import "./sorting.css";
import radioCheck from './../../../assets/images/radio-check.svg'
class Sorting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null
        };

        this.onRadioValueChange = this.onRadioValueChange.bind(this);
    }
    /* On Radio value change, it will send data to parent*/
    onRadioValueChange(event) {
        this.setState({
            selectedOption: event.target.value
        });
        this.props.onSortingRadioValueChange(event.target.value)
    }

    /* Could be managed by items from props its not for the best */
    render() {
        return (
            <div className="sorting-container">
                <div className='form-label form-label-color'>
                    Sorting
                </div>
                <div className='radio-container'>


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
                                    <img src={radioCheck} alt='radio-icon' />

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
                                    <img src={radioCheck} alt='radio-icon' />

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
                                    <img src={radioCheck} alt='radio-icon' />

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
                                    <img src={radioCheck} alt='radio-icon' />

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