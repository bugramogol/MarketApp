import { Component } from "react";
import "./MultiSelectBox.css";
import PropTypes from 'prop-types'
//import CheckboxIcon from '../../../assets/images/checkbox.svg';
/**
 * MultiSelectBox Component
 * @augments {Component<Props, State>}
 */
class MultiSelectBox extends Component {
    static propTypes = {
        /** Title of Component*/
        title: PropTypes.string,
        /** Array to list*/
        items: PropTypes.array.isRequired,
        /** which key should display data.*/
        displayExpr: PropTypes.string,
        /** which field should be key to value*/
        keyExpr: PropTypes.string.isRequired,

    }

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            items: this.props.items,
            displayExpr: this.props.displayExpr,
            keyExpr: this.props.keyExpr,
            searchValue: '',
            value: []
        };

        this.valueChanged = this.valueChanged.bind(this)
        this.searchValueChanged = this.searchValueChanged.bind(this)
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items) {
            this.setState({ items: this.props.items });
        }
    }

    valueChanged(event, item, index) {

        console.log(item)
        var value = event.target.value
        var isChecked = event.target.checked

        if (isChecked) {
            if (!this.state.value.includes(value)) this.state.value.push(value)
        } else {
            var findIndex = this.state.value.findIndex(f => f === value)
            if (findIndex > -1) {
                this.state.value.splice(findIndex, 1);
            }
        }

        var temp = this.state.items
        temp[index].isChecked = event.target.checked;
        this.setState({ items: temp })

        this.props.valueChanged(this.state.value)
    }

    searchValueChanged(event) {
        this.setState({ searchValue: event.target.value })
    }

    render() {
        return (
            <div className="MultiSelectContainer">
                <div className="MultiSelectHeader">
                    {this.state.title}
                </div>
                <div className="MultiSelectContent">
                    <input type="text" className="SearchInput" placeholder={this.state.title} onChange={this.searchValueChanged} />

                    <div className="list">
                        {/*
                        <div>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    onChange={this.onChange}
                                    isChecked={this.state.isChecked}
                                    name=""
                                    value=""
                                    style={{ display: 'none' }}
                                />

                                {
                                    this.state.isChecked ? (
                                        <div className="checkbox-background checked">
                                            <svg className="checked" width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.6667 1L4.33333 8.33333L1 5" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="checkbox-background"></div>)
                                }
                                All
                            </label>
                        </div>
                        */}

                        {
                            this.state.items
                                .filter(f => f[this.state.displayExpr].toLowerCase().includes(this.state.searchValue.toLowerCase()))
                                .map((item, index) => (
                                    <div key={item[this.state.keyExpr]}>
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                onChange={(e) => this.valueChanged(e, item, index)}
                                                name=""
                                                value={item[this.state.keyExpr]}
                                                style={{ display: 'none' }}
                                            />

                                            {
                                                item.isChecked ? (
                                                    <div className="checkbox-background checked">
                                                        <svg className="checked" width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11.6667 1L4.33333 8.33333L1 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                ) : (
                                                    <div className="checkbox-background"></div>)
                                            }
                                            <div className="checkbox-label-content">
                                                {item[this.state.displayExpr]} <div className="checkbox-count">({!!item.count ? (item.count) : (0)})</div>
                                            </div>
                                        </label>
                                    </div>
                                ))

                        }

                    </div>
                </div>

            </div>

        );
    }
}

export default MultiSelectBox;
