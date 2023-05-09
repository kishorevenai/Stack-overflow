import './App.css';
import Navbar from './components/NavBar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom'
import AllRoutes from './AllRoutes';

function App() {
  return (
    <div className="App">
      <Router>         
         <AllRoutes/>     
      </Router>      
    </div>
  );
}

export default App;
