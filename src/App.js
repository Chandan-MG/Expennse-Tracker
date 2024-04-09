// import logo from './logo.svg';
import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import './App.css';
import AuthForm from './Components/Auth/AuthForm';
import Layout from './Components/Layout/Layout';
import ExpenceTracker from './Components/ExpenceTracker/ExpenceTracker';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';

function App() {
  return (
    // <div style={{marginTop: '15%'}}>
    //   <AuthForm />
    // </div>
    <Layout>
      <Switch>
        <Route path='/' exact>
          <AuthForm />
        </Route>
        <Route path='/expenceTracker'>
          <ExpenceTracker />
        </Route>
        <Route path='/updateProfile'>
          <UpdateProfile />
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
