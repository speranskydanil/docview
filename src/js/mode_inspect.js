import Mode from './mode'

export default class ModeInspect extends Mode {
  constructor(params) {
    super(params)
    this.animation = false
  }

  activate(index, zoom, scroll) {
    super.activate(index, zoom)

    this.dom.pages.hide()
    this.page.div.show()

    for (let page of this.pages) page.div.click(() => this.next())

    this.redraw()

    if (scroll) this.scroll()
  }

  deactivate() {
    super.deactivate()
    this.dom.pages.show()
    this.dom.pages.off('click')
    this.dom.wrapper.css({width: '100%', height: 'auto'})
    this.dom.viewport.top_scrollbar(false)
    this.dom.images.css('transform', '')
    this.dom.images.css('top', 'auto')
  }

  zoomIn() {
    if (this.zoom >= this.zooms.length - 1) return $(window).trigger('dv_max_zoom')
    this.zoom++
    this.redraw()
  }

  zoomOut() {
    if (this.zoom == 0) return
    this.zoom--
    this.redraw()
  }

  next() {
    this.changeIndex(this.index + 1)
  }

  prev() {
    this.changeIndex(this.index - 1)
  }

  changeIndex(index) {
    if (this.animation) return

    this.animation = true

    this.page.div.fadeOut(100, () => {
      this.page.div.fadeIn(100, () => {
        this.animation = false
      })
    })

    this.index = Math.min(Math.max(index, 0), this.pages.length - 1)

    this.queue.clear()
    this.load()
  }

  rotateLeft() {
    this.rotate(-90)
  }

  rotateRight() {
    this.rotate(90)
  }

  rotate(angle) {
    let img = this.page.img
    img.css('transition', 'transform 0.4s')
    angle = (img.data('angle') || 0) + angle
    img.css('transform', `rotate(${angle}deg)`)
    img.data('angle', angle)
    setTimeout(() => this.fit(), 400)
  }

  fit() {
    let img = this.page.img

    let horizontal = this.page.w > this.page.h
    let turned = Math.abs(Math.round(img.data('angle') / 90)) % 2 == 1

    if (horizontal && turned) {
      img.animate({'top': (img.width() - img.height()) / 2}, 200)
    } else {
      img.animate({'top': 0}, 200)
    }
  }

  redraw() {
    this.queue.clear()
    this.resize()
    this.load()
    this.fit()
  }

  resize() {
    this.resizePages()

    this.dom.wrapper.css({
      width: this.pageWidthWithIndent,
      height: Math.max(this.pageWidthWithIndent, this.pageHeightWithIndent)
    })

    this.dom.viewport.top_scrollbar()
  }

  load() {
    this.queue.add(this.pages[this.index], this.zoom)

    let rightImages = Math.min(5, this.pages.length - 1 - this.index)

    for (let i = 1; i <= rightImages; i += 1) {
      this.queue.add(this.pages[this.index + i], this.zoom)
    }

    let leftImages = Math.min(5, this.index)

    for (let i = 1; i <= leftImages; i += 1) {
      this.queue.add(this.pages[this.index - i], this.zoom)
    }
  }
}
