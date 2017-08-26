import Mode from './mode'

class ModeFilmstrip extends Mode {
  constructor(params) {
    super(params)
    this.name = 'filmstrip'
  }

  activate(switching) {
    this.setValidZoom()

    var self = this

    this.dom.viewport.scroll(function() {
      self.queue.clear()
      self.load()

      $(window).trigger('docview-mode-changed')
    })

    this.dom.viewport.mousewheel(function(e, d, dx, dy) {
      e.preventDefault()
      $(this).scrollLeft($(this).scrollLeft() - 50 * dy)
    })

    for (var i in this.pages) {
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
      $(window).scrollTop(this.curPage().div.offset().top - 60)
    }

    this.scrollFastToPage(this.index)
  }

  deactivate() {
    this.queue.clear()

    this.dom.viewport.unbind('scroll')
    this.dom.viewport.unbind('mousewheel')
    this.dom.pages.unbind('click')

    this.curPage().div.removeClass('current')

    this.dom.wrapper.css('width', '100%')
    this.dom.viewport.top_scrollbar(false)
  }

  zoomIn() {
    if (this.zoom >= this.zooms.length - 1) return $(window).trigger('docview-access-denied')

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
      this.curPage().div.removeClass('current')
      this.index = index
      this.curPage().div.addClass('current')
    }
  }

  getFirstVisiblePage() {
    return Math.floor(
      this.dom.viewport.scrollLeft() /
      this.pageWidthWithIndent()
    )
  }

  getLastVisiblePage() {
    return Math.ceil(
      (this.dom.viewport.width() + this.dom.viewport.scrollLeft()) /
      this.pageWidthWithIndent()
    ) - 1
  }

  scrollSlowToPage(index) {
    this.dom.viewport
      .stop()
      .animate({'scrollLeft': index * this.pageWidthWithIndent()})
  }

  scrollFastToPage(index) {
    this.dom.viewport.scrollLeft(index * this.pageWidthWithIndent())
  }

  redraw() {
    this.queue.clear()
    this.resize()
    this.load()
  }

  resize() {
    this.resizePages()
    this.dom.wrapper.css('width', this.pages.length * this.pageWidthWithIndent())
    this.dom.viewport.top_scrollbar(this.pageHeight() > 400)
  }

  load() {
    var pageWidth = this.pageWidthWithIndent()

    var border = {
      left: this.dom.viewport.scrollLeft(),
      right: this.dom.viewport.scrollLeft() + this.dom.viewport.width()
    }

    var threshold = {
      left: 8 * pageWidth,
      right: 8 * pageWidth
    }

    // add to queue acive pages and next ones

    var border1 = {
      left: border.left,
      right: border.right + threshold.right
    }

    var firstPage1 = Math.min(Math.max(0, Math.floor(border1.left / pageWidth)), this.pages.length)
    var lastPage1 = Math.min(Math.ceil(border1.right / pageWidth), this.pages.length)

    for (var i = firstPage1; i < lastPage1; i += 1) {
      this.queue.add(this.pages[i], this.zoom)
    }

    // add to queue previous pages

    var border2 = {
      left: border.left - threshold.left,
      right: border.left
    }

    var firstPage2 = Math.min(Math.max(0, Math.floor(border2.left / pageWidth)),this.pages.length)

    for (var i = firstPage1 - 1; i >= firstPage2; i -= 1) {
      this.queue.add(this.pages[i], this.zoom)
    }
  }
}

$.each(['activate', 'zoomIn', 'zoomOut'], function(i, name) {
  var func = ModeFilmstrip.prototype[name]

  ModeFilmstrip.prototype[name] = function() {
    func.apply(this, arguments)
    $(window).trigger('docview-mode-changed')
  }
})

export default ModeFilmstrip
