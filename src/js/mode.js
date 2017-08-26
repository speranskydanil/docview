import Page from './page.js'

export default class Mode {
  configurate(params) {
    this.dom     = params.dom
    this.zooms   = params.zooms
    this.maxZoom = params.maxZoom

    Page.prototype.schema = params.pageUrl

    this.pages = $.map(params.pages, function(data, index) {
      return new Page({
        id: data.id,
        h: data.h,
        w: data.w,
        downloadUrl: data.downloadUrl,
        index: index
      })
    })
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
      var pageRatio = 0

      for (var i in this.pages) {
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
