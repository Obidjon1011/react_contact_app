import './App.css';
import Dash from './components/Dashboard';
import { lazy, Suspense, useState } from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactsData from './services/ContactsData';
const Login = lazy(() => import('./components/Login'));
const Favourites = lazy(() => import('./pages/Favourites'));
const Family = lazy(() => import('./pages/Family'));
const Friends = lazy(() => import('./pages/Friends'));
const All = lazy(() => import('./pages/All'));

function App() {
  const [ searchText, setSearchText ] = useState('');
  const [isAuth, setIsAuth] = useState(window.localStorage.getItem('email'))
  return (
    <div>
      <Container fluid className='m-0 p-0'>
        <Suspense fallback={<> <h1 className='text-center pt-5'>404 Not Found</h1> </>}>
          {
            isAuth ?
            <Router>
                <Dash contactsData={ContactsData} setSearchText={setSearchText} setIsAuth={setIsAuth} /> 
              <Switch>
                    <Route path='/' exact render={() => <All contactsData={ContactsData} searchText={searchText} />} />:
                    <Route path='/favourites' exact render={() => <Favourites contactsData={ContactsData} />} />
                    <Route path='/friends' exact render={() => <Friends contactsData={ContactsData} />} />
                    <Route path='/family' exact render={() => <Family contactsData={ContactsData} />} />
              </Switch>
            </Router> :
            <Router>
              <Route path='/' exact render={() => <Login setIsAuth={setIsAuth} />} />
            </Router>
            
          }
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
