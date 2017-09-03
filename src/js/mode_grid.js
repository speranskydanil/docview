import Mode from './mode'

export default class ModeGrid extends Mode {
  activate(index, zoom, scroll) {
    super.activate(index, zoom)

    this.page.div.addClass('current')

    for (let page of this.pages) {
      page.div.click(() => {
        this.page = page
        $(window).trigger('dv_inspect')
      })
    }

    $(window).on('scroll.dv_grid', () => {
      this.queue.clear()
      this.load()
    })

    this.redraw()

    if (scroll) this.scroll()
  }

  deactivate() {
    super.deactivate()
    this.dom.pages.removeClass('current')
    this.dom.pages.off('click')
    $(window).off('scroll.dv_grid')
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

  redraw() {
    this.queue.clear()
    this.resizePages()
    this.load()
  }

  load() {
    let pageHeight = this.pageHeightWithIndent
    let pagesInRow = Math.floor(this.dom.viewport.width() / this.pageWidthWithIndent)

    let viewport = {}
    viewport.top = $(window).scrollTop() - this.dom.viewport.offset().top
    viewport.bottom = viewport.top + $(window).height()

    let threshold = {top: 3 * pageHeight, bottom: 3 * pageHeight}

    // add to queue active pages and next pages

    let border1 = {
      top: viewport.top,
      bottom: viewport.bottom + threshold.bottom
    }

    let firstRow1 = Math.floor(border1.top / pageHeight)
    let firstPage1 = Math.min(Math.max(0, firstRow1 * pagesInRow), this.pages.length)

    let lastRow1 = Math.floor(border1.bottom / pageHeight)
    let lastPage1 = Math.min((lastRow1 + 1) * pagesInRow, this.pages.length)

    for (let i = firstPage1; i < lastPage1; i += 1) {
      this.queue.add(this.pages[i], this.zoom)
    }

    // add to queue previous pages

    let border2 = {
      top: viewport.top - threshold.top,
      bottom: viewport.top
    }

    let firstRow2 = Math.floor(border2.top / pageHeight)
    let firstPage2 = Math.min(Math.max(0, firstRow2 * pagesInRow), this.pages.length)

    for (let i = firstPage1 - 1; i >= firstPage2; i -= 1) {
      this.queue.add(this.pages[i], this.zoom)
    }
  }
}
