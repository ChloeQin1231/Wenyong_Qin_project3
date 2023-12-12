import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login';
import { useStore } from 'react-redux';
import axios from 'axios';
import { actions } from './store/slices/user.js';
import Profile from './pages/Profile.jsx';
import EditProfile from './pages/EditProfile.jsx';

function App () {
  const [loaded, setLoaded] = useState(false);
  const store = useStore();
  useEffect(() => {
    axios.get('/api/auth/')
      .then(res => {
        store.dispatch(actions.login(res.data.data));
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [store]);

  if (!loaded) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path={'/signup'} element={<Signup/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/profile/edit'} element={<EditProfile/>}/>
        <Route path={'/profile/:id'} element={<Profile/>}/>
      </Route>
    </Routes>
  );
}

export default App;
