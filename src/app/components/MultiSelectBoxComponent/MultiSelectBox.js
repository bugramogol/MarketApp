import { Component } from "react";
import "./MultiSelectBox.css";
import PropTypes from 'prop-types'

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
            data: [],
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    render() {
        return (
            <div className="MultiSelectContainer">
                <div className="MultiSelectHeader">
                    {this.state.title}
                </div>
                <div className="MultiSelectContent">
                    <input className="SearchInput" placeholder={this.state.title}/>
                    <div className="list">
                        Title
                        <br/>
                        TitleT
                        <br/>
                        Title
                        <br/>
                        TitleT
                        <br/>Title
                        <br/>
                        TitleT
                        <br/>Title
                        <br/>
                        TitleT
                        <br/>Title
                        <br/>
                        TitleT
                        <br/>

                    </div>              
                </div>

            </div>

        );
    }
}

export default MultiSelectBox;
