import ModeGrid from './mode_grid'
import ModeInspect from './mode_inspect'
import ModeFlipBook from './mode_flipbook'
import ModeFilmstrip from './mode_filmstrip'

window.Docview = class Docview {
  constructor(params) {
    let defaultParams = {
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
      zoom: 0
    }

    params = $.extend(true, defaultParams, params)

    this.buildDom(params)
    this.bindEvents(params)
    this.initializeModes(params)
    this.activateMode(params)
  }

  buildDom(params) {
    let t = params.translation

    let html = `
      <div class="docview ${params.theme}">
        <div class="toolbar-wrapper">
          <div class="toolbar">
            <div class="modes">
              <a class="grid" title="${t.grid}"></a>
              <a class="filmstrip" title="${t.filmstrip}"></a>
              <a class="inspect" title="${t.inspect}"></a>
              <a class="flip-book" title="${t.flipBook}"></a>
            </div>
            <div class="delimiter"></div>
            <a class="fullscreen" title="${t.fullscreen}"></a>
            <div class="delimiter"></div>
            <div class="zoom">
              <a class="zoom-out" title="${t.zoomOut}"></a>
              <a class="zoom-in" title="${t.zoomIn}"></a>
            </div>
            <div class="delimiter"></div>
            <a class="dim" title="${t.dimTheLights}"></a>
            <div class="delimiter delimiter-after-dim"></div>
            <div class="paginator">
              <a class="prev" title="${t.prevPage}"></a>
              <input class="cur" type="text">
              <a class="next" title="${t.nextPage}"></a>
            </div>
            <div class="delimiter delimiter-after-paginator"></div>
            <div class="rotator">
              <a class="left" title="${t.rotatLeft}"></a>
              <a class="right" title="${t.rotateRight}"></a>
            </div>
            <div class="delimiter delimiter-after-rotator"></div>
            <a class="download" title="${t.download}" target="_blank" download></a>
            <a class="print" title="${t.print}"></a>
          </div>
          <div class="toolbar-buttons">
            ${(params.buttons || "")}
          </div>
          <div class="clear"></div>
        </div>
        <div class="wrapper">
          <div class="viewport">
            <div class="wrapper">
              htmlPages
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </div>`

    let htmlPages = ''

    for (let page of params.pages) {
      htmlPages += `
        <div class="page dv-page-${page.id}">
          <img src="" oncontextmenu="return false" title="" alt="">
        </div>`
    }

    html = html.replace('htmlPages', htmlPages)

    let dv = $(params.div).html(html).find('.docview')

    this.dom = {
      docview: dv,
      toolbarWrapper: dv.find('.toolbar-wrapper'),
      modes: dv.find('.modes a'),
      fullscreen: dv.find('.fullscreen'),
      zoomIn: dv.find('.zoom-in'),
      zoomOut: dv.find('.zoom-out'),
      dim: dv.find('.dim'),
      prev: dv.find('.prev'),
      cur: dv.find('.cur'),
      next: dv.find('.next'),
      rotateLeft: dv.find('.left'),
      rotateRight: dv.find('.right'),
      download: dv.find('.download'),
      print: dv.find('.print'),
      viewport: dv.find('.viewport'),
      wrapper: dv.find('.viewport .wrapper'),
      pages: dv.find('.page'),
      images: dv.find('.page img')
    }

    this.dom.docview.find('*:not(input)')
      .attr('unselectable', 'on')
      .css('user-select', 'none')
      .on('selectstart', false)
  }

  bindEvents() {
    this.bindCommonEvents()
    this.bindToolbarEvents()
    this.bindModeEvents()
  }

  bindCommonEvents() {
    $(window).scroll(() => this.moveToolbar())

    // trick for case of zooming
    setInterval(() => this.mode.load(), 2000)
  }

  bindToolbarEvents() {
    let self = this

    this.dom.modes.click(function(e) {
      e.preventDefault()
      self.changeMode($(this).attr('class'))
    })

    let fullscreen = false
    let docview = this.dom.docview
    let parent = docview.parent()

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

    this.dom.zoomIn.click((e) => {
      e.preventDefault()
      this.mode.zoomIn()
    })

    this.dom.zoomOut.click((e) => {
      e.preventDefault()
      this.mode.zoomOut()
    })

    this.dom.dim.click((e) => {
      e.preventDefault()
      $('body').toggleClass('dark')
    })

    this.dom.prev.click((e) => {
      e.preventDefault()
      this.mode.prev()
    })

    this.dom.cur.focus(function() {
      $(this).val('')
    })

    this.dom.cur.focusout(() => {
      $(window).trigger('docview-mode-changed')
    })

    this.dom.cur.change(function () {
      self.mode.setCurPage(parseInt($(this).val()) - 1)
    })

    this.dom.next.click((e) => {
      e.preventDefault()
      this.mode.next()
    })

    this.dom.rotateLeft.click((e) => {
      e.preventDefault()
      this.mode.rotateLeft()
    })

    this.dom.rotateRight.click((e) => {
      e.preventDefault()
      this.mode.rotateRight()
    })

    this.dom.print.click((e) => {
      e.preventDefault()
      let w = window.open(this.mode.downloadUrl)
      $(w).ready(function() { w.print(); })
    })
  }

  bindModeEvents() {
    $(window).bind({
      'docview-select-cur-page': () => {
        this.changeMode('inspect')
      },

      'docview-mode-changed': () => {
        let dom = this.dom
        let mode = this.mode

        // set mode class

        dom.docview
          .removeClass('grid filmstrip inspect flip-book')
          .addClass(mode.name)

        // set cur page

        let cur = dom.cur

        if (mode.name == 'inspect') {
          cur.val(mode.index + 1)
          dom.download.attr('href', mode.downloadUrl)
        } else if (mode.name == 'flip-book') {
          if (mode.index == 0) {
            cur.val(1)
          } else {
            let index_1 = mode.index + (mode.index % 2)
            let index_2 = index_1 == mode.pages.length ? '' : ' - ' + (index_1 + 1)
            cur.val(index_1 + index_2)
          }
        } else if (mode.name == 'filmstrip') {
          let index_1 = mode.getFirstVisiblePage() + 1
          let index_2 = index_1 == mode.pages.length ? '' : ' - ' + Math.min(mode.getLastVisiblePage() + 1, mode.pages.length)
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
    let data = {
      dom: {
        viewport: this.dom.viewport,
        wrapper: this.dom.wrapper,
        pages: this.dom.pages,
        images: this.dom.images
      },

      pages: params.pages,
      zooms: params.zooms,
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
    let hash = window.location.hash

    let mode = null
    let index = null
    let zoom = null

    if (hash != '') {
      mode = hash.match(/mode\/([\w-]+)/)[1]
      index = parseInt(hash.match(/page\/(\d+)/)[1]) - 1
      zoom  = parseInt(hash.match(/zoom\/(\d+)/)[1]) - 1
    } else {
      mode = this.modes[params.mode]
      index = params.index
      zoom = params.zoom
    }

    this.mode = this.modes[mode]
    this.mode.activate(index, zoom)
  }

  changeMode(name) {
    let index = this.mode.index
    let zoom = {'grid': 0, 'filmstrip': 1, 'inspect': 3, 'flip-book': 2}[name]

    this.mode.deactivate()
    this.mode = this.modes[name]
    this.mode.activate(index, zoom, true)

    this.moveToolbar()
  }

  moveToolbar() {
    let scroll = $(window).scrollTop()
    let offset = this.dom.docview.offset().top
    let height = this.dom.docview.height()

    if (scroll > offset && scroll < offset + height) {
      this.dom.docview.css('padding-top', this.dom.toolbarWrapper.outerHeight(true))
      this.dom.toolbarWrapper.css({ 'position': 'fixed' })
    } else {
      this.dom.docview.css('padding-top', 0)
      this.dom.toolbarWrapper.css({ 'position': 'relative' })
    }
  }
}
