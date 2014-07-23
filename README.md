# Docview

Docview is a tool for displaying images.

### Dependencies

* [jQuery](http://jquery.com/)
* [jQuery Mouse Wheel Plugin](https://github.com/brandonaaron/jquery-mousewheel)
* [jqueryrotate](http://code.google.com/p/jqueryrotate/)
* [jquery-top-scrollbar](https://github.com/speranskydanil/jquery-top-scrollbar)

### Usage

##### Basic

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

