import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
  price,
}) {
  let contentEdit = content.substring(3, content.length - 4);
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/" + cover} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>title: {title}</h2>
        </Link>
        <p className="info">
          {/* <a className="author"> */}
          <Link to={`/list/${author.username}`}>{author.username}</Link>
          {/* </a> */}
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">summary: {summary}</p>
        <p className="content">content: {contentEdit}</p>
        <p className="price">price: {price}</p>
      </div>
    </div>
  );
}
