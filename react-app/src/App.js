import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Nav/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Posts from './components/Posts'
import Post from './components/Post'
import Profile from './components/Profile'
import Home from './components/Home'
import PageNotFound from './components/404'
import Comment from './components/Comments'
import { getPosts } from './store/posts'
import { getUsers } from './store/users'
import { getParties } from './store/parties'
import { getRoles } from './store/roles'
import { getAllJobs } from './store/job'
import { getComments } from './store/comments'
import { getActivities } from './store/activities'
import { getActivityTypes } from './store/activity_types.js'

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
    dispatch(getParties())
    dispatch(getRoles())
    dispatch(getAllJobs())
    dispatch(getComments())
    dispatch(getActivities())
    dispatch(getActivityTypes())
  }, [dispatch]);


  const postsSlice = useSelector(state => state.posts)
  const usersSlice = useSelector(state => state.users)
  const partiesSlice = useSelector(state => state.parties)
  const commentsSlice = useSelector(state => state.comments)

  const posts = Object.values(postsSlice)
  const users = Object.values(usersSlice)
  const parties = Object.values(partiesSlice)
  const comments = Object.values(commentsSlice)

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
          <Profile users={users} posts={posts} parties={parties} />
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
        <Route path='/comments' exact={true} >
          <Comment comments={comments} />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
