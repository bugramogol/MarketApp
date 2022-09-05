import React from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "../ProductCardComponent/ProductCard";
import "./List.css";

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

    getProductList() {
        fetch("http://localhost:3001/items?_page=" + this.state.currentPage + "&_limit=" + this.state.currentPageSize)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    }, () => { console.log(result) });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    getProductCounts() {
        fetch("http://localhost:3001/items")
            .then(res => res.json())
            .then(
                (result) => {
                    var count = result.length
                    this.setState({
                        totalPageCount: (Math.ceil(count / this.state.currentPageSize) + 1)
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.getProductCounts();
    }

    onPageChangeEvent($event) {
        var page = $event.selected
        this.setState({ currentPage: page })

        this.props.onPageChangeEvent(page)
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
                        ) : (
                            <div>Loading</div>
                        )

                    }

                </div>

                {
                    !!this.props.isLoaded ? (
                        <div className='paginator-container'>
                            <ReactPaginate
                                className='paginator'
                                breakLabel='...'
                                nextLabel='Next   >'
                                onPageChange={this.onPageChangeEvent}
                                pageRangeDisplayed={3}
                                pageCount={this.props.pageCount}
                                previousLabel='<   Prev'
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    ) : (
                        <div>Loading</div>
                    )

                }


            </div>
        );
    }
}

export default List;
