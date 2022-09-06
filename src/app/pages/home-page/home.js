import React from "react";

import Header from '../../components/header-component/header'
import Footer from '../../components/footer-component/footer'
import MarketComponent from "../../components/market-component/market";

class HomePage extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <MarketComponent />
                <Footer />
            </div>
        );
    }
}

export default HomePage;
