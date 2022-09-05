import { Component } from "react";
import "./MultiSelectBox.css";
import PropTypes from 'prop-types'
import CheckboxIcon from '../../../assets/images/checkbox.svg';
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
        keyExpr: PropTypes.string.isRequired
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

    valueChanged(event) {
        var value = event.target.value
        var isChecked = event.target.checked

        if (isChecked) {
            if (!this.state.value.includes(value)) this.state.value.push(value)
        } else {
            var findIndex = this.state.value.findIndex(f => f == value)
            if (findIndex > -1) {
                this.state.value.splice(findIndex, 1);
            }
        }

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
                        <div>
                            <input type='checkbox' value="All" onChange={this.valueChanged} /> All
                        </div>
                        {
                            this.state.items
                                .filter(f => f[this.state.displayExpr].toLowerCase().includes(this.state.searchValue.toLowerCase()))
                                .map((item, index) => (

                                    <div key={item[this.state.keyExpr]}>
                                        <input type='checkbox' value={item[this.state.keyExpr]} onChange={this.valueChanged} />
                                        {item[this.state.displayExpr]} ({!!item.count ? (item.count) : (0)})
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
