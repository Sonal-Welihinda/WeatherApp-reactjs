import logo from './logo.svg';
import './App.css';

import {AddCity, Logo} from './components'

import {WeatherList, Footer} from './containers'

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Logo />
        <AddCity />
      </div>

      <WeatherList />
      <Footer />
      
    </div>
  );
}

export default App;
