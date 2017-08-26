import ModeGrid from './mode_grid'
import ModeInspect from './mode_inspect'
import ModeFlipBook from './mode_flipbook'
import ModeFilmstrip from './mode_filmstrip'

window.Docview = class Docview {
  constructor(params) {
    var defaultParams = {
      theme: 'standard',
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
        download: 'Download',
        print: 'Print'
      },
      index: 0,
      mode: 'grid',
      zoom: 0,
      maxZoom: 0
    }

    params = $.extend(true, defaultParams, params)

    this.buildDom(params)
    this.bindEvents(params)
    this.initializeModes(params)
    this.activateMode(params)
  }

  buildDom(params) {
    var t = params.translation

    var html =
      "<div class='docview " + params.theme + "'>" +
        "<div class='toolbar-wrapper'>" +
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
            "<div class='delimiter delimiter-after-dim'></div>" +
            "<div class='paginator'>" +
              "<a class='prev' title='" + t.prevPage + "'></a>" +
              "<input class='cur' type='text'>" +
              "<a class='next' title='" + t.nextPage + "'></a>" +
            "</div>" +
            "<div class='delimiter delimiter-after-paginator'></div>" +
            "<div class='rotator'>" +
              "<a class='left' title='" + t.rotatLeft + "'></a>" +
              "<a class='right' title='" + t.rotateRight + "'></a>" +
            "</div>" +
            "<div class='delimiter delimiter-after-rotator'></div>" +
            "<a class='download' title='" + t.download + "' target='_blank' download></a>" +
            "<a class='print' title='" + t.print + "'></a>" +
          "</div>" +
          "<div class='toolbar-buttons'>" +
            (params.buttons || '') +
          "</div>" +
          "<div class='clear'></div>" +
        "</div>" +
        "<div class='wrapper'>" +
          "<div class='viewport'>" +
            "<div class='wrapper'>" +
              "htmlPages" +
              "<div class='clear'></div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>"

    var htmlPages = ''

    for (var i = 0, l = params.pages.length; i < l; i += 1) {
      htmlPages +=
        "<div class='page' id='dv-page-" + params.pages[i].id + "'>" +
          "<img src='' oncontextmenu='return false' title='' alt=''>" +
        "</div>"
    }

    html = html.replace('htmlPages', htmlPages)

    params.div.html(html)

    this.dom = {
      docview: $('.docview'),
      toolbarWrapper: $('.docview .toolbar-wrapper'),
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
      download: $('.docview .toolbar .download'),
      print: $('.docview .toolbar .print'),
      toolbarButtons: $('.docview .toolbar-buttons'),
      viewport: $('.viewport'),
      wrapper: $('.viewport .wrapper'),
      pages: $('.viewport .page'),
      images: $('.viewport .page img')
    }

    this.dom.docview.find('*:not(input)')
      .attr('unselectable', 'on')
      .css('user-select', 'none')
      .on('selectstart', false)
  }

  bindEvents(params) {
    this.bindCommonEvents()
    this.bindToolbarEvents()
    this.bindModeEvents()
  }

  bindCommonEvents() {
    var self = this

    $(window).scroll(function() {
      self.moveToolbar()
    })

    // trick for case of zooming

    setInterval(function() {
      self.mode.load()
    }, 2000)
  }

  bindToolbarEvents() {
    var self = this

    this.dom.modes.click(function(e) {
      e.preventDefault()
      self.changeMode($(this).attr('class'))
    })

    var fullscreen = false
    var docview = this.dom.docview
    var parent = docview.parent()

    this.dom.fullscreen.click(function(e) {
      e.preventDefault()

      if (!fullscreen) {
        $('body > *').each(function() {
          $(this).data('docview-display-cache', $(this).css('display'))
          $(this).css('display', 'none')
        })
        docview.appendTo('body').show()
      } else {
        $('body > *').each(function() {
          $(this).css('display', $(this).data('docview-display-cache'))
          $(this).removeData('docview-display-cache')
        })
        docview.appendTo(parent)
      }

      fullscreen = !fullscreen
    })

    this.dom.zoomIn.click(function(e) {
      e.preventDefault()
      self.mode.zoomIn()
    })

    this.dom.zoomOut.click(function(e) {
      e.preventDefault()
      self.mode.zoomOut()
    })

    this.dom.dim.click(function(e) {
      e.preventDefault()
      $('body').toggleClass('dark')
    })

    this.dom.prev.click(function(e) {
      e.preventDefault()
      self.mode.prev()
    })

    this.dom.cur.focus(function() {
      $(this).val('')
    })

    this.dom.cur.focusout(function() {
      $(window).trigger('docview-mode-changed')
    })

    this.dom.cur.change(function() {
      self.mode.setCurPage(parseInt($(this).val()) - 1)
    })

    this.dom.next.click(function(e) {
      e.preventDefault()
      self.mode.next()
    })

    this.dom.rotateLeft.click(function(e) {
      e.preventDefault()
      self.mode.rotateLeft()
    })

    this.dom.rotateRight.click(function(e) {
      e.preventDefault()
      self.mode.rotateRight()
    })

    this.dom.print.click(function(e) {
      e.preventDefault()
      var w = window.open(self.mode.downloadUrl())
      $(w).ready(function() { w.print(); })
    })
  }

  bindModeEvents() {
    var self = this

    $(window).bind({
      'docview-select-cur-page': function() {
        self.changeMode('inspect')
      },

      'docview-mode-changed': function() {
        var dom = self.dom
        var mode = self.mode

        // set mode class

        dom.docview
          .removeClass('grid filmstrip inspect flip-book')
          .addClass(mode.name)

        // set cur page

        var cur = dom.cur

        if (mode.name == 'inspect') {
          cur.val(mode.index + 1)
          dom.download.attr('href', mode.downloadUrl())
        } else if (mode.name == 'flip-book') {
          if (mode.index == 0) {
            cur.val(1)
          } else {
            var index_1 = mode.index + (mode.index % 2)
            var index_2 = index_1 == mode.pages.length ? '' : ' - ' + (index_1 + 1)
            cur.val(index_1 + index_2)
          }
        } else if (mode.name == 'filmstrip') {
          var index_1 = mode.getFirstVisiblePage() + 1
          var index_2 = index_1 == mode.pages.length ? '' : ' - ' + Math.min(mode.getLastVisiblePage() + 1, mode.pages.length)
          cur.val(index_1 + index_2)
        }

        cur.val(cur.val() + ' / ' + mode.pages.length)

        // set hash

        window.location.hash = [
          'page', mode.index + 1,
          'mode', mode.name,
          'zoom', mode.zoom + 1
        ].join('/')
      }
    })
  }

  initializeModes(params) {
    var data = {
      dom: {
        viewport: this.dom.viewport,
        wrapper: this.dom.wrapper,
        pages: this.dom.pages,
        images: this.dom.images
      },

      pages: params.pages,
      zooms: params.zooms,
      maxZoom: params.maxZoom,
      pageUrl: params.pageUrl
    }

    this.modes = {
      'grid': new ModeGrid(data),
      'filmstrip': new ModeFilmstrip(data),
      'inspect': new ModeInspect(data),
      'flip-book': new ModeFlipBook(data)
    }
  }

  activateMode(params) {
    var hash = window.location.hash

    if (hash != '') {
      var mode = hash.match(/mode\/([\w-]+)/)[1]
      if (typeof this.modes[mode] == 'undefined') mode = 'grid'

      this.mode       = this.modes[mode]
      this.mode.index = parseInt(hash.match(/page\/(\d+)/)[1]) - 1
      this.mode.zoom  = parseInt(hash.match(/zoom\/(\d+)/)[1]) - 1
    } else {
      this.mode       = this.modes[params.mode]
      this.mode.index = params.index
      this.mode.zoom  = params.zoom
    }

    this.mode.activate()
  }

  changeMode(name) {
    switch (name) {
      case 'grid':
        this.modes[name].zoom = 0
        break
      case 'filmstrip':
        this.modes[name].zoom = 1
        break
      case 'inspect':
        this.modes[name].zoom = 3
        break
      case 'flip-book':
        this.modes[name].zoom = 2
        break
    }

    var index = this.mode.index
    this.mode.deactivate()
    this.mode = this.modes[name]
    this.mode.index = index
    this.mode.activate(true)

    this.moveToolbar()
  }

  moveToolbar() {
    var scroll = $(window).scrollTop()
    var offset = this.dom.docview.offset().top
    var height = this.dom.docview.height()

    if (scroll > offset && scroll < offset + height) {
      this.dom.docview.css('padding-top', this.dom.toolbarWrapper.outerHeight(true))
      this.dom.toolbarWrapper.css({ 'position': 'fixed' })
    } else {
      this.dom.docview.css('padding-top', 0)
      this.dom.toolbarWrapper.css({ 'position': 'relative' })
    }
  }
}
