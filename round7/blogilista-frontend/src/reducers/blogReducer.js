import blogService from "../services/blogs.js";

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case "INIT_BLOGS":
    return action.data;

  case "CREATE_BLOG":
    return [...state, action.data];

  case "REMOVE_BLOG":
    return state.filter(blog => blog.id !== action.data.id);

  case "LIKE":
    return state.map(blog => { return { ...blog, likes: (blog.id === action.data.id) ? blog.likes + 1 : blog.likes }; });

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

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      if (window.confirm(`Do you really want to remove ${ blog.title } by ${ blog.author }`)) {
        await blogService.remove(blog.id);

        dispatch({
          type: "REMOVE_BLOG",
          data: { id: blog.id }
        });
      }
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
