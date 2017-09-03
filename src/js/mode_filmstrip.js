import Mode from './mode'

export default class ModeFilmstrip extends Mode {
  activate(index, zoom, scroll) {
    super.activate(index, zoom)

    this.page.div.addClass('dv-active')

    for (let page of this.pages) {
      page.div.click(() => {
        this.page = page
        $(window).trigger('dv-inspect')
      })
    }

    this.dom.viewport.scroll(() => {
      this.queue.clear()
      this.load()
      $(window).trigger('dv-change')
    })

    this.dom.viewport.mousewheel(function(e, d, dx, dy) {
      e.preventDefault()
      $(this).scrollLeft($(this).scrollLeft() - 50 * dy)
    })

    this.redraw()

    this.move(this.index)

    if (scroll) this.scroll()
  }

  deactivate() {
    super.deactivate()
    this.dom.pages.removeClass('dv-active')
    this.dom.pages.off('click')
    this.dom.viewport.off('scroll')
    this.dom.viewport.off('mousewheel')
    this.dom.wrapper.css('width', '100%')
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
    this.dom.viewport.stop().animate({'scrollLeft': `+=${this.dom.viewport.width()}`})
  }

  prev() {
    this.dom.viewport.stop().animate({'scrollLeft': `-=${this.dom.viewport.width()}`})
  }

  changeIndex(index) {
    index = Math.min(Math.max(index, 0), this.pages.length - 1)
    this.dom.viewport.stop().animate({'scrollLeft': index * this.pageWidthWithIndent})
  }

  get firstIndex() {
    return Math.floor(this.dom.viewport.scrollLeft() / this.pageWidthWithIndent)
  }

  get lastIndex() {
    let indent = this.dom.viewport.width() + this.dom.viewport.scrollLeft()
    return Math.min(Math.ceil(indent / this.pageWidthWithIndent) - 1, this.pages.length - 1)
  }

  move(index) {
    this.dom.viewport.scrollLeft(index * this.pageWidthWithIndent)
  }

  redraw() {
    this.queue.clear()
    this.resize()
    this.load()
  }

  resize() {
    this.resizePages()
    this.dom.wrapper.css('width', this.pages.length * this.pageWidthWithIndent)
    this.dom.viewport.top_scrollbar(this.pageHeight > 384)
  }

  load() {
    let pageWidth = this.pageWidthWithIndent

    let border = {
      left: this.dom.viewport.scrollLeft(),
      right: this.dom.viewport.scrollLeft() + this.dom.viewport.width()
    }

    let threshold = {left: 7 * pageWidth, right: 7 * pageWidth}

    // add to queue acive pages and next pages

    let border1 = {
      left: border.left,
      right: border.right + threshold.right
    }

    let firstPage1 = Math.min(Math.max(0, Math.floor(border1.left / pageWidth)), this.pages.length)
    let lastPage1 = Math.min(Math.ceil(border1.right / pageWidth), this.pages.length)

    for (let i = firstPage1; i < lastPage1; i += 1) {
      this.queue.add(this.pages[i], this.zoom)
    }

    // add to queue previous pages

    let border2 = {
      left: border.left - threshold.left,
      right: border.left
    }

    let firstPage2 = Math.min(Math.max(0, Math.floor(border2.left / pageWidth)), this.pages.length)

    for (let i = firstPage1 - 1; i >= firstPage2; i -= 1) {
      this.queue.add(this.pages[i], this.zoom)
    }
  }
}
