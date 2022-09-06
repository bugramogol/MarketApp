import React from "react";
import "./market.css";
import Sorting from "../../components/sorting-component/sorting";
import List from "../../components/list-component/list";
import MultiSelect from "../../components/multiselect-component/multiselect";
import Basket from "../../components/basket-component/basket";
import { getItems, getItemsByPage } from "../../services/api-service";
import { connect } from "react-redux";

class MarketComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsData: [],
      tagsDataLoaded: false,
      brandsData: [],
      brandsDataLoaded: false,
      productData: [],
      productDataLoaded: false,
      orderByQuery: '',
      brandQuery: '',
      tagQuery: '',
      currentPage: 1,
      currentPageSize: 16,
      pageCount: 0,
      selectedItemType: 'mug',  // Default value is mug for product's item type
      itemTypeQuery: '&itemType_like=mug' // Default query value is mug for product's item type
    };

    this.onSortingRadioValueChange = this.onSortingRadioValueChange.bind(this)
    this.onPageChangeEvent = this.onPageChangeEvent.bind(this)
    this.onTagChangeEvent = this.onTagChangeEvent.bind(this)
    this.onBrandChangeEvent = this.onBrandChangeEvent.bind(this)
    this.onItemTypeSelect = this.onItemTypeSelect.bind(this)
  }

  componentDidMount() {
    this.getBrandAndTagLists()
    this.getProductListFilter()
  }
  /* Get Brand and Tags from db and calculate counts */
  /* Db not provide count data. It is not correct way to do it on web. But it works :) */
  getBrandAndTagLists() {
    getItems()
      .then(
        (response) => {
          var tags = []
          var brands = []
          response.forEach(res => {
            if (res.itemType == this.state.selectedItemType) {
              res.tags.forEach(el => {
                var findedTag = tags.find(f => f.tag.toLowerCase() === el.toLowerCase())
                if (typeof findedTag == "undefined") {
                  tags.push({ tag: el, count: 1, isChecked: false })
                }
                else {
                  findedTag.count++;
                }
              })
            }

            var findedBrand = brands.find(f => f.manufacturer.toLowerCase() === res.manufacturer.toLowerCase() && res.itemType == this.state.selectedItemType)
            if (typeof findedBrand == "undefined") {
              brands.push({ manufacturer: res.manufacturer, count: 1, isChecked: false })
            }
            else {
              findedBrand.count++;
            }
          })
          this.setState({
            tagsDataLoaded: true,
            tagsData: tags,
            brandsDataLoaded: true,
            brandsData: brands,
            orderByQuery: '',
            brandQuery: '',
            tagQuery: '',
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

  /* On Sort Selection Change Event */
  onSortingRadioValueChange(value) {
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
    this.setState({ orderByQuery: query })
    this.getProductListFilter(true)
  }

  /* On Page Selection Change Event */
  onPageChangeEvent(page) {
    this.setState({ currentPage: page }, () => {
      this.getProductListFilter()
    })
  }

  /* On Brand Selection Change Event */
  onBrandChangeEvent(value) {
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

  /* On Tag Selection Change Event */
  onTagChangeEvent(value) {
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

  /* On Item Type Selection Change Event */
  onItemTypeSelect(event) {
    this.setState({ selectedItemType: event, itemTypeQuery: '&q=' + event })
    this.getBrandAndTagLists()
    this.getProductListFilter(true)
  }

  /* Gets Data By Count */
  /* DB not provide totalPage data we have to get it, getItems return all data with query and calculate totalPage to show on paginator*/
  getProductsData() {
    getItemsByPage(this.state.currentPage, this.state.currentPageSize, this.state.orderByQuery, this.state.itemTypeQuery, this.state.brandQuery, this.state.tagQuery)
      .then((result) => {
        this.setState({
          productDataLoaded: true,
          productData: result
        });
      },
        (error) => {
          this.setState({
            productDataLoaded: true,
            error
          });
        })

    getItems(this.state.orderByQuery, this.state.itemTypeQuery, this.state.brandQuery, this.state.tagQuery)
      .then(
        (result) => {
          
          var page = 0
          if ((result.length / this.state.currentPageSize) < 1) {
            page = 1
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

  /* On Filter change call this method to refresh Data and send True value*/
  /* On Paging it will not refresh */
  getProductListFilter(refresh = false) {
    if (refresh) {
      this.setState({ productDataLoaded: false, currentPage: 1 }, () => {
        this.getProductsData()
      })
    } else {
      this.getProductsData()
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="layout-container">
          <div className="layout-left">

            <div className="layout-left-content">
              <Sorting
                onSortingRadioValueChange={this.onSortingRadioValueChange}
              />
            </div>

            <div className="layout-left-content">
              <MultiSelect
                title={"Brands"}
                items={this.state.brandsData}
                keyExpr={"manufacturer"}
                displayExpr={"manufacturer"}
                valueChanged={this.onBrandChangeEvent}
              />
            </div>

            <div className="layout-left-content">
              <MultiSelect
                title={"Tags"}
                items={this.state.tagsData}
                keyExpr={"tag"}
                displayExpr={"tag"}
                valueChanged={this.onTagChangeEvent}
              />
            </div>

          </div>
          <div className="layout-center">
            <div className="flex-column layout-center-container">
              <div className="header">
                Products
              </div>
              <div className="flex-row chip-container">
                <div className={this.state.selectedItemType === 'mug' ? ('chips chips-active') : ('chips')}
                  onClick={() => { this.onItemTypeSelect('mug') }}
                >
                  Mug
                </div>
                <div className={this.state.selectedItemType === 'shirt' ? ('chips chips-active') : ('chips')}
                  onClick={() => { this.onItemTypeSelect('shirt') }}
                >
                  Shirt
                </div>
              </div>


              <List items={this.state.productData} isLoaded={this.state.productDataLoaded} onPageChangeEvent={this.onPageChangeEvent} pageCount={this.state.pageCount} currentPage={this.state.currentPage} />
            </div>
          </div>
          <div className="layout-right">
            <Basket items={!!this.props.basket ? (this.props.basket) : ([])} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    price: state.price,
    basket: [...state.basket]
  };
}
const mapDispatchToProps = dispatch => ({
  onPushToBasket: value => dispatch({ type: 'ADDPRODUCTTOBASKET', value: value }),
  onDeleteFromBasket: value => dispatch({ type: 'DELETEPRODUCTFROMBASKET', value: value }),
  onChangeCountByIndexForBasket: value => dispatch({ type: 'UPDATECOUNTOFPRODUCTSBYINDEX', value: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketComponent);
