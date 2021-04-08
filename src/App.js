import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './pages/Landing/Landing';
import Home from './pages/home/home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Route path="/">
        <NavBar />
      </Route>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/home" exact>
        <Home />
      </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
