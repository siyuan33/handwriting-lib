class Router {
  constructor(routers) {
    this.routers = {}
    routers.forEach((item) => {
      this.route(item.path, () => {
        document.getElementById("app").innerHTML = item.content
      })
    })
    this.bindClick()
    this.init()
  }
  route(path, cb) {
    this.routers[path] = cb
  }
  bindClick = () => {
    const links = document.getElementsByTagName("a")
    Array.from(links).map((link) => {
      link.addEventListener("click", () => {
        const path = link.getAttribute("path")
        this.pushRoute(path)
      })
    })
  }
  pushRoute(path) {
    window.history.pushState({}, null, path)
    this.update()
  }
  init = () => {
    window.addEventListener("load", this.update)
    window.addEventListener("popstate", this.update)
  }
  update = () => {
    const currentUrl = window.location.pathname || "/"
    this.routers[currentUrl] && this.routers[currentUrl]()
  }
}
const routers = [
  {
    path: "/a",
    content: `<p>我是a页面</p>`,
  },
  {
    path: "/b",
    content: `<p>我是b页面</p>`,
  },
]
new Router(routers)
