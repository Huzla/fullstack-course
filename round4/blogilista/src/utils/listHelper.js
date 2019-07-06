const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs.length)
    return 0;

  return blogs.map(blog => blog.likes).reduce((acc, cur) => acc + cur);
};

const favoriteBlog = (blogs) => {

  const max = Math.max(...blogs.map(b => b.likes));

  let result = blogs.find(b => b.likes === max);

  if (result) {
    delete result._id;
    delete result.__v;
    delete result.url;
  }

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
