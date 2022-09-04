import logo from './logo.svg';
import './App.css';
import Header  from './app/components/HeaderComponent/Header'
import Footer  from './app/components/FooterComponent/Footer'
import Market from './app/pages/MarketComponent/Market';

function App() {
  return (
    <div className="App">
      <Header />
      <Market />
      <Footer />
    </div>
  );
}

export default App;
