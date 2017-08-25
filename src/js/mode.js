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

    this.zoomNums = $.map(this.zooms, function(v, k) { return parseInt(k); })
                     .sort(function(a, b) { return a - b; })

    this.zoomMin = this.zoomNums[0]
    this.zoomMax = this.zoomNums.slice(-1)[0]
  }

  setValidZoom() {
    var self = this

    var zooms = $.grep(this.zoomNums, function(v) { return v <= self.maxZoom; })

    var difs = $.map(zooms, function(v) { return Math.abs(self.zoom - v); })

    this.zoom = this.zoomNums[difs.indexOf(Math.min.apply(Math, difs))]
  }

  canZoom() {
    return (this.incrementedZoom() || this.zoom) <= this.maxZoom
  }

  incZoom() {
    this.zoom = this.incrementedZoom()
  }

  incrementedZoom() {
    return this.zoomNums[this.zoomNums.indexOf(this.zoom) + 1]
  }

  decZoom() {
    this.zoom = this.decrementedZoom()
  }

  decrementedZoom() {
    return this.zoomNums[this.zoomNums.indexOf(this.zoom) - 1]
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
    var self = this
    var zoom = $.grep(this.zoomNums, function(v) { return v <= self.maxZoom; }).slice(-1)[0]

    return this.curPage().downloadUrl || this.curPage().url(zoom)
  }
}
