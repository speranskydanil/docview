Docview.Mode.Inspect = new Docview.Class({
  parent: Docview.Mode,

  init: function (params) {
    this.configurate(params);
    this.name = 'inspect';
    this.queue = new Docview.Queue();
  },

  activate: function () {
    this.setValidZoom();

    this.dom.pages.hide();

    var self = this;
    for (var i in this.pages) this.pages[i].obj.click(function() { self.next(); });

    this.curPage().obj.show();

    this.dom.viewDetails.click(function () {
      window.location.replace('/pages/' + self.curPage().id + '/map');
    });

    this.dom.viewDetails.toggle(this.curPage().map == true);

    this.redraw();
  },

  deactivate: function () {
    this.queue.clear();

    this.dom.pages.unbind('click').show();
    this.dom.viewDetails.unbind('click').hide();

    this.dom.wrapper.css({ width: '100%', height: 'auto' });

    this.dom.images.rotate(0);

    this.dom.viewport.top_scrollbar(false);
  },

  zoomIn: function () {
    if (!this.canZoom()) {
      $(window).trigger('docview-access-denied');
      return;
    }

    if (this.zoom < this.zoomMax) {
      this.incZoom();
      this.redraw();
    }
  },

  zoomOut: function () {
    if (this.zoom > this.zoomMin) {
      this.decZoom();
      this.redraw();
    }
  },

  next: function () {
    this.setCurPage(this.index + 1);
  },

  prev: function () {
    this.setCurPage(this.index - 1);
  },

  rotateLeft: function () {
    var img = this.curPage().img;

    img.rotate({
      animateTo: Math.round(img.getRotateAngle() / 90) * 90 - 90,
      duration: 500
    });
  },

  rotateRight: function () {
    var img = this.curPage().img;

    img.rotate({
      animateTo: Math.round(img.getRotateAngle() / 90) * 90 + 90,
      duration: 500
    });
  },

  animationIsInProgress: false,

  setCurPage: function (index) {
    if (isNaN(index)) return;

    if (index < 0) index = 0;
    if (index > this.pages.length - 1) index = this.pages.length - 1;

    if (this.index != index) {
      if (this.animationIsInProgress) return;
      this.animationIsInProgress = true;

      var self = this;

      this.curPage().obj.fadeOut(100, function () {
        self.curPage().obj.fadeIn(100, function () {
          self.animationIsInProgress = false;
        });
      });

      this.index = index;

      this.dom.viewDetails.toggle(this.curPage().map == true);

      this.queue.clear();
      this.load();
    }
  },

  redraw: function () {
    this.queue.clear();
    this.resize();
    this.load();
  },

  resize: function () {
    this.resizePages();

    this.dom.wrapper.css({
      width: this.pageWidthWithIndent(),
      height: this.pageHeightWithIndent()
    });

    this.dom.viewport.top_scrollbar();
  },

  load: function () {
    this.queue.addPage(this.pages[this.index], this.zoom);

    var numberOfImagesOnRight = Math.min(4, this.pages.length - 1 - this.index);

    for (var i = 1; i <= numberOfImagesOnRight; i += 1) {
      this.queue.addPage(this.pages[this.index + i], this.zoom);
    }

    var numberOfImagesOnLeft = Math.min(4, this.index);

    for (var i = 1; i <= numberOfImagesOnLeft; i += 1) {
      this.queue.addPage(this.pages[this.index - i], this.zoom);
    }
  }
});

$.each(['activate', 'zoomIn', 'zoomOut', 'prev', 'setCurPage', 'next'], function (i, name) {
  var func = Docview.Mode.Inspect.prototype[name];

  Docview.Mode.Inspect.prototype[name] = function () {
    func.apply(this, arguments);
    $(window).trigger('docview-mode-changed');
  };
});

