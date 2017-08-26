import Mode from './mode'

class ModeGrid extends Mode {
  constructor(params) {
    super(params)
    this.name = 'grid'
  }

  activate(switching) {
    this.setValidZoom()

    let self = this

    $(window).bind('scroll.docview-grid', function() {
      self.queue.clear()
      self.load()
    })

    for (let i in this.pages) {
      (function(page) {
        page.div.click(function() {
          self.selectCurPage(page.index)
          $(window).trigger('docview-select-cur-page')
        })
      })(this.pages[i])
    }

    this.curPage().div.addClass('current')
    this.redraw()

    if (switching) {
      $(window).scrollTop(this.curPage().div.offset().top - 5)
    }
  }

  deactivate() {
    this.queue.clear()

    $(window).unbind('scroll.docview-grid')
    this.dom.pages.unbind('click')

    this.curPage().div.removeClass('current')
  }

  zoomIn() {
    if (this.zoom >= this.zooms.length - 1) return $(window).trigger('docview-access-denied')

    this.zoom++
    this.redraw()
  }

  zoomOut() {
    if (this.zoom == 0) return

    this.zoom--
    this.redraw()
  }

  selectCurPage(index) {
    if (index < 0) index = 0
    if (index > this.pages.length - 1) index = this.pages.length - 1

    if (this.index != index) {
      this.curPage().div.removeClass('current')
      this.index = index
      this.curPage().div.addClass('current')
    }
  }

  redraw() {
    this.queue.clear()
    this.resizePages()
    this.load()
  }

  load() {
    let win = $(window)

    let pageHeight = this.pageHeightWithIndent()
    let pagesInRow = Math.floor(this.dom.viewport.width() / this.pageWidthWithIndent())

    let viewport = {
      top: win.scrollTop() - this.dom.viewport.offset().top
    }

    viewport.bottom = viewport.top + win.height()

    let threshold = {
      top: 3 * pageHeight,
      bottom: 3 * pageHeight
    }

    // add to queue active pages and next ones

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

$.each(['activate', 'zoomIn', 'zoomOut'], function(i, name) {
  let func = ModeGrid.prototype[name]

  ModeGrid.prototype[name] = function() {
    func.apply(this, arguments)
    $(window).trigger('docview-mode-changed')
  }
})

export default ModeGrid
