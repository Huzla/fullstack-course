const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs.length)
    return 0;
    
  return blogs.map(blog => blog.likes).reduce((acc, cur) => acc + cur);
};

module.exports = {
  dummy,
  totalLikes
};
