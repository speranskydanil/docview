Docview.Page = new Docview.Class({
  init: function (params) {
    for (var i in params) this[i] = params[i];

    this.ratio = this.h / this.w;

    this.obj = $('#page-' + this.id);
    this.img = this.obj.find('img');
  },

  url: function (zoom) {
    if (zoom == undefined) {
      return this.img.attr('src');
    } else {
      return Docview.Page.url(this.id, zoom);
    }
  },

  load: function (type, zoom, callback) {
    if (type == 'fast') {
      this.img.bind('load', callback).attr('src', this.url(zoom));
    } else {
      var self = this;

      $('<img>').bind('load', function() {
        self.img.attr('src', $(this).attr('src'));
        callback();
      }).attr('src', this.url(zoom));
    }
  }
});

