# Docview

Docview is a tool for displaying images.

## [DEMO](http://speranskydanil.github.io/docview)

### Dependencies

* [jQuery](http://jquery.com/)
* [jQuery Mouse Wheel Plugin](https://github.com/brandonaaron/jquery-mousewheel)
* [jqueryrotate](http://code.google.com/p/jqueryrotate/)
* [jquery-top-scrollbar](https://github.com/speranskydanil/jquery-top-scrollbar)

### Features

* Grid, Filmstrip, Inspect, Flip-Book modes are available.
* Fullscreen.
* Zooming.
* Dim the lights (adds `dark` class to body).
* Next and Prev buttons, setting current page.
* Rotating (in the Inspect mode).
* Intellectual loading of images, determining the viewport, and loading only what you are looking at.
* Nice UX.

### Usage

##### Basic

    <link rel="stylesheet" href="docview.css">
    <script src="docview.js"></script>

    <div class="galery"></div>
    
    new Docview({
      div: $('.galery'),
      pages: [
        { id: 0, w: 1146, h: 1540 },
        { id: 1, w: 1146, h: 1540 },
        { id: 2, w: 1146, h: 1540 },
        { id: 3, w: 1146, h: 1540 },
        { id: 4, w: 1146, h: 1540 },
        { id: 5, w: 1146, h: 1540 },
        { id: 6, w: 1146, h: 1540 },
        { id: 7, w: 1146, h: 1540 },
        { id: 8, w: 1146, h: 1540 },
        { id: 9, w: 1146, h: 1540 }
      ],
      zooms: {
        0: 82,
        1: 164,
        2: 328,
        3: 492,
        4: 656,
        5: 818,
        6: 984,
        7: 1146
      },
      maxZoom: 8,
      pageUrl: function(id, zoom) {
        return ['/pages', id, zoom].join('/') + '.jpg';
      }
    });

##### Params

**div** - div in which the Docview will be placed.<br>
`div: $('.galery')`

**env** - those elements which will be toggled when clicking on 'Fullscreen'.<br>
`env: $('.page-header, .page-footer')`

**theme** - the look, possible values: 'classic', 'mini', 'dark'; 'classic' - is the default value.<br>
`theme: 'classic'`

**translation** - you can change text for tooltips, the default values are written below.

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
    }

**index** - initial page; default value: 0.<br>
`index: 0`

**mode** - initial mode; possible values: 'grid', 'filmstrip', 'inspect', 'flip-book'; default value: 'grid'.<br>
`mode: 'grid'`

**zoom** - initial zoom; default value: 0.<br>
`zoom: 0`

**pages** - pages to display; id, width and height should be specified.

      pages: [
        { id: 0, w: 1146, h: 1540 },
        { id: 1, w: 1146, h: 1540 },
        { id: 2, w: 1146, h: 1540 },
        { id: 3, w: 1146, h: 1540 },
        { id: 4, w: 1146, h: 1540 },
        { id: 5, w: 1146, h: 1540 },
        { id: 6, w: 1146, h: 1540 },
        { id: 7, w: 1146, h: 1540 },
        { id: 8, w: 1146, h: 1540 },
        { id: 9, w: 1146, h: 1540 }
      ]

**zooms** - possible zooms; key - number of a zoom, value - width of the zoom.

      zooms: {
        0: 82,
        1: 164,
        2: 328,
        3: 492,
        4: 656,
        5: 818,
        6: 984,
        7: 1146
      }

**maxZoom** - the allowed max zoom; event `docview-access-denied` will be sent when trying to access a zoom greater then that.<br>
`maxZoom: 8`

**pageUrl** - function which should return url for a page by it's id and zoom.

    pageUrl: function(id, zoom) {
      return ['./data', parseInt(id) % 10, zoom + '.jpg'].join('/');
    }

### Screenshots

![screen](https://raw.github.com/speranskydanil/docview/master/screen-1.png)

![screen](https://raw.github.com/speranskydanil/docview/master/screen-2.png)

![screen](https://raw.github.com/speranskydanil/docview/master/screen-3.png)

![screen](https://raw.github.com/speranskydanil/docview/master/screen-4.png)

**Author (Speransky Danil):**
[Personal Page](http://dsperansky.info) |
[LinkedIn](http://ru.linkedin.com/in/speranskydanil/en) |
[GitHub](https://github.com/speranskydanil?tab=repositories) |
[StackOverflow](http://stackoverflow.com/users/1550807/speransky-danil)

