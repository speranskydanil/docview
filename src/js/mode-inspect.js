import Mode from './mode.js'
import Queue from './queue.js'

class ModeInspect extends Mode {
  constructor(params) {
    super()
    this.configurate(params)
    this.name = 'inspect'
    this.queue = new Queue()
    this.animationIsInProgress = false
  }

  activate(switching) {
    this.setValidZoom()

    this.dom.pages.hide()

    var self = this
    for (var i in this.pages) this.pages[i].obj.click(function() { self.next(); })

    this.curPage().obj.show()

    this.redraw()

    if (switching) {
      $(window).scrollTop(this.curPage().obj.offset().top - 60)
    }
  }

  deactivate() {
    this.queue.clear()

    this.dom.pages.unbind('click').show()

    this.dom.wrapper.css({ width: '100%', height: 'auto' })

    // this.dom.images.rotate(0)
    this.dom.images.css('top', 'auto')

    this.dom.viewport.top_scrollbar(false)
  }

  zoomIn() {
    if (!this.canZoom()) {
      $(window).trigger('docview-access-denied')
      return
    }

    if (this.zoom < this.zoomMax) {
      this.incZoom()
      this.redraw()
    }
  }

  zoomOut() {
    if (this.zoom > this.zoomMin) {
      this.decZoom()
      this.redraw()
    }
  }

  next() {
    this.setCurPage(this.index + 1)
  }

  prev() {
    this.setCurPage(this.index - 1)
  }

  rotateLeft() {
    var self = this
    this.rotate(self.curPage().img, -90, function() { self.fitIntoTheFrame() })
  }

  rotateRight() {
    var self = this
    this.rotate(self.curPage().img, 90, function() { self.fitIntoTheFrame() })
  }

  rotate(img, angle, callback) {
    img.css('transition', 'transform 0.4s')
    angle = (img.data('angle') || 0) + angle
    img.css('transform', 'rotate(' + angle + 'deg)')
    img.data('angle', angle)
    setTimeout(callback, 400)
  }

  fitIntoTheFrame() {
    var img = this.curPage().img

    var horizontal = this.curPage().w > this.curPage().h
    var turned = Math.abs(Math.round(img.data('angle') / 90)) % 2 == 1

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

      var self = this

      this.curPage().obj.fadeOut(100, function() {
        self.curPage().obj.fadeIn(100, function() {
          self.animationIsInProgress = false
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
      width: this.pageWidthWithIndent(),
      height: Math.max(this.pageWidthWithIndent(), this.pageHeightWithIndent())
    })

    this.dom.viewport.top_scrollbar()
  }

  load() {
    this.queue.addPage(this.pages[this.index], this.zoom)

    var numberOfImagesOnRight = Math.min(4, this.pages.length - 1 - this.index)

    for (var i = 1; i <= numberOfImagesOnRight; i += 1) {
      this.queue.addPage(this.pages[this.index + i], this.zoom)
    }

    var numberOfImagesOnLeft = Math.min(4, this.index)

    for (var i = 1; i <= numberOfImagesOnLeft; i += 1) {
      this.queue.addPage(this.pages[this.index - i], this.zoom)
    }
  }
}

$.each(['activate', 'zoomIn', 'zoomOut', 'prev', 'setCurPage', 'next'], function(i, name) {
  var func = ModeInspect.prototype[name]

  ModeInspect.prototype[name] = function() {
    func.apply(this, arguments)
    $(window).trigger('docview-mode-changed')
  }
})

export default ModeInspect
