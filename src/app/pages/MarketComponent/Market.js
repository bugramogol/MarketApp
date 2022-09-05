import React from "react";
import "./Market.css";
import Sorting from "../../components/SortingComponent/Sorting.js";
import List from "../../components/ListComponent/List";
import MultiSelectBox from "../../components/MultiSelectBoxComponent/MultiSelectBox";
import Basket from "../../components/BasketComponent/Basket";
import { getItems, getItemsByPage } from "../../services/ApiService";

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
    getItems()
      .then(
        (result) => {
          var tags = []
          var companies = []

          result.forEach(res => {

            res.tags.forEach(el => {
              var a = tags.find(f => f.tag.toLowerCase() === el.toLowerCase())
              if (typeof a == "undefined") {
                tags.push({ tag: el, count: 1, isChecked: false })
              }
              else {
                a.count++;
              }
            })

            var b = companies.find(f => f.manufacturer.toLowerCase() === res.manufacturer.toLowerCase())
            if (typeof b == "undefined") {
              companies.push({ manufacturer: res.manufacturer, count: 1, isChecked: false })
            }
            else {
              b.count++;
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
            pageCount: 0,
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
    if (value === 'priceAsc') {
      query = '&_sort=price&_order=asc'
    } else if (value === 'priceDesc') {
      query = '&_sort=price&_order=desc'
    } else if (value === 'addedAsc') {
      query = '&_sort=added&_order=asc '
    } else if (value === 'addedDesc') {
      query = '&_sort=added&_order=desc'
    }
    this.setState({ orderBy: query })
    this.getProductListFilter(true)
  }

  onPageChangeEvent(page) {
    this.setState({ currentPage: page })
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
    this.setState({ brandQuery: query })
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
    this.setState({ tagQuery: query })
    this.getProductListFilter(true)
  }

  getData() {
    getItemsByPage(this.state.currentPage, this.state.currentPageSize, this.state.orderBy, this.state.activeTypeQuery, this.state.brandQuery, this.state.tagQuery)
      .then((result) => {
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
        })

    getItems(this.state.orderBy, this.state.activeTypeQuery, this.state.brandQuery, this.state.tagQuery)
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

  getProductListFilter(refresh = false) {
    if (refresh) {
      this.setState({ isLoaded: false, currentPage: 1 }, () => {
        this.getData()
      })
    } else {
      this.getData()
    }
  }

  onItemTypeSelect(event) {
    this.setState({ activeType: event,activeTypeQuery: '&itemType_like=' + event })
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
              <div className="flex-column layout-center-container">
                <div className="header">
                  Products
                </div>
                <div className="flex-row chip-container">
                  <div className={this.state.activeType === 'mug' ? ('chips chips-active') : ('chips')} onClick={() => { this.onItemTypeSelect('mug') }}>
                    Mug
                  </div>
                  <div className={this.state.activeType === 'shirt' ? ('chips chips-active') : ('chips')} onClick={() => { this.onItemTypeSelect('shirt') }}>
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