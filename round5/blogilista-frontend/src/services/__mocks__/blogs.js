const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "Älä hättäile, tämä on testi",
    author: "Timo Testaaja",
    url: "testi.com",
    likes: 5,
    user: {
      userId: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e21e0b8b04a45638211",
    title: "Ei lintu eikä lentokone, vaan testi",
    author: "Tiina Testaaja",
    url: "testi.com",
    likes: 1,
    user: {
      userId: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e30b5ffd44a58fa79ab",
    title: "Testaukseni",
    author: "Teppo Testaaja",
    url: "testi.com",
    likes: 0,
    user: {
      userId: "Teppo123",
      name: "Teppo Testaaja"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
