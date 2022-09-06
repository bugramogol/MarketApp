import React from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "../productcard-component/productcard";
import "./list.css";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            currentPage: 1,
            currentPageSize: 16,
            totalPageCount: 0,
        };

        this.onPageChangeEvent = this.onPageChangeEvent.bind(this);
    }

    onPageChangeEvent($event) {

        this.setState({ currentPage: $event.selected + 1 })

        this.props.onPageChangeEvent(($event.selected + 1))
    }

    render() {
        return (
            <div className="Main-Container-2">
                <div className="List-Container">
                    {
                        !!this.props.isLoaded ? (
                            this.props.items.map((item, index) => (
                                <ProductCard product={item} key={item.description} />
                            ))
                        ) : (null)
                    }
                </div>
                {
                    !!this.props.isLoaded ? (
                        <div className='paginator-container'>
                            <ReactPaginate
                                className='paginator'
                                breakLabel='...'
                                nextLabel='Next >'
                                onPageChange={this.onPageChangeEvent}
                                pageRangeDisplayed={3}
                                pageCount={this.props.pageCount}
                                previousLabel='< Prev'
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    ) : (null)

                }
                {
                    this.props.isLoaded === false ? (
                        <div className="spinner-container">
                            <div className="loading-spinner">
                            </div>
                        </div>
                    ) : (null)
                }
            </div>
        );
    }
}

export default List;
