import React from "react";
import "./Market.css";
import Sorting from "../../components/SortingComponent/Sorting.js";
import List from "../../components/ListComponent/List";
import MultiSelectBox from "../../components/MultiSelectBoxComponent/MultiSelectBox";
import Basket from "../../components/BasketComponent/Basket";

class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsData: [],
      tagsDataLoaded: false,
      companiesData: [],
      companiesDataLoaded: false,
      sortingValue: null,
      items: [],
      isLoaded: false,
      orderBy: '',
      currentPage: 1,
      currentPageSize: 16,
      brandQuery: '',
      tagQuery: '',
      pageCount: 0,
      activeType: 'mug',
      activeTypeQuery: '&itemType_like=mug'
    };

    this.onSortingRadioValueChange = this.onSortingRadioValueChange.bind(this)
    this.onPageChangeEvent = this.onPageChangeEvent.bind(this)
    this.onTagChangeEvent = this.onTagChangeEvent.bind(this)
    this.onBrandChangeEvent = this.onBrandChangeEvent.bind(this)
    this.onItemTypeSelect = this.onItemTypeSelect.bind(this)
  }

  componentDidMount() {
    this.getProductList()
    this.getProductListFilter()
    //this.getCompaniesList()
  }

  getProductList() {
    fetch("http://localhost:3001/items")
      .then(res => res.json())
      .then(
        (result) => {
          var tags = []
          var companies = []

          result.forEach(res => {

            res.tags.forEach(el => {
              var a = tags.find(f => f.tag == el)
              if (typeof a == "undefined") {
                tags.push({ tag: el, count: 1 })
              }
              else {
                a.count++;
              }
            })

            var a = companies.find(f => f.manufacturer == res.manufacturer)
            if (typeof a == "undefined") {
              companies.push({ manufacturer: res.manufacturer, count: 1 })
            }
            else {
              a.count++;
            }
          })
          this.setState({
            tagsDataLoaded: true,
            tagsData: tags,
            companiesDataLoaded: true,
            companiesData: companies
          });
        },
        (error) => {
          this.setState({
            tagsDataLoaded: true,
            error
          });
        }
      )
  }



  onSortingRadioValueChange(value) {
    // _sort=price&_order=desc Çoktan aza ücret
    // _sort=price&_order=asc azdan çoka ücret
    // _sort=added&_order=desc Çoktan aza ücret
    // _sort=added&_order=asc azdan çoka ücret
    var query = ""
    if (value == 'priceAsc') {
      query = '&_sort=price&_order=asc'
    } else if (value == 'priceDesc') {
      query = '&_sort=price&_order=desc'
    } else if (value == 'addedAsc') {
      query = '&_sort=added&_order=asc '
    } else if (value == 'addedDesc') {
      query = '&_sort=added&_order=desc'
    }
    this.state.orderBy = query
    this.getProductListFilter(true)
  }

  onPageChangeEvent(page) {
    this.state.currentPage = page
    this.getProductListFilter()
  }

  onBrandChangeEvent(value) {
    console.log(value)
    var query = ''
    if (value.includes('All')) {
      query = ''
    } else {
      value.forEach(el => {
        query += "&manufacturer_like=" + el
      })
    }
    this.state.brandQuery = query
    this.getProductListFilter(true)
  }

  onTagChangeEvent(value) {
    console.log(value)
    var query = ''
    if (value.includes('All')) {
      query = ''
    } else {
      value.forEach(el => {
        query += "&tags_like=" + el
      })
    }
    this.state.tagQuery = query
    this.getProductListFilter(true)
  }

  getProductListFilter(refresh = false) {
    if (refresh) {
      this.setState({ isLoaded: false, currentPage: 1 }, () => {
        var url = "http://localhost:3001/items?_page=" + this.state.currentPage + "&_limit=" + this.state.currentPageSize + this.state.activeTypeQuery + this.state.orderBy + this.state.brandQuery + this.state.tagQuery

        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )

        var url2 = "http://localhost:3001/items?" + this.state.activeTypeQuery + this.state.orderBy + this.state.brandQuery + this.state.tagQuery
        console.log(url2)
        fetch(url2)
          .then(res => res.json())
          .then(
            (result) => {
              var page = 0
              if ((result.length / this.state.currentPageSize) % this.state.currentPageSize > 1) {
                page = (Math.ceil(result.length / this.state.currentPageSize) + 1)
              } else {
                page = (Math.ceil(result.length / this.state.currentPageSize))
              }

              this.setState({
                pageCount: page,
              });
            },
            (error) => {
              this.setState({
                pageCount: 0,
                error
              });
            }
          )
      })
    } else {
      var url = "http://localhost:3001/items?_page=" + this.state.currentPage + "&_limit=" + this.state.currentPageSize + this.state.activeTypeQuery + this.state.orderBy + this.state.brandQuery + this.state.tagQuery

      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )

      var url2 = "http://localhost:3001/items?" + this.state.activeTypeQuery + this.state.orderBy + this.state.brandQuery + this.state.tagQuery
      console.log(url2)
      fetch(url2)
        .then(res => res.json())
        .then(
          (result) => {
            var page = 0
            if ((result.length / this.state.currentPageSize) % this.state.currentPageSize > 1) {
              page = (Math.ceil(result.length / this.state.currentPageSize) + 1)
            } else {
              page = (Math.ceil(result.length / this.state.currentPageSize))
            }

            this.setState({
              pageCount: page,
            });
          },
          (error) => {
            this.setState({
              pageCount: 0,
              error
            });
          }
        )
    }


  }

  onItemTypeSelect(event) {
    this.setState({ activeType: event })

    this.state.activeTypeQuery = '&itemType_like=' + event
    this.getProductListFilter(true)
  }

  render() {
    return (
      <div>
        <div className="Main-Container">
          <div className="Layout-Container">
            <div className="Layout-Left">
              {this.state.sortingValue}
              <div className="Layout-Left-Content">
                <Sorting onSortingRadioValueChange={this.onSortingRadioValueChange} />
              </div>

              <div className="Layout-Left-Content">
                <MultiSelectBox
                  title={"Brands"}
                  items={this.state.companiesData}
                  keyExpr={"manufacturer"}
                  displayExpr={"manufacturer"}
                  valueChanged={this.onBrandChangeEvent}
                />
              </div>

              <div className="Layout-Left-Content">
                <MultiSelectBox
                  title={"Tags"}
                  items={this.state.tagsData}
                  keyExpr={"tag"}
                  displayExpr={"tag"}
                  valueChanged={this.onTagChangeEvent}
                />
              </div>

            </div>
            <div className="Layout-Center">
              <div className="flex-column">
                <div className="header">
                  Products
                </div>
                <div className="flex-row chip-container">
                  <div className={this.state.activeType == 'mug' ? ('chips chips-active') : ('chips')} onClick={() => { this.onItemTypeSelect('mug') }}>
                    Mug
                  </div>
                  <div className={this.state.activeType == 'shirt' ? ('chips chips-active') : ('chips')} onClick={() => { this.onItemTypeSelect('shirt') }}>
                    Shirt
                  </div>
                </div>


                <List items={this.state.items} isLoaded={this.state.isLoaded} onPageChangeEvent={this.onPageChangeEvent} pageCount={this.state.pageCount} currentPage={this.state.currentPage} />
              </div>
            </div>
            <div className="Layout-Right">
              <Basket />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Market;

/*
getCompaniesList() {
    fetch("http://localhost:3001/companies")
      .then(res => res.json())
      .then(
        (result) => {
          var companies = []
          result.forEach(res => {

            var a = companies.find(f => f.name == res.name)
            if (typeof a == "undefined") {
              companies.push({ name: res.name, count: 1 })
            }
            else {
              a.count++;
            }
          })
          this.setState({
            companiesDataLoaded: true,
            companiesData: companies
          });
        },
        (error) => {
          this.setState({
            companiesDataLoaded: true,
            error
          });
        }
      )
  }
*/ 