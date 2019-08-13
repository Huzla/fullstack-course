import blogService from "../services/blogs.js";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;

    case "CREATE_BLOG":
      return [...state, action.data];

    case "LIKE":
      return state.map(blog => { return { ...blog, likess: (blog.id === action.data.id) ? blog.votes + 1 : blog.votes } });

    default: return state;
  }
};

export const initBlogs = () => {
  return async (dispatch) => {
    try {
      const data = await blogService.getAll();

      dispatch({
        type: "INIT_BLOGS",
        data
      });
    }
    catch (err) {
      throw err;
    }
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const data = await blogService.create(content);

      dispatch({
        type: "CREATE_BLOG",
        data
      });
    }
    catch (err) {
      throw err;
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {

      const copy = { ...blog };
      copy.likes += 1;
      await blogService.replace(copy);

      dispatch({
        type: "LIKE",
        data: { id: blog.id }
      });
    }
    catch (err) {
      throw err;
    }
  };
};

export default blogReducer;
