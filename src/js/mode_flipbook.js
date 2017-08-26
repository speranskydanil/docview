import Mode from './mode'

class ModeFlipBook extends Mode {
  constructor(params) {
    super(params)
    this.name = 'flip-book'
    this.animationIsInProgress = false
  }

  activate(switching) {
    this.setValidZoom()

    for (let [i, page] of this.pages.entries()) {
      if (i % 2 == 0) {
        page.div.css({ right: 0, top: 0 }).click(() => this.next())
      } else {
        page.div.css({left: 0, top: 0}).click(() => this.prev())
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

    let index = this.index + (this.index % 2) - 1

    let p1 = this.pages[index]
    let p2 = this.pages[index + 1]
    let p3 = this.pages[index + 2]
    let p4 = this.pages[index + 3]

    if (p4) p4.div.css('z-index', -1).show()

    p2.img.height(this.zooms[this.zoom] * p2.ratio)
    p2.img.animate({ width: 0 }, 180, () => {
      p2.div.hide()

      p3.img.css({ width: 0, right: 0 })
      p3.div.show()

      p3.img.height(this.zooms[this.zoom] * p3.ratio)
      p3.img.animate({ width: this.pageWidth() }, 180, () => {
        if (p1) p1.div.hide()

        if (p4) p4.div.css('z-index', 'auto')
        p2.img.removeAttr('style')
        p3.img.removeAttr('style')

        this.setCurPage(this.index + 2)
        $(window).trigger('docview-mode-changed')

        this.animationIsInProgress = false
      })
    })
  }

  prev() {
    if (this.animationIsInProgress) return
    if (this.index + (this.index % 2) - 1 - 1 < 0) return

    this.animationIsInProgress = true

    let index = this.index + (this.index % 2) - 1

    let p1 = this.pages[index - 2]
    let p2 = this.pages[index - 1]
    let p3 = this.pages[index]
    let p4 = this.pages[index + 1]

    if (p1) p1.div.show()

    p3.img.css('right', 0)

    p3.img.height(this.zooms[this.zoom] * p3.ratio)
    p3.img.animate({ width: 0 }, 180, () => {
      p3.div.hide()

      p2.img.css('width', 0)
      p2.div.css('z-index', 1).show()

      p2.img.height(this.zooms[this.zoom] * p2.ratio)
      p2.img.animate({ width: this.pageWidth() }, 180, () => {
        if (p4) p4.div.hide()

        p3.img.removeAttr('style')
        p2.img.removeAttr('style')
        p2.div.css('z-index', 'auto')

        this.setCurPage(this.index - 2)
        $(window).trigger('docview-mode-changed')

        this.animationIsInProgress = false
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
      let index = this.index + (this.index % 2) - 1
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
    let index = Math.max(0, this.index + (this.index % 2) - 1)

    this.queue.add(this.pages[index], this.zoom)
    if (index + 1 < this.pages.length) this.queue.add(this.pages[index + 1], this.zoom)

    let numberOfImagesOnRight = Math.min(8, this.pages.length - index - 2)

    for (let i = 1; i <= numberOfImagesOnRight; i += 1) {
      this.queue.add(this.pages[(index + 1) + i], this.zoom)
    }

    let numberOfImagesOnLeft = Math.min(8, index)

    for (let i = 1; i <= numberOfImagesOnLeft; i += 1) {
      this.queue.add(this.pages[index - i], this.zoom)
    }
  }
}

$.each(['activate', 'zoomIn', 'zoomOut', 'prev', 'setCurPage', 'next'], function(i, name) {
  let func = ModeFlipBook.prototype[name]

  ModeFlipBook.prototype[name] = function() {
    func.apply(this, arguments)
    $(window).trigger('docview-mode-changed')
  }
})

export default ModeFlipBook
