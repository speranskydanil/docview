import Mode from './mode'

export default class ModeInspect extends Mode {
  constructor(params) {
    super(params)
    this.name = 'inspect'
    this.animationIsInProgress = false
  }

  activate(index, zoom, scroll) {
    super.activate(index, zoom)

    this.dom.pages.hide()

    for (let page of this.pages) page.div.click(() => this.next())

    this.page.div.show()

    this.redraw()

    if (scroll) this.scroll()
  }

  deactivate() {
    super.deactivate()

    this.dom.pages.unbind('click').show()

    this.dom.wrapper.css({ width: '100%', height: 'auto' })

    // this.dom.images.rotate(0)
    this.dom.images.css('top', 'auto')

    this.dom.viewport.top_scrollbar(false)
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
    this.setCurPage(this.index + 1)
  }

  prev() {
    this.setCurPage(this.index - 1)
  }

  rotateLeft() {
    this.rotate(this.page.img, -90, () => this.fitIntoTheFrame())
  }

  rotateRight() {
    this.rotate(this.page.img, 90, () => this.fitIntoTheFrame())
  }

  rotate(img, angle, callback) {
    img.css('transition', 'transform 0.4s')
    angle = (img.data('angle') || 0) + angle
    img.css('transform', 'rotate(' + angle + 'deg)')
    img.data('angle', angle)
    setTimeout(callback, 400)
  }

  fitIntoTheFrame() {
    let img = this.page.img

    let horizontal = this.page.w > this.page.h
    let turned = Math.abs(Math.round(img.data('angle') / 90)) % 2 == 1

    if (horizontal && turned) {
      img.animate({ 'top': (img.width() - img.height()) / 2 }, 200)
    } else {
      img.animate({ 'top': 0 }, 200)
    }
  }

  setCurPage(index) {
    if (isNaN(index)) return

    if (index < 0) index = 0
    if (index > this.pages.length - 1) index = this.pages.length - 1

    if (this.index != index) {
      if (this.animationIsInProgress) return
      this.animationIsInProgress = true

      this.page.div.fadeOut(100, () => {
        this.page.div.fadeIn(100, () => {
          this.animationIsInProgress = false
        })
      })

      this.index = index

      this.queue.clear()
      this.load()
    }
  }

  redraw() {
    this.queue.clear()
    this.resize()
    this.load()
    this.fitIntoTheFrame()
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

    let numberOfImagesOnRight = Math.min(4, this.pages.length - 1 - this.index)

    for (let i = 1; i <= numberOfImagesOnRight; i += 1) {
      this.queue.add(this.pages[this.index + i], this.zoom)
    }

    let numberOfImagesOnLeft = Math.min(4, this.index)

    for (let i = 1; i <= numberOfImagesOnLeft; i += 1) {
      this.queue.add(this.pages[this.index - i], this.zoom)
    }
  }
}
