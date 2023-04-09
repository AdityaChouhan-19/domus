/*
Created By: Yun Ki Jung
Modified By: Yun Ki Jung, Apr/09/2023
*/

import './App.css';
import { Routes, Route, Link, redirect } from 'react-router-dom'

import NavBar from './components/views/NavBar/NavBar.js'
import Footer from './components/views/Footer/Footer.js'
import HomePage from './components/views/HomePage/HomePage.js'
import LoginPage from './components/views/LoginPage/LoginPage.js'
import RegisterPage from './components/views/RegisterPage/RegisterPage.js'
import CreatePostingPage from './components/views/CreatePostingPage/CreatePostingPage.js'

import { ReactQueryDevtools } from 'react-query/devtools';
import { MyPostingPage } from './components/views/MyPostingPage/MyPostingPage';

import PostingDetailPage from './components/views/PostingDetailPage/PostingDetailPage';
import AdminUserListPage from './components/views/admin/AdminUserListPage/AdminUserListPage';
import SavedPostingPage from './components/views/SavedPostingPage/SavedPostingPage';
import MyProfilePage from './components/views/MyProfilePage/MyProfilePage';
import AdminReportedListPage from './components/views/admin/AdminReportedListPage/AdminReportedListPage';
import AdminBannedListPage from './components/views/admin/AdminBannedListPage/AdminBannedListPage';


function App() {

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

            <Route path="/admin/userlist" element={<AdminUserListPage/>} />
            <Route path="/admin/reportedlist" element={<AdminReportedListPage/>} />
            <Route path="/admin/bannedlist" element={<AdminBannedListPage/>} />
          </Routes>
          <Footer></Footer>
          <ReactQueryDevtools initialIsOpen={false} />
        </>
  );
}


export default App;
