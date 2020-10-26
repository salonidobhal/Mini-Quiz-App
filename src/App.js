
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home' 
import Quiz from './components/Quiz';
import ScorePage from './components/ScorePage';


function App() {
  return (
    <Switch>
      <Route exact path = "/" component = {Home}/>
      <Route path = "/quiz" component = {Quiz}/>
      <Route path = "/score" component = {ScorePage}/>
    </Switch>
      
  );
}

export default App;
