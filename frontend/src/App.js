import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, redirect } from 'react-router-dom'
import NavBar from './components/views/NavBar/NavBar.js'
import Footer from './components/views/Footer/Footer.js'
import HomePage from './components/views/HomePage/HomePage.js'
import LoginPage from './components/views/LoginPage/LoginPage.js'
import RegisterPage from './components/views/RegisterPage/RegisterPage.js'
import Axios from 'axios'
import {API_URL} from './config/config.js';
import Auth from './hoc/auth.js';
import { useQueryClient, QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import { MyPostingPage } from './components/views/MyPostingPage/MyPostingPage';

const queryClient = new QueryClient()

const auth = async () => {
  const { data } = await Axios.get(API_URL + "/api/users/auth");

  return data;
};

function App() {
  //useQuery("auth", auth);
  // const client = useQueryClient();
  // const user = client.getQueryData("auth");

  return (
      <>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/myposting" element={<MyPostingPage/>} />
        </Routes>
        <Footer></Footer>
        <ReactQueryDevtools initialIsOpen={false} />
      </>
  );
}

function Example() {
  const { isLoading, error, data } = useQuery('repoData', () =>
    Axios.get('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
      res.data
    )
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}

export default App;
