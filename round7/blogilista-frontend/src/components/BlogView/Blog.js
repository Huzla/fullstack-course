import PropTypes from "prop-types";
import React,{ useState } from "react";
import "./css/Blog.css";

const Blog = ({ blog, handleLike, handleRemove, removable }) => {
  const [showFull, setShowFull] = useState(false);

  const handleClick = () => {
    setShowFull(!showFull);
  };

  const fullBlogElement = () => (

    <div className="blog-item-container">
      <div onClick={ handleClick } className="blog-item blog-item-bg">
      </div>
      <div>
        <strong>{ blog.title }</strong>
      </div>

      <div>
        <em>{ blog.author }</em>
      </div>

      <div>
        <a href={ blog.url }>{ blog.url }</a>
      </div>

      <div>
        <span>{ blog.likes }</span> likes <button className="blog-item-button" onClick={ handleLike }>Like</button>
      </div>

      <div>
        added by <em>{ blog.user.name }</em>
      </div>
      {
        (removable) ?
          <div>
            <button onClick={ handleRemove } className="blog-item-button" title="remove">&#9932;</button>
          </div>
          :
          <></>
      }
    </div>
  );

  const minimizedBlogElement = () => (
    <div onClick={ handleClick } className="blog-item">
      <strong>{ blog.title }</strong> <em>{ blog.author }</em>
    </div>
  );

  return (
  <>
    { (showFull) ? fullBlogElement() : minimizedBlogElement() }
  </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  removable: PropTypes.bool.isRequired
};

export default Blog;
