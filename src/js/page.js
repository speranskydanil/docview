export default class Page {
  constructor(params) {
    Object.assign(this, params)
    this.ratio = this.h / this.w
    this.div = $(`#dv-page-${this.id}`)
    this.img = this.div.find('img')
    this.index = this.div.parent().children().index(this.div)
  }

  url(zoom) {
    return zoom == undefined ? this.img.attr('src') : Page.url(this.id, zoom)
  }

  load(zoom, callback) {
    if (this.url() == '') return this.img.on('load', callback).attr('src', this.url(zoom))

    var self = this

    $('<img>').on('load', function() {
      self.img.attr('src', $(this).attr('src'))
      callback()
    }).attr('src', this.url(zoom))
  }
}
