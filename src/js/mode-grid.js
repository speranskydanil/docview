Docview.Mode.Grid = new Docview.Class({
  parent: Docview.Mode,

  init: function(params) {
    this.configurate(params);
    this.name = 'grid';
    this.queue = new Docview.Queue();
  },

  activate: function(switching) {
    this.setValidZoom();

    var self = this;

    $(window).bind('scroll.docview-grid', function() {
      self.queue.clear();
      self.load();
    });

    for (var i in this.pages) {
      (function(page) {
        page.obj.click(function() {
          self.selectCurPage(page.index);
          $(window).trigger('docview-select-cur-page');
        });
      })(this.pages[i]);
    }

    this.curPage().obj.addClass('current');
    this.redraw();

    if (switching) {
      $(window).scrollTop(this.curPage().obj.offset().top - 5);
    }
  },

  deactivate: function() {
    this.queue.clear();

    $(window).unbind('scroll.docview-grid');
    this.dom.pages.unbind('click');

    this.curPage().obj.removeClass('current');
  },

  zoomIn: function() {
    if (!this.canZoom()) {
      $(window).trigger('docview-access-denied');
      return;
    }

    if (this.zoom < this.zoomMax) {
      this.incZoom();
      this.redraw();
    }
  },

  zoomOut: function() {
    if (this.zoom > this.zoomMin) {
      this.decZoom();
      this.redraw();
    }
  },

  selectCurPage: function(index) {
    if (index < 0) index = 0;
    if (index > this.pages.length - 1) index = this.pages.length - 1;

    if (this.index != index) {
      this.curPage().obj.removeClass('current');
      this.index = index;
      this.curPage().obj.addClass('current');
    }
  },

  redraw: function() {
    this.queue.clear();
    this.resizePages();
    this.load();
  },

  load: function() {
    var win = $(window);

    var pageHeight = this.pageHeightWithIndent();
    var pagesInRow = Math.floor(this.dom.viewport.width() / this.pageWidthWithIndent());

    var viewport = {
      top: win.scrollTop() - this.dom.viewport.offset().top
    };

    viewport.bottom = viewport.top + win.height();

    var threshold = {
      top: 3 * pageHeight,
      bottom: 3 * pageHeight
    };

    // add to queue active pages and next ones

    var border1 = {
      top: viewport.top,
      bottom: viewport.bottom + threshold.bottom
    };

    var firstRow1 = Math.floor(border1.top / pageHeight);
    var firstPage1 = Math.min(Math.max(0, firstRow1 * pagesInRow), this.pages.length);

    var lastRow1 = Math.floor(border1.bottom / pageHeight);
    var lastPage1 = Math.min((lastRow1 + 1) * pagesInRow, this.pages.length);

    for (var i = firstPage1; i < lastPage1; i += 1) {
      this.queue.addPage(this.pages[i], this.zoom);
    }

    // add to queue previous pages

    var border2 = {
      top: viewport.top - threshold.top,
      bottom: viewport.top
    };

    var firstRow2 = Math.floor(border2.top / pageHeight);
    var firstPage2 = Math.min(Math.max(0, firstRow2 * pagesInRow), this.pages.length);

    for (var i = firstPage1 - 1; i >= firstPage2; i -= 1) {
      this.queue.addPage(this.pages[i], this.zoom);
    }
  }
});

$.each(['activate', 'zoomIn', 'zoomOut'], function(i, name) {
  var func = Docview.Mode.Grid.prototype[name];

  Docview.Mode.Grid.prototype[name] = function() {
    func.apply(this, arguments);
    $(window).trigger('docview-mode-changed');
  };
});

