import { Component } from "react";
import "./multiselect.css";
import PropTypes from 'prop-types'
import CheckboxIcon from '../../../assets/images/checkbox.svg';

/**
 * MultiSelect Component
 * @augments {Component<Props, State>}
 */
class MultiSelect extends Component {
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
            value: [],
            allValueChecked: false
        };

        this.onValueChanged = this.onValueChanged.bind(this)
        this.onSearchValueChanged = this.onSearchValueChanged.bind(this)
    }

    /* Update props when changed from parent */
    componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items) {
            this.setState({ items: this.props.items });
        }
    }

    /* On Search Value Changed */
    onSearchValueChanged(event) {
        this.setState({ searchValue: event.target.value })
    }

    /* On Value Changed, will send value to parent on trigger */
    onValueChanged(event, item, index) {
        var allValue = false
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
        if (this.state.value.includes('All')) {
            allValue = true
        }
        var temp = this.state.items
        if (index > -1) {
            temp[index].isChecked = event.target.checked;
        }

        this.setState({ items: temp, allValueChecked: allValue })

        this.props.valueChanged(this.state.value)
    }

    render() {
        return (
            <div className="multiselect-container">
                <div className="multiselect-header-content">
                    {this.state.title}
                </div>
                <div className="multiselect-content">
                    <input className="multiselect-search-input" type="text" placeholder={this.state.title} onChange={this.onSearchValueChanged} />
                    <div className="multiselect-content-items-container">
                        <div>
                            <label className="multiselect-content-item-label">
                                <input
                                    type="checkbox"
                                    onChange={(e) => this.onValueChanged(e, 'All', -1)}
                                    name=""
                                    value={'All'}
                                    style={{ display: 'none' }}
                                />
                                {
                                    this.state.allValueChecked ? (
                                        <div className="multiselect-checkbox-background multiselect-checkbox-background-checked ">
                                            <img src={CheckboxIcon} />
                                        </div>
                                    ) : (<div className="multiselect-checkbox-background"></div>)
                                }
                                <div className="multiselect-content-item-label-content">
                                    All
                                </div>
                            </label>
                        </div>
                        {
                            this.state.items
                                .filter(f => f[this.state.displayExpr].toLowerCase().includes(this.state.searchValue.toLowerCase()))
                                .map((item, index) => (

                                    <div key={index}>
                                        <label className="multiselect-content-item-label">
                                            <input
                                                type="checkbox"
                                                onChange={(e) => this.onValueChanged(e, item, index)}
                                                name=""
                                                value={item[this.state.keyExpr]}
                                                style={{ display: 'none' }}
                                            />
                                            {
                                                item.isChecked ? (
                                                    <div className="multiselect-checkbox-background multiselect-checkbox-background-checked ">
                                                        <img src={CheckboxIcon} />
                                                    </div>
                                                ) : (<div className="multiselect-checkbox-background"></div>)
                                            }
                                            <div className="multiselect-content-item-label-content">
                                                {item[this.state.displayExpr]}
                                                <div className="multiselect-content-item-label-count ">({!!item.count ? (item.count) : (0)})</div>
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

export default MultiSelect;
