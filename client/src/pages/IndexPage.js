import Post from "../Post";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const { filterSelect } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        switch (Number(filterSelect)) {
          case 0:
            setPosts(posts);
            break;
          case 1:
            posts = posts.sort((a, b) => {
              return b.price - a.price;
            });
            setPosts(posts);
            break;
          case 2:
            posts = posts.sort((a, b) => {
              return a.price - b.price;
            });
            setPosts(posts);
            break;
          case 3:
            posts = posts.sort((a, b) => {
              return Date.parse(b.createdAt) - Date.parse(a.createdAt);
            });
            setPosts(posts);
            break;
          case 4:
            posts = posts.sort((a, b) => {
              return Date.parse(a.createdAt) - Date.parse(b.createdAt);
            });
            setPosts(posts);
            break;
          default:
            setPosts(posts);
        }
      });
    });
  }, [filterSelect]);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
}
