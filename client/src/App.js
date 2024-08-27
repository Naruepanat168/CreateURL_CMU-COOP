import CustomNavbar from '../src/components/layouts/Navbar';
import { Switch, Route } from 'react-router-dom';
import RegistrationForm from './components/pages/auth/register';
import Login from './components/pages/auth/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { currentUser } from './components/functions/auth';
import UserRoute from './components/routes/userRoute';
import AdminRoute from './components/routes/AdminRoute';
import adminDashboard from './components/pages/1admin/adminDashboard'
import AdminCreatePerson from './components/pages/1admin/adminCreatePerson';
import AllProduct from './components/pages/1admin/all_Product';
import userDashboard from './components/pages/2user/userDashboard'
import home from './components/pages/home';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const idTokenResult = localStorage.token;
    if (idTokenResult) {
      currentUser(idTokenResult).then(res => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            name: res.data.name,
            token: idTokenResult,
            role: res.data.role,
            id: res.data._id
          }
        })
      }).catch(err => {
        dispatch({
          type: 'LOGOUT',
          payload: null
        });
        console.log(err);
      })
    }
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <CustomNavbar />
      <Switch>

        <Route exact path="/" component={home} />
        <Route exact path="/login" component={Login} />
        <AdminRoute exact path="/register" component={RegistrationForm} />
        <AdminRoute exact path="/admin/dashboard" component={adminDashboard} />
        <AdminRoute exact path="/admin/create-person" component={AdminCreatePerson} />
        <AdminRoute exact path="/admin/allProduct-person" component={AllProduct} />
        <UserRoute exact path="/user/dashboard" component={userDashboard} />

      </Switch>
    </div>
  );
}

export default App;
