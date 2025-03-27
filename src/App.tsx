import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainIsland from './MainIsland';
import LandingRouter from './pages/LandingRouter';

function App() {

  const MainIslandLoad = () => <MainIsland/>
  const LandingLoad    = () => <LandingRouter/>

  return (
    <Router>
      <Routes>
          <Route path="/" Component={MainIslandLoad}/>
          <Route path="/home" Component={LandingLoad}/>
      </Routes>
    </Router>
  );
}

export default App;
