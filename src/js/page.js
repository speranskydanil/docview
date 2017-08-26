export default class Page {
  constructor(params) {
    Object.assign(this, params)
    this.ratio = this.h / this.w
    this.obj = $('#page-' + this.id)
    this.img = this.obj.find('img')
  }

  url(zoom) {
    if (zoom == undefined) {
      return this.img.prop('src')
    } else {
      return this.schema(this.id, zoom)
    }
  }

  load(zoom, callback) {
    if (this.url() == this.url(zoom)) return setTimeout(callback)

    if (this.url() == '') {
      return this.img.on('load', callback).prop('src', this.url(zoom))
    }

    var self = this

    $('<img>').on('load', function() {
      self.img.prop('src', $(this).prop('src'))
      callback()
    }).prop('src', this.url(zoom))
  }
}
