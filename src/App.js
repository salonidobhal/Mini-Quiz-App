
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home' 
import Quiz from './components/Quiz';

function App() {
  return (
    <Switch>
      <Route exact path = "/" component = {Home}/>
      <Route path = "/quiz" component = {Quiz}/>
    </Switch>
      
  );
}

export default App;
