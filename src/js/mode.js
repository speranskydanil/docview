import Page from './page'
import PageDownloadQueue from './page_download_queue'

export default class Mode {
  constructor(params) {
    this.dom     = params.dom
    this.zooms   = params.zooms
    this.maxZoom = params.maxZoom

    Page.url = params.pageUrl

    this.pages = params.pages.map(data => new Page(data))

    this.queue = new PageDownloadQueue()
  }

  setValidZoom() {
    this.zoom = Math.min(this.zoom, this.maxZoom)
  }

  resizePages() {
    this.dom.pages.css({
      width: this.pageWidth(),
      height: this.pageHeight()
    })

    this.dom.images.css('width', this.pageWidth())
  }

  pageWidth() {
    return this.zooms[this.zoom]
  }

  pageWidthWithIndent() {
    return this.pageWidth() + 7
  }

  pageHeight() {
    if (!this.cachedMaxPageRatio) {
      let pageRatio = 0

      for (let i in this.pages) {
        pageRatio = Math.max(pageRatio, this.pages[i].ratio)
      }

      this.cachedMaxPageRatio = pageRatio
    }

    return Math.ceil(this.cachedMaxPageRatio * this.pageWidth())
  }

  pageHeightWithIndent() {
    return this.pageHeight() + 7
  }

  curPage() {
    return this.pages[this.index]
  }

  downloadUrl() {
    return this.curPage().downloadUrl || this.curPage().url(this.maxZoom)
  }
}
