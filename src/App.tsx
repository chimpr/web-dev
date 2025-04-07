import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainIsland from './MainIsland';
import LandingRouter from './pages/LandingRouter';
import { useState } from 'react';
import User from './models/User';
import StudentProfileContainer from './pages/student/StudentProfileContainer';

function App() {

  const MainIslandLoad = () => <MainIsland loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
  const LandingLoad    = () => <LandingRouter loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  return (
    <Router>
      <Routes>
          <Route path="/" Component={MainIslandLoad}/>
          <Route path="/home" element={<LandingRouter loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
