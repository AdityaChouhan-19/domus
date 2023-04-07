import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, redirect } from 'react-router-dom'

import NavBar from './components/views/NavBar/NavBar.js'
import Footer from './components/views/Footer/Footer.js'
import HomePage from './components/views/HomePage/HomePage.js'
import LoginPage from './components/views/LoginPage/LoginPage.js'
import RegisterPage from './components/views/RegisterPage/RegisterPage.js'
import CreatePostingPage from './components/views/CreatePostingPage/CreatePostingPage.js'

import Axios from 'axios'
import {API_URL} from './config/config.js';
import Auth from './hoc/auth.js';
import { useQueryClient, QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import { MyPostingPage } from './components/views/MyPostingPage/MyPostingPage';
import { auth } from './api/auth';
import PostingDetailPage from './components/views/PostingDetailPage/PostingDetailPage';
import AdminHomePage from './components/views/admin/AdminHomePage/AdminHomePage';
import SavedPostingPage from './components/views/SavedPostingPage/SavedPostingPage';
import MyProfilePage from './components/views/MyProfilePage/MyProfilePage';
import AdminReportedListPage from './components/views/admin/AdminReportedListPage/AdminReportedListPage';


const queryClient = new QueryClient()



function App() {
  //useQuery("auth", auth);
  // const client = useQueryClient();
  // const user = client.getQueryData("auth");
  //const { isLoading, error, data } = useQuery('auth', auth)
  return (
        <>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/savedposting" element={<SavedPostingPage/>} />
            <Route path="/myposting" element={<MyPostingPage/>} />
            <Route path="/myprofile" element={<MyProfilePage/>} />
            <Route path="/createposting" element={<CreatePostingPage/>} />
            <Route path="/post/:id" element={<PostingDetailPage/>} />

            <Route path="/admin" element={<AdminHomePage/>} />
            <Route path="/admin/reportedlist" element={<AdminReportedListPage/>} />
          </Routes>
          <Footer></Footer>
          <ReactQueryDevtools initialIsOpen={false} />
        </>
  );
}

// function Example() {
//   const { isLoading, error, data } = useQuery('repoData', () =>
//     Axios.get('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
//       res.data
//     )
//   )

//   if (isLoading) return 'Loading...'

//   if (error) return 'An error has occurred: ' + error.message

//   return (
//     <div>
//       <h1>{data.name}</h1>
//       <p>{data.description}</p>
//       <strong>👀 {data.subscribers_count}</strong>{' '}
//       <strong>✨ {data.stargazers_count}</strong>{' '}
//       <strong>🍴 {data.forks_count}</strong>
//     </div>
//   )
// }

export default App;
