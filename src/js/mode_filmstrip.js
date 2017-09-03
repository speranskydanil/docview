import Mode from './mode'

export default class ModeFilmstrip extends Mode {
  constructor(params) {
    super(params)
    this.name = 'filmstrip'
  }

  activate(index, zoom, scroll) {
    super.activate(index, zoom)

    this.dom.viewport.scroll(() => {
      this.queue.clear()
      this.load()

      $(window).trigger('dv_change')
    })

    this.dom.viewport.mousewheel(function(e, d, dx, dy) {
      e.preventDefault()
      $(this).scrollLeft($(this).scrollLeft() - 50 * dy)
    })

    for (let page of this.pages) {
      page.div.click(() => {
        this.selectCurPage(page.index)
        $(window).trigger('dv_inspect')
      })
    }

    this.page.div.addClass('current')
    this.redraw()

    if (scroll) this.scroll()

    this.scrollFastToPage(this.index)
  }

  deactivate() {
    super.deactivate()

    this.dom.viewport.unbind('scroll')
    this.dom.viewport.unbind('mousewheel')
    this.dom.pages.unbind('click')

    this.page.div.removeClass('current')

    this.dom.wrapper.css('width', '100%')
    this.dom.viewport.top_scrollbar(false)
  }

  zoomIn() {
    if (this.zoom >= this.zooms.length - 1) return $(window).trigger('dv_max_zoom')

    this.zoom++
    this.redraw()
    this.scrollFastToPage(this.getFirstVisiblePage())
  }

  zoomOut() {
    this.zoom--
    this.redraw()
    this.scrollFastToPage(this.getFirstVisiblePage())
  }

  next() {
    this.dom.viewport
      .stop()
      .animate({'scrollLeft': '+=' + this.dom.viewport.width() })
  }

  prev() {
    this.dom.viewport
      .stop()
      .animate({'scrollLeft': '-=' + this.dom.viewport.width() })
  }

  setCurPage(index) {
    if (index < 0) index = 0
    if (index > this.pages.length - 1) index = this.pages.length - 1

    this.scrollSlowToPage(index)
  }

  selectCurPage(index) {
    if (index < 0) index = 0
    if (index > this.pages.length - 1) index = this.pages.length - 1

    if (this.index != index) {
      this.page.div.removeClass('current')
      this.index = index
      this.page.div.addClass('current')
    }
  }

  getFirstVisiblePage() {
    return Math.floor(
      this.dom.viewport.scrollLeft() /
      this.pageWidthWithIndent
    )
  }

  getLastVisiblePage() {
    return Math.ceil(
      (this.dom.viewport.width() + this.dom.viewport.scrollLeft()) /
      this.pageWidthWithIndent
    ) - 1
  }

  scrollSlowToPage(index) {
    this.dom.viewport
      .stop()
      .animate({'scrollLeft': index * this.pageWidthWithIndent})
  }

  scrollFastToPage(index) {
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
    this.dom.viewport.top_scrollbar(this.pageHeight > 400)
  }

  load() {
    let pageWidth = this.pageWidthWithIndent

    let border = {
      left: this.dom.viewport.scrollLeft(),
      right: this.dom.viewport.scrollLeft() + this.dom.viewport.width()
    }

    let threshold = {
      left: 8 * pageWidth,
      right: 8 * pageWidth
    }

    // add to queue acive pages and next ones

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

    let firstPage2 = Math.min(Math.max(0, Math.floor(border2.left / pageWidth)),this.pages.length)

    for (let i = firstPage1 - 1; i >= firstPage2; i -= 1) {
      this.queue.add(this.pages[i], this.zoom)
    }
  }
}
