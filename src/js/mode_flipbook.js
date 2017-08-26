import Mode from './mode'

class ModeFlipBook extends Mode {
  constructor(params) {
    super(params)
    this.name = 'flip-book'
    this.animationIsInProgress = false
  }

  activate(switching) {
    this.setValidZoom()

    var self = this

    for (var i in this.pages) {
      if (i % 2 == 0) {
        this.pages[i].div
          .css({ right: 0, top: 0 })
          .click(function() { self.next(); })
      } else {
        this.pages[i].div
          .css({ left: 0, top: 0 })
          .click(function() { self.prev(); })
      }
    }

    this.dom.pages.css('position', 'absolute')

    this.showPages()
    this.redraw()

    if (switching) {
      $(window).scrollTop(this.curPage().div.offset().top - 60)
    }
  }

  deactivate() {
    this.queue.clear()

    this.dom.pages.unbind('click').css('position', 'relative').show()

    this.dom.wrapper.css({ width: '100%', height: 'auto' })

    this.dom.viewport.top_scrollbar(false)
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

  next() {
    if (this.animationIsInProgress) return
    if (this.index + (this.index % 2) - 1 + 2 > this.pages.length - 1) return

    this.animationIsInProgress = true

    var index = this.index + (this.index % 2) - 1

    var p1 = this.pages[index]
    var p2 = this.pages[index + 1]
    var p3 = this.pages[index + 2]
    var p4 = this.pages[index + 3]

    var self = this

    if (p4) p4.div.css('z-index', -1).show()

    p2.img.height(this.zooms[this.zoom] * p2.ratio)
    p2.img.animate({ width: 0 }, 180, function() {
      p2.div.hide()

      p3.img.css({ width: 0, right: 0 })
      p3.div.show()

      p3.img.height(self.zooms[self.zoom] * p3.ratio)
      p3.img.animate({ width: self.pageWidth() }, 180, function() {
        if (p1) p1.div.hide()

        if (p4) p4.div.css('z-index', 'auto')
        p2.img.removeAttr('style')
        p3.img.removeAttr('style')

        self.setCurPage(self.index + 2)
        $(window).trigger('docview-mode-changed')

        self.animationIsInProgress = false
      })
    })
  }

  prev() {
    if (this.animationIsInProgress) return
    if (this.index + (this.index % 2) - 1 - 1 < 0) return

    this.animationIsInProgress = true

    var index = this.index + (this.index % 2) - 1

    var p1 = this.pages[index - 2]
    var p2 = this.pages[index - 1]
    var p3 = this.pages[index]
    var p4 = this.pages[index + 1]

    var self = this

    if (p1) p1.div.show()

    p3.img.css('right', 0)

    p3.img.height(this.zooms[this.zoom] * p3.ratio)
    p3.img.animate({ width: 0 }, 180, function() {
      p3.div.hide()

      p2.img.css('width', 0)
      p2.div.css('z-index', 1).show()

      p2.img.height(self.zooms[self.zoom] * p2.ratio)
      p2.img.animate({ width: self.pageWidth() }, 180, function() {
        if (p4) p4.div.hide()

        p3.img.removeAttr('style')
        p2.img.removeAttr('style')
        p2.div.css('z-index', 'auto')

        self.setCurPage(self.index - 2)
        $(window).trigger('docview-mode-changed')

        self.animationIsInProgress = false
      })
    })
  }

  setCurPage(index) {
    if (isNaN(index)) return

    if (index < 0) index = 0
    if (index > this.pages.length - 1) index = this.pages.length - 1

    if (this.index != index) {
      this.index = index
      this.showPages()

      this.queue.clear()
      this.load()
    }
  }

  showPages() {
    this.dom.pages.hide()

    if (this.index == 0) {
      this.pages[this.index].div.show()
    } else {
      var index = this.index + (this.index % 2) - 1
      this.pages[index].div.show()

      if (index + 1 < this.pages.length) this.pages[index + 1].div.show()
    }
  }

  redraw() {
    this.queue.clear()
    this.resize()
    this.load()
  }

  resize() {
    this.resizePages()

    this.dom.wrapper.css({
      width: 2 * this.pageWidth(),
      height: this.pageHeight()
    })

    this.dom.viewport.top_scrollbar()
  }

  load() {
    var index = Math.max(0, this.index + (this.index % 2) - 1)

    this.queue.add(this.pages[index], this.zoom)
    if (index + 1 < this.pages.length) this.queue.add(this.pages[index + 1], this.zoom)

    var numberOfImagesOnRight = Math.min(8, this.pages.length - index - 2)

    for (var i = 1; i <= numberOfImagesOnRight; i += 1) {
      this.queue.add(this.pages[(index + 1) + i], this.zoom)
    }

    var numberOfImagesOnLeft = Math.min(8, index)

    for (var i = 1; i <= numberOfImagesOnLeft; i += 1) {
      this.queue.add(this.pages[index - i], this.zoom)
    }
  }
}

$.each(['activate', 'zoomIn', 'zoomOut', 'prev', 'setCurPage', 'next'], function(i, name) {
  var func = ModeFlipBook.prototype[name]

  ModeFlipBook.prototype[name] = function() {
    func.apply(this, arguments)
    $(window).trigger('docview-mode-changed')
  }
})

export default ModeFlipBook
