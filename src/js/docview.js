var Docview = (function () {
  function Class(conf) {
    var init = conf.init || function () {};
    delete conf.init;

    var parent = conf.parent || function () {};
    delete conf.parent;

    var F = function () {};
    F.prototype = parent.prototype;
    var f = new F();
    for (var fn in conf) f[fn] = conf[fn];
    init.prototype = f;

    return init;
  };

  var Docview = new Class({
    init: function (params) {
      var defaultParams = {
        theme: 'classic',
        translation: {
          grid: 'Grid',
          filmstrip: 'Filmstrip',
          inspect: 'Inspect',
          flipBook: 'Flip-book',
          fullscreen: 'Fullscreen',
          zoomOut: 'Zoom out',
          zoomIn: 'Zoom in',
          dimTheLights: 'Dim the lights',
          prevPage: 'Previous page',
          nextPage: 'Next page',
          rotateLeft: 'Rotate left',
          rotateRight: 'Rotate right',
          viewDetails: 'View details'
        },
        index: 0,
        mode: 'grid',
        zoom: 0,
        maxZoom: 0
      }

      params = $.extend(true, defaultParams, params);

      this.buildDom(params);
      this.bindEvents(params);
      this.initializeModes(params);
      this.activateMode(params);
    },

    buildDom: function (params) {
      var t = params.translation;

      html =
        "<div class='docview " + params.theme + "'>" +
          "<div class='toolbar'>" +
            "<div class='modes'>" +
              "<a class='grid' title='" + t.grid + "'></a>" +
              "<a class='filmstrip' title='" + t.filmstrip + "'></a>" +
              "<a class='inspect' title='" + t.inspect + "'></a>" +
              "<a class='flip-book' title='" + t.flipBook + "'></a>" +
            "</div>" +
            "<div class='delimiter'></div>" +
            "<a class='fullscreen' title='" + t.fullscreen + "'></a>" +
            "<div class='delimiter'></div>" +
            "<div class='zoom'>" +
              "<a class='zoom-out' title='" + t.zoomOut + "'></a>" +
              "<a class='zoom-in' title='" + t.zoomIn + "'></a>" +
            "</div>" +
            "<div class='delimiter'></div>" +
            "<a class='dim' title='" + t.dimTheLights + "'></a>" +
            "<div class='delimiter'></div>" +
            "<div class='paginator'>" +
              "<a class='prev' title='" + t.prevPage + "'></a>" +
              "<input class='cur' type='text'>" +
              "<a class='next' title='" + t.nextPage + "'></a>" +
              "<span>&ndash; &ndash; &ndash; &ndash; &ndash; &ndash; &ndash; &ndash;</span>" +
            "</div>" +
            "<div class='delimiter'></div>" +
            "<div class='rotator'>" +
              "<a class='left' title='" + t.rotatLeft + "'></a>" +
              "<a class='right' title='" + t.rotateRight + "'></a>" +
              "<span>&ndash; &ndash; &ndash; &ndash;</span>" +
            "</div>" +
          "</div>" +
          "<div class='wrapper'>" +
            "<div class='viewport'>" +
              "<div class='wrapper'>" +
                "htmlPages" +
                "<a class='view-details'>" + t.viewDetails + "</a>" +
                "<div class='clear'></div>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>";

      htmlPages = '';

      for (var i = 0, l = params.pages.length; i < l; i += 1) {
        htmlPages +=
          "<div class='page' id='page-" + params.pages[i].id + "'>" +
            "<img src='' oncontextmenu='return false' title='' alt=''>" +
          "</div>";
      }

      html = html.replace('htmlPages', htmlPages);

      params.div.html(html);

      this.dom = {
        docview: $('.docview'),
        toolbar: $('.docview .toolbar'),
        modes: $('.docview .toolbar .modes a'),
        fullscreen: $('.docview .toolbar .fullscreen'),
        zoomIn: $('.docview .toolbar .zoom-in'),
        zoomOut: $('.docview .toolbar .zoom-out'),
        dim: $('.docview .toolbar .dim'),
        prev: $('.docview .toolbar .paginator .prev'),
        cur: $('.docview .toolbar .paginator .cur'),
        next: $('.docview .toolbar .paginator .next'),
        rotateLeft: $('.docview .toolbar .rotator .left'),
        rotateRight: $('.docview .toolbar .rotator .right'),
        viewport: $('.viewport'),
        wrapper: $('.viewport .wrapper'),
        pages: $('.viewport .page'),
        images: $('.viewport .page img'),
        viewDetails: $('.viewport .view-details'),
        env: params.env
      };

      this.dom.docview.find('*:not(input)')
        .attr('unselectable', 'on')
        .css('user-select', 'none')
        .on('selectstart', false);
    },

    bindEvents: function(params) {
      this.bindCommonEvents();
      this.bindToolbarEvents();
      this.bindModeEvents();
    },

    bindCommonEvents: function () {
      var self = this;

      $(window).scroll(function () {
        self.moveToolbar();
      });

      // trick for case of zooming

      setInterval(function () {
        self.mode.load();
      }, 2000);
    },

    bindToolbarEvents: function () {
      var self = this;

      this.dom.modes.click(function (e) {
        e.preventDefault();
        self.changeMode($(this).attr('class'));
      });

      var visibility = true;

      this.dom.fullscreen.click(function(e) {
        e.preventDefault();
        (visibility = !visibility) ? self.dom.env.show() : self.dom.env.hide();
      });

      this.dom.zoomIn.click(function (e) {
        e.preventDefault();
        self.mode.zoomIn();
      });

      this.dom.zoomOut.click(function (e) {
        e.preventDefault();
        self.mode.zoomOut();
      });

      this.dom.dim.click(function (e) {
        e.preventDefault();
        $('body').toggleClass('dark');
      });

      this.dom.prev.click(function(e) {
        e.preventDefault();
        self.mode.prev();
      });

      this.dom.cur.change(function() {
        self.mode.setCurPage(parseInt($(this).val()) - 1);
      });

      this.dom.next.click(function(e) {
        e.preventDefault();
        self.mode.next();
      });

      this.dom.rotateLeft.click(function(e) {
        e.preventDefault();
        self.mode.rotateLeft();
      });

      this.dom.rotateRight.click(function(e) {
        e.preventDefault();
        self.mode.rotateRight();
      });
    },

    bindModeEvents: function () {
      var self = this;

      $(window).bind({
        'docview-select-cur-page': function () {
          self.changeMode('inspect');
        },

        'docview-mode-changed': function () {
          // set mode class

          self.dom.docview
            .removeClass('grid filmstrip inspect flip-book')
            .addClass(self.mode.name);

          // set cur page

          if (self.mode.name == 'inspect') {
            self.dom.cur.val(self.mode.index + 1);
          } else if (self.mode.name == 'flip-book') {
            if (self.mode.index == 0) {
              self.dom.cur.val(1);
            } else {
              var index_1 = self.mode.index + (self.mode.index % 2);
              var index_2 = index_1 == self.mode.pages.length ? '' : ' - ' + (index_1 + 1);
              self.dom.cur.val(index_1 + index_2);
            }
          } else if (self.mode.name == 'filmstrip') {
            var first = self.mode.getFirstVisiblePage() + 1;
            var last = self.mode.getLastVisiblePage() + 1;
            self.dom.cur.val(first + ' - ' + last);
          }

          // set hash

          window.location.hash = [
            'page', self.mode.index + 1,
            'mode', self.mode.name,
            'zoom', self.mode.zoom + 1
          ].join('/');
        }
      });
    },

    initializeModes: function (params) {
      var data = {
        dom: {
          viewport: this.dom.viewport,
          wrapper: this.dom.wrapper,
          pages: this.dom.pages,
          images: this.dom.images,
          viewDetails: this.dom.viewDetails
        },

        pages: params.pages,
        zooms: params.zooms,
        maxZoom: params.maxZoom,
        pageUrl: params.pageUrl
      };

      this.modes = {
        'grid': new Docview.Mode.Grid(data),
        'filmstrip': new Docview.Mode.Filmstrip(data),
        'inspect': new Docview.Mode.Inspect(data),
        'flip-book': new Docview.Mode.FlipBook(data)
      };
    },

    activateMode: function (params) {
      var hash = window.location.hash;

      if (hash != '') {
        var mode = hash.match(/mode\/([\w-]+)/)[1];
        if (typeof this.modes[mode] == 'undefined') mode = 'grid';

        this.mode       = this.modes[mode];
        this.mode.index = parseInt(hash.match(/page\/(\d+)/)[1]) - 1;
        this.mode.zoom  = parseInt(hash.match(/zoom\/(\d+)/)[1]) - 1;
      } else {
        this.mode       = this.modes[params.mode];
        this.mode.index = params.index;
        this.mode.zoom  = params.zoom;
      }

      this.mode.activate();
    },

    changeMode: function (name) {
      switch (name) {
        case 'grid':
          this.modes[name].zoom = 0;
          break;
        case 'filmstrip':
          this.modes[name].zoom = 1;
          break;
        case 'inspect':
          this.modes[name].zoom = 3;
          break;
        case 'flip-book':
          this.modes[name].zoom = 2;
          break;
      }

      var index = this.mode.index;
      this.mode.deactivate();
      this.mode = this.modes[name];
      this.mode.index = index;
      this.mode.activate();

      this.moveToolbar();
    },

    moveToolbar: function () {
      if ($(window).scrollTop() > this.dom.docview.offset().top) {
        this.dom.toolbar.css({ 'position': 'fixed' });
      } else {
        this.dom.toolbar.css({ 'position': 'relative' });
      }
    }
  });

  Docview.Class = Class;

  return Docview;
})();

