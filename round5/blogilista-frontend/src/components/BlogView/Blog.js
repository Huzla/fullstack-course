import React,{ useState } from 'react';
import './css/Blog.css';

const Blog = ({ blog }) => {
  const [showFull, setShowFull] = useState(false);

  const handleClick = () => {
    setShowFull(!showFull);
  };

  const fullBlogElement = () =>(

    <>
      <div>
        <strong>{ blog.title }</strong>
      </div>

      <div>
        <em>{ blog.author }</em>
      </div>

      <div>
        <a href={ blog.url }></a>
      </div>

      <div>
        <span>{ blog.likes }</span> likes <button>Like</button>
      </div>

      <div>
        added by <em>{ blog.user.name }</em>
      </div>
    </>
);

  const minimizedBlogElement = () => (
      <>
      <strong>{ blog.title }</strong> <em>{ blog.author }</em>
      </>
  );

  return (
  <div onClick={ handleClick } className='blog-item'>
    { (showFull) ? fullBlogElement() : minimizedBlogElement() }
  </div>
  );
}

export default Blog
