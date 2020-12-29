class EventBus {
  constructor() {
    this._events = {}
  }
  $on(key, cbs, isKeep = true) {
    if (!key) throw new Error("a key is required")
    if (!this._events[key]) {
      this._events[key] = []
    }
    this._events[key].push({
      cbs: cbs,
      isKeep: isKeep,
    })
    console.log("添加任务成功")
    return
  }
  $off(key, cb) {
    if (!key) throw new Error("a key is required")
    if (this._events[key]) {
      // 没有 cbs 就删除 绑定 key 的所有 回调 cbs
      if (!cb) {
        delete this._events[key]
      } else {
        // 删除 cbs 数组的 cb相
        const index = this._events[key].findIndex(cb)
        this._events[key].splice(index, 1)
      }
    }
    return console.log(`已删除${key}事件`)
  }

  $emit(key) {
    if (!key) throw new Error("a key is required")
    if (!this._events[key]) throw new Error("this key is not registered")
    const args = [...arguments].slice(1)
    this._events[key].map((item) => {
      if (item.cbs) {
        item.cbs.apply(this, args)
        if (!item.isKeep) {
          _this.$off(key, item.cbs)
        }
      }
    })
  }
}

const evt = new EventBus()

// evt.$on("sss", (args) => {
//   console.log(args, "args")
// })
// evt.$emit("sss", 123)
// evt.$off("sss")
// console.log(evt, "evt")

export default EventBus
