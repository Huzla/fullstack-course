const listHelper = require("../src/utils/listHelper.js");

const listWithManyBlogs = [
  {
      _id: "5d2046850aeaea2a220add16",
      title: "Testi",
      author: "Teppo Testaaja",
      url: "testi.com",
      likes: 0,
      __v: 0
  },
  {
      _id: "5d205058b4319330f66e37f2",
      title: "Testini",
      author: "Teppo Testaaja",
      url: "testi.fi",
      likes: 1,
      __v: 0
  },
  {
      _id: "5d205058b4319330f66e37f2",
      title: "Testauksesta 1",
      author: "Tiina Testaaja",
      url: "testi.net",
      likes: 123,
      __v: 0
  },
  {
    _id: "5d205058b4319330f66e37f2",
    title: "Testauksesta 2",
    author: "Tiina Testaaja",
    url: "testi.net",
    likes: 123,
    __v: 0
  },
  {
      _id: "5d205058b4319330f66e37f2",
      title: "Testaajan käsikirja",
      author: "Teppo Testaaja",
      url: "testi.ninja",
      likes: 999,
      __v: 0
  }
];

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
];


test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {


  test("empty list has zero likes", () => expect(listHelper.totalLikes([])).toBe(0));

  test("when list has only one blog equals the likes of that", () => expect(listHelper.totalLikes(listWithOneBlog)).toBe(5));

  test("list with many blogs equals the sum of all those", () => expect(listHelper.totalLikes(listWithManyBlogs)).toBe(0+1+123+123+999));
});

describe("favorite blog", () => {

  test("empty list has no favorite and returns falsy", () => {
    expect(listHelper.favoriteBlog([])).toBeFalsy();
  });

  test("when list has only one blog that is the favorite", () => {
    const correct = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    };

    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(correct);
  });

  test("in a list with many blogs the favorite has most likes", () => {
    const correct = {
      title: "Testaajan käsikirja",
      author: "Teppo Testaaja",
      likes: 999
    };

    expect(listHelper.favoriteBlog(listWithManyBlogs)).toEqual(correct)
  });
});

describe("most blogs", () => {

  test("empty list has no favorite and returns falsy", () => {
    expect(listHelper.mostBlogs([])).toBeFalsy();
  });

  test("when list has only one blog that is the favorite", () => {
    const correct = {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    };

    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(correct);
  });

  test("in a list with many blogs the favorite has most likes", () => {
    const correct = {
      author: "Teppo Testaaja",
      blogs: 3
    };

    expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual(correct)
  });
});

describe("most likes", () => {

  test("empty list has no favorite and returns falsy", () => {
    expect(listHelper.mostLikes([])).toBeFalsy();
  });

  test("when list has only one blog that is the favorite", () => {
    const correct = {
      author: "Edsger W. Dijkstra",
      likes: 5,
    };

    expect(listHelper.mostLikes(listWithOneBlog)).toEqual(correct);
  });

  test("in a list with many blogs the favorite has most likes", () => {
    const correct = {
      author: "Teppo Testaaja",
      likes: 1000
    };

    expect(listHelper.mostLikes(listWithManyBlogs)).toEqual(correct)
  });
});
