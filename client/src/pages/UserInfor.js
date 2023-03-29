import Post from "../Post";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
export default function UserInfor() {
  const { name } = useParams();
  const [posts, setPosts] = useState([]);
  const { filterSelect } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        let postlist = posts.filter((post) => post.author.username === name);
        switch (Number(filterSelect)) {
          case 0:
            setPosts(postlist);
            break;
          case 1:
            postlist = postlist.sort((a, b) => {
              return b.price - a.price;
            });
            setPosts(postlist);
            break;
          case 2:
            postlist = postlist.sort((a, b) => {
              return a.price - b.price;
            });
            setPosts(postlist);
            break;
          case 3:
            postlist = postlist.sort((a, b) => {
              return Date.parse(b.createdAt) - Date.parse(a.createdAt);
            });
            setPosts(postlist);
            break;
          case 4:
            postlist = postlist.sort((a, b) => {
              return Date.parse(a.createdAt) - Date.parse(b.createdAt);
            });
            setPosts(postlist);
            break;
          default:
            setPosts(postlist);
        }
      });
    });
  }, [filterSelect]);

  return (
    <>
      <div className="center">name:{name}</div>
      <br />
      <br />
      <p className="center">
        Customer's posts: (Total Quantity:{posts.length}){" "}
      </p>
      <br />
      <hr />
      {posts.length > 0 && posts.map((post) => <Post key="_id" {...post} />)}
    </>
  );
}
