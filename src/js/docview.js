import '../css/docview.css'
import '../img/docview.png'

import ModeGrid from './mode_grid'
import ModeInspect from './mode_inspect'
import ModeFlipBook from './mode_flipbook'
import ModeFilmstrip from './mode_filmstrip'

window.Docview = class Docview {
  constructor(params) {
    params = $.extend(true, {
      div: null,
      translation: {
        grid: 'Grid',
        filmstrip: 'Filmstrip',
        inspect: 'Inspect',
        flipbook: 'Flip-Book',
        fullscreen: 'Fullscreen',
        zoomOut: 'Zoom Out',
        zoomIn: 'Zoom In',
        dim: 'Dim',
        prevPage: 'Previous Page',
        nextPage: 'Next Page',
        rotateLeft: 'Rotate Left',
        rotateRight: 'Rotate Right',
        download: 'Download',
        print: 'Print'
      },
      zooms: null,
      pages: null,
      pageUrl: null,
      mode: 'grid',
      index: 0,
      zoom: 0,
      addons: ''
    }, params)

    this.buildDom(params)
    this.bindEvents(params)
    this.initializeModes(params)
    this.activateMode(params)
  }

  buildDom(params) {
    let t = params.translation

    let html = `
      <div class="dv">
        <div class="dv-toolbar dv-clear">
          <div class="dv-panel">
            <div class="dv-modes">
              <a class="dv-grid" title="${t.grid}"></a>
              <a class="dv-filmstrip" title="${t.filmstrip}"></a>
              <a class="dv-inspect" title="${t.inspect}"></a>
              <a class="dv-flipbook" title="${t.flipbook}"></a>
            </div>
            <div class="dv-dash"></div>
            <a class="dv-fullscreen" title="${t.fullscreen}"></a>
            <div class="dv-dash"></div>
            <div class="dv-zoom">
              <a class="dv-zoom-out" title="${t.zoomOut}"></a>
              <a class="dv-zoom-in" title="${t.zoomIn}"></a>
            </div>
            <div class="dv-dash"></div>
            <a class="dv-dim" title="${t.dim}"></a>
            <div class="dv-dash dv-dash-dim"></div>
            <div class="dv-paginator">
              <a class="dv-prev" title="${t.prevPage}"></a>
              <input class="dv-cur" type="text">
              <a class="dv-next" title="${t.nextPage}"></a>
            </div>
            <div class="dv-dash dv-dash-paginator"></div>
            <div class="dv-rotator">
              <a class="dv-rotate-left" title="${t.rotateLeft}"></a>
              <a class="dv-rotate-right" title="${t.rotateRight}"></a>
            </div>
            <div class="dv-dash dv-dash-rotator"></div>
            <a class="dv-download" title="${t.download}" target="_blank" download></a>
            <a class="dv-print" title="${t.print}"></a>
          </div>
          <div class="dv-addons">${(params.addons)}</div>
        </div>
        <div class="dv-viewport-outter">
          <div class="dv-viewport">
            <div class="dv-viewport-inner dv-clear">
              ${params.pages.map(page =>
                `<div class="dv-page dv-page-${page.id}">
                  <img src="" title="" alt="" oncontextmenu="return false">
                </div>`
              ).join('')}
            </div>
          </div>
        </div>
      </div>`

    let dv = $(html).appendTo(params.div)

    this.dom = {
      dv: dv,
      toolbar: dv.find('.dv-toolbar'),
      modes: dv.find('.dv-modes a'),
      fullscreen: dv.find('.dv-fullscreen'),
      zoomIn: dv.find('.dv-zoom-in'),
      zoomOut: dv.find('.dv-zoom-out'),
      dim: dv.find('.dv-dim'),
      prev: dv.find('.dv-prev'),
      next: dv.find('.dv-next'),
      cur: dv.find('.dv-cur'),
      rotateLeft: dv.find('.dv-rotate-left'),
      rotateRight: dv.find('.dv-rotate-right'),
      download: dv.find('.dv-download'),
      print: dv.find('.dv-print'),
      viewport: dv.find('.dv-viewport'),
      wrapper: dv.find('.dv-viewport-inner'),
      pages: dv.find('.dv-page'),
      images: dv.find('.dv-page img')
    }
  }

  bindEvents() {
    this.bindCommonEvents()
    this.bindToolbarEvents()
    this.bindModeEvents()
  }

  bindCommonEvents() {
    $(window).scroll(() => this.moveToolbar())
    setInterval(() => this.mode.load(), 2000) // for zoom
  }

  bindToolbarEvents() {
    let self = this

    this.dom.modes.click(function(e) {
      e.preventDefault()
      self.changeMode($(this).attr('class').split('-')[1])
    })

    let fullscreen = false
    let dv = this.dom.dv
    let div = dv.parent()

    this.dom.fullscreen.click(function(e) {
      e.preventDefault()

      if (fullscreen) {
        $('body > *').each(function() {
          $(this).css('display', $(this).data('dv-cache'))
          $(this).removeData('dv-cache')
        })

        dv.appendTo(div)
      } else {
        $('body > *').each(function() {
          $(this).data('dv-cache', $(this).css('display'))
          $(this).css('display', 'none')
        })

        dv.appendTo('body').show()
      }

      fullscreen = !fullscreen
    })

    this.dom.zoomIn.click(e => {
      e.preventDefault()
      this.mode.zoomIn()
    })

    this.dom.zoomOut.click(e => {
      e.preventDefault()
      this.mode.zoomOut()
    })

    this.dom.dim.click(e => {
      e.preventDefault()
      $(window).trigger('dv-dim')
    })

    this.dom.prev.click(e => {
      e.preventDefault()
      this.mode.prev()
    })

    this.dom.next.click(e => {
      e.preventDefault()
      this.mode.next()
    })

    this.dom.cur.focus(function() {
      $(this).val('')
    })

    this.dom.cur.focusout(() => {
      $(window).trigger('dv-change')
    })

    this.dom.cur.change(function () {
      let index = parseInt($(this).val()) - 1
      if (!isNaN(index)) self.mode.changeIndex(index)
    })

    this.dom.rotateLeft.click(e => {
      e.preventDefault()
      this.mode.rotateLeft()
    })

    this.dom.rotateRight.click(e => {
      e.preventDefault()
      this.mode.rotateRight()
    })

    this.dom.download.click(function() {
      $(this).attr('href', self.mode.downloadUrl)
    })

    this.dom.print.click(e => {
      e.preventDefault()
      let w = window.open(this.mode.downloadUrl)
      $(w).ready(() => w.print())
    })
  }

  bindModeEvents() {
    $(window).bind({
      'dv-inspect': () => this.changeMode('inspect'),

      'dv-change': () => {
        let dom = this.dom
        let mode = this.mode
        let name = Object.keys(this.modes).find(k => this.modes[k] == mode)

        // set class

        dom.dv
          .removeClass('dv-grid-mode dv-filmstrip-mode dv-inspect-mode dv-flipbook-mode')
          .addClass(`dv-${name}-mode`)

        // set page

        let cur = dom.cur

        if (name == 'inspect') {
          cur.val(mode.index + 1)
        } else if (name == 'flipbook') {
          if (mode.index == 0) {
            cur.val(1)
          } else {
            let index_1 = mode.realIndex + 1
            let index_2 = index_1 == mode.pages.length ? '' : ' - ' + (index_1 + 1)
            cur.val(index_1 + index_2)
          }
        } else if (name == 'filmstrip') {
          let index_1 = mode.firstIndex + 1
          let index_2 = index_1 == mode.pages.length ? '' : ' - ' + (mode.lastIndex + 1)
          cur.val(index_1 + index_2)
        }

        cur.val(`${cur.val()} / ${mode.pages.length}`)

        // set hash

        window.location.hash = `mode/${name}/page/${mode.index + 1}/zoom/${mode.zoom + 1}`
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

      zooms: params.zooms,
      pages: params.pages,
      pageUrl: params.pageUrl
    }

    this.modes = {
      'grid': new ModeGrid(data),
      'filmstrip': new ModeFilmstrip(data),
      'inspect': new ModeInspect(data),
      'flipbook': new ModeFlipBook(data)
    }
  }

  activateMode(params) {
    let hash = window.location.hash
    let name, index, zoom

    if (hash != '') {
      name = hash.match(/mode\/([\w-]+)/)[1]
      index = parseInt(hash.match(/page\/(\d+)/)[1]) - 1
      zoom  = parseInt(hash.match(/zoom\/(\d+)/)[1]) - 1
    } else {
      name = params.mode
      index = params.index
      zoom = params.zoom
    }

    this.mode = this.modes[name]
    this.mode.activate(index, zoom)
  }

  changeMode(name) {
    let index = this.mode.index
    let zoom = {'grid': 0, 'filmstrip': 1, 'inspect': 3, 'flipbook': 2}[name]

    this.mode.deactivate()
    this.mode = this.modes[name]
    this.mode.activate(index, zoom, true)

    this.moveToolbar()
  }

  moveToolbar() {
    let scroll = $(window).scrollTop()
    let offset = this.dom.dv.offset().top
    let height = this.dom.dv.height()

    if (scroll > offset && scroll < offset + height) {
      this.dom.dv.css('padding-top', this.dom.toolbar.outerHeight(true))
      this.dom.toolbar.css({'position': 'fixed'})
    } else {
      this.dom.dv.css('padding-top', 0)
      this.dom.toolbar.css({'position': 'relative'})
    }
  }
}
