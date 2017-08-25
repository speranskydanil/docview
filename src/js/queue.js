Docview.Queue = new Docview.Class({
  init: function() {
    this.fastQueue = {
      objs: [],
      thread: 0
    };

    this.slowQueue = {
      objs: [],
      thread: 0
    };
  },

  clear: function() {
    this.fastQueue.objs = [];
    this.slowQueue.objs = [];
  },

  addPage: function(page, zoom) {
    if (page.url() == page.url(zoom)) return;

    for (var i in this.slowQueue.objs) {
      if (this.slowQueue.objs[i].page.id == page.id) return;
    }

    if (page.url() == '') {
      this.fastQueue.objs.push({ page: page, zoom: 0 });
      this.load('fast');
    }

    this.slowQueue.objs.push({ page: page, zoom: zoom });
    this.load('slow');
  },

  load: function(type) {
    var queue = this[type + 'Queue'];

    if (queue.objs.length == 0 ||
        queue.thread == this.getMaxThread(type)) return;

    var obj = queue.objs.shift();
    queue.thread += 1;

    var self = this;

    obj.page.load(type, obj.zoom, function() {
      queue.thread -= 1;
      self.load(type);
    });
  },

  getMaxThread: function(type) {
    var queue = this[type + 'Queue'];

    switch (queue.objs[queue.objs.length - 1].zoom) {
      case 0:
        return 8;
      case 1:
        return 6;
      case 2:
        return 4;
      default:
        return 2;
    }
  }
});

