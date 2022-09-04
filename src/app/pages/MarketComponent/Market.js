import React from "react";
import "./Market.css";
import Sorting from "../../components/SortingComponent/Sorting.js";
import List from "../../components/ListComponent/List";
import MultiSelectBox from "../../components/MultiSelectBoxComponent/MultiSelectBox";

class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandsData: [],
      brandsDataLoaded: false
    };
  }

  getProductList() {
    fetch("http://localhost:3000/companies")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            brandsDataLoaded: true,
            brandsData: result
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

  render() {
    return (
      <div>
        <div className="Main-Container">
          <div className="Layout-Container">
            <div className="Layout-Left">
              <Sorting />
            </div>
            <div className="Layout-Center"><List /></div>
            <div className="Layout-Right">
              <MultiSelectBox
                title={"test"}
                items={this.state.brandsData}
                keyExpr={""}
                displayExpr={""}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Market;
