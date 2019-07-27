import React,{ useState } from 'react';
import './css/Blog.css';

const Blog = ({ blog, handleLike }) => {
  const [showFull, setShowFull] = useState(false);

  const handleClick = () => {
    setShowFull(!showFull);
  };

  const fullBlogElement = () =>(

    <div className="blog-item-container">
      <div onClick={ handleClick } className='blog-item blog-item-bg'>
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
    </div>
);

  const minimizedBlogElement = () => (
      <div onClick={ handleClick } className='blog-item'>
      <strong>{ blog.title }</strong> <em>{ blog.author }</em>
      </div>
  );

  return (
  <>
    { (showFull) ? fullBlogElement() : minimizedBlogElement() }
  </>
  );
}

export default Blog
