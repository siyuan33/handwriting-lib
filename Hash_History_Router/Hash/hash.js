class Router {
  constructor(...args) {
    this.routers = {}
    args[0].forEach((item) => {
      this.routers[item.path] = () => {
        document.getElementById("app").innerHTML = item.content
      }
    })
    this.init()
  }
  init = () => {
    window.addEventListener("load", this.update)
    window.addEventListener("hashchange", this.update)
  }
  update = () => {
    const hash = window.location.hash.slice(1) || "/"
    this.routers[hash] && this.routers[hash]()
  }
}
const routers = [
  {
    path: "/h",
    content: `<p>hhhhh</p>`,
  },
  {
    path: "/s",
    content: `<p>sssss</p>`,
  },
]

new Router(routers)
