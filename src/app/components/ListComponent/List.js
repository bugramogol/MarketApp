import React from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "../ProductCardComponent/ProductCard";
import "./List.css";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            items: [],
            isLoaded: false,
            currentPage: 1,
            currentPageSize: 16,
            totalPageCount: 0,
        };

        this.handlePageClick = this.handlePageClick.bind(this);
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
                        totalPageCount: (Math.ceil(count / 16) + 1 )
                    }, () => { });
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

        this.getProductList();
        this.getProductCounts();

    }

    handlePageClick($event) {
        debugger;
        var page = $event.selected
        this.setState({
            currentPage : page,
            //isLoaded: false
        }, () => { 
            this.getProductList()
        })
    }

    render() {
        return (
            <div className="Main-Container">
                <div className="List-Container">
                    {
                        !!this.state.isLoaded ? (
                            this.state.items.map((item, index) => (

                                <ProductCard product={item} />

                            ))
                        ) : (
                            <div>Loading</div>
                        )

                    }

                </div>

                <ReactPaginate
                    className='paginator'
                    breakLabel='...'
                    nextLabel='Next >'
                    onPageChange={this.handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={this.state.totalPageCount}
                    previousLabel='< Prev'
                    renderOnZeroPageCount={null}
                />
            </div>
        );
    }
}

export default List;
