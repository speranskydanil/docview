export default class Page {
  constructor(params) {
    Object.assign(this, params)
    this.ratio = this.h / this.w
    this.obj = $('#page-' + this.id)
    this.img = this.obj.find('img')
  }

  url(zoom) {
    if (zoom == undefined) {
      return this.img.attr('src')
    } else {
      return this.schema(this.id, zoom)
    }
  }

  load(type, zoom, callback) {
    if (type == 'fast') {
      return this.img.bind('load', callback).attr('src', this.url(zoom))
    }

    var self = this

    $('<img>').bind('load', function() {
      self.img.attr('src', $(this).attr('src'))
      callback()
    }).attr('src', this.url(zoom))
  }
}
