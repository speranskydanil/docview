import Class from './class.js'
import Page from './page.js'

export default new Class({
  configurate: function(params) {
    this.dom     = params.dom;
    this.zooms   = params.zooms;
    this.maxZoom = params.maxZoom;

    Page.prototype.schema = params.pageUrl;

    this.pages = $.map(params.pages, function(data, index) {
      return new Page({
        id: data.id,
        h: data.h,
        w: data.w,
        downloadUrl: data.downloadUrl,
        index: index
      });
    });

    this.zoomNums = $.map(this.zooms, function(v, k) { return parseInt(k); })
                     .sort(function(a, b) { return a - b; });

    this.zoomMin = this.zoomNums[0];
    this.zoomMax = this.zoomNums.slice(-1)[0];
  },

  setValidZoom: function() {
    var self = this;

    var zooms = $.grep(this.zoomNums, function(v) { return v <= self.maxZoom; });

    var difs = $.map(zooms, function(v) { return Math.abs(self.zoom - v); });

    this.zoom = this.zoomNums[difs.indexOf(Math.min.apply(Math, difs))];
  },

  canZoom: function() {
    return (this.incrementedZoom() || this.zoom) <= this.maxZoom;
  },

  incZoom: function() {
    this.zoom = this.incrementedZoom();
  },

  incrementedZoom: function() {
    return this.zoomNums[this.zoomNums.indexOf(this.zoom) + 1];
  },

  decZoom: function() {
    this.zoom = this.decrementedZoom();
  },

  decrementedZoom: function() {
    return this.zoomNums[this.zoomNums.indexOf(this.zoom) - 1];
  },

  resizePages: function() {
    this.dom.pages.css({
      width: this.pageWidth(),
      height: this.pageHeight()
    });

    this.dom.images.css('width', this.pageWidth());
  },

  pageWidth: function() {
    return this.zooms[this.zoom];
  },

  pageWidthWithIndent: function() {
    return this.pageWidth() + 7;
  },

  pageHeight: function() {
    if (!this.cachedMaxPageRatio) {
      var pageRatio = 0;

      for (var i in this.pages) {
        pageRatio = Math.max(pageRatio, this.pages[i].ratio);
      }

      this.cachedMaxPageRatio = pageRatio;
    }

    return Math.ceil(this.cachedMaxPageRatio * this.pageWidth());
  },

  pageHeightWithIndent: function() {
    return this.pageHeight() + 7;
  },

  curPage: function() {
    return this.pages[this.index];
  },

  downloadUrl: function() {
    var self = this;
    var zoom = $.grep(this.zoomNums, function(v) { return v <= self.maxZoom; }).slice(-1)[0];

    return this.curPage().downloadUrl || this.curPage().url(zoom);
  }
});
