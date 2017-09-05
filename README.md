# Docview

Image viewer for large collections

[DEMO](http://speranskydanil.github.io/docview)

<link href="http://speranskydanil.github.io/docview/dist/docview.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://rawgit.com/jquery/jquery-mousewheel/master/jquery.mousewheel.min.js"></script>
<script src="https://rawgit.com/speranskydanil/jquery-top-scrollbar/master/jquery.top_scrollbar.js"></script>
<script src="http://speranskydanil.github.io/docview/dist/docview.js"><script>
<div class="docview"></div>
<scirpt>
var docview = new Docview({
  div: '.docview',
  zooms: [82, 164, 328, 492, 656, 818, 984, 1146],
  pages: [
    {id: 1, w: 1200, h: 1740},
    ..
  ],
  pageUrl: function(id, zoom) {
    return ['/pages', id, zoom, id + '.jpg'].join('/');
  }
});
</script>

## Dependencies

* [jQuery](http://jquery.com)
* [jQuery Mouse Wheel](https://github.com/brandonaaron/jquery-mousewheel)
* [jquery-top-scrollbar](https://github.com/speranskydanil/jquery-top-scrollbar)

## Features

* Grid, Filmstrip, Inspect and Flip-Book modes
* Fullscreen mode
* Zooming pages
* Switching pages
* Rotating pages
* Download & Print
* Intellectual loading of images, determining the viewport, and loading only what you are looking at.
* Nice UX

## Usage

### Basic

```html
<link href="docview.css" rel="stylesheet">
<script src="docview.js"></script>
<div class="docview"></div>
```

```javascript
var docview = new Docview({
  div: '.docview',
  zooms: [82, 164, 328, 492, 656, 818, 984, 1146],
  pages: [
    {id: 1, w: 1200, h: 1740},
    ..
  ],
  pageUrl: function(id, zoom) {
    return ['/pages', id, zoom, id + '.jpg'].join('/');
  }
});
```

### Options

**div** - container for Docview<br>

    div: '.docview'

**translation** - you can change text for tooltips, the default values are written below

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
    }

**zooms** - widths for zooms

      zooms: [82, 164, 328, 492, 656, 818, 984, 1146]

**pages** - pages to display; id, width and height have to be specified

    pages: [
      {id: 1, w: 1200, h: 1740},
      ..
    ]

**pageUrl** - function which returns url for a page by it's id and zoom

    pageUrl: function(id, zoom) {
      return ['./data', parseInt(id) % 10, zoom + '.jpg'].join('/');
    }

**mode** - initial mode ('grid' (default), 'filmstrip', 'inspect', 'flip-book')

    mode: 'grid'

**index** - initial page, default 0

    index: 0

**zoom** - initial zoom, default 0

    zoom: 0

## Screenshots

![screen](https://raw.github.com/speranskydanil/docview/master/screen-1.png)

![screen](https://raw.github.com/speranskydanil/docview/master/screen-2.png)

**Author (Speransky Danil):**
[LinkedIn](https://www.linkedin.com/in/speranskydanil) |
[GitHub](https://github.com/speranskydanil) |
[StackOverflow](https://stackoverflow.com/users/1550807/danil-speransky?tab=profile)
