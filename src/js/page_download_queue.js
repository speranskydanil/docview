export default class PageDownloadQueue {
  constructor() {
    this.fast = new Queue()
    this.slow = new Queue()
  }

  clear() {
    this.fast.clear()
    this.slow.clear()
  }

  add(page, zoom) {
    if (!page.url()) this.fast.add(page, 0)
    this.slow.add(page, zoom)
  }
}

class Queue {
  constructor() {
    this.items = []
    this.thread = 0
  }

  clear() {
    this.items = []
  }

  add(page, zoom) {
    this.items.push({page: page, zoom: zoom})
    this.load()
  }

  load() {
    if (this.items.length == 0) return

    let zoom = this.items[this.items.length - 1].zoom
    let maxThread = {0: 10, 1: 8, 2: 6, 3: 4}[zoom] || 2

    if (this.thread == maxThread) return

    let item = this.items.shift()
    this.thread++

    item.page.load(item.zoom, () => {
      this.thread--
      this.load()
    })
  }
}
