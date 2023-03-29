import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { set } from "date-fns";

export default function Header() {
  const { setUserInfo, userInfo, filterType, filterSelect, setFilterSelect } =
    useContext(UserContext);
  // useEffect(() => {
  //   fetch('http://localhost:4000/profile', {
  //     credentials: 'include',
  //   }).then(response => {
  //     response.json().then(userInfo => {
  //       setUserInfo(userInfo);
  //     });
  //   });
  // }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const filterChange = (e) => {
    setFilterSelect(e.target.value);
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        Documes
      </Link>
      <select valu={filterSelect} onChange={filterChange}>
        {filterType.map((oneType) => (
          <option key={oneType.value} value={oneType.value}>
            {oneType.type}
          </option>
        ))}
      </select>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
