import Page from './page'
import PageDownloadQueue from './page_download_queue'

export default class Mode {
  constructor(params) {
    this.dom = params.dom

    this.pages = params.pages.map(p => new Page(p, this.dom.viewport))
    Page.url = params.pageUrl

    this.zooms = params.zooms

    this.queue = new PageDownloadQueue()

    this.index = 0
    this.zoom = 0

    for (let name of ['activate', 'zoomIn', 'zoomOut', 'prev', 'setCurPage', 'next']) {
      let func = this[name]

      this[name] = function(...args) {
        func.apply(this, args)
        $(window).trigger('dv_change')
      }
    }
  }

  activate(index, zoom) {
    this.index = Math.min(index, this.pages.length - 1)
    this.zoom = Math.min(zoom, this.zooms.length - 1)
  }

  deactivate() {
    this.queue.clear()
  }

  scroll() {
    $(window).scrollTop(this.page.div.offset().top - 5)
  }

  resizePages() {
    this.dom.pages.css({width: this.pageWidth, height: this.pageHeight})
    this.dom.images.css('width', this.pageWidth)
  }

  get pageWidth() {
    return this.zooms[this.zoom]
  }

  get pageWidthWithIndent() {
    return this.pageWidth + 7
  }

  get pageHeight() {
    this.maxRatio = this.maxRatio || Math.max(...this.pages.map(page => page.ratio))
    return Math.ceil(this.maxRatio * this.pageWidth)
  }

  get pageHeightWithIndent() {
    return this.pageHeight + 7
  }

  get page() {
    return this.pages[this.index]
  }

  select(page) {
    this.page.div.removeClass('current')
    this.index = page.index
    this.page.div.addClass('current')
  }

  get downloadUrl() {
    return this.page.downloadUrl || this.page.url(this.zooms.length - 1)
  }
}
