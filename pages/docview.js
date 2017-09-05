var docview = new Docview({
  div: '.docview',
  zooms: [82, 164, 328, 492, 656, 818, 984, 1146],
  pages: [...Array(20)].map(_, i) => ({id: i + 1, w: 1146, h: 1699})),
  pageUrl: function(id, zoom) {
    return ['/docview/pages', id, zoom, id + '.jpg'].join('/');
  }
});