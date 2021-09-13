import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import LoginFormModal from './components/auth/LoginFormModal';
import Posts from './components/Posts'
import Post from './components/Post'
import Profile from './components/Profile'
import Home from './components/Home'
import { getPosts } from './store/posts'
import { getUsers } from './store/users'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session?.user)
  const authenticated = sessionUser !== null

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
    dispatch(getPosts())
    dispatch(getUsers())
  }, [dispatch]);


  const postsSlice = useSelector(state => state.posts)
  const usersSlice = useSelector(state => state.users)

  const posts = Object.values(postsSlice)
  const users = Object.values(usersSlice)

  if (!loaded) {
    return null;
  }




  return (
    <BrowserRouter>
      <NavBar sessionUser={sessionUser} authenticated={authenticated} />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/users/:id' exact={true}>
          <Profile users={users} posts={posts} />
        </Route>
        <Route path='/posts' exact={true}>
          <Posts posts={posts} />
        </Route>
        <Route path='/posts/:id' exact={true}>
          <Post posts={posts} />
        </Route>
        <Route path='/' exact={true} >
          <Home sessionUser={sessionUser} authenticated={authenticated} />
        </Route>
        <Route>
          404 Not Found
        </Route>
      </Switch>
      <LoginFormModal></LoginFormModal>
    </BrowserRouter>
  );
}

export default App;
