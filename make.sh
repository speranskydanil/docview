cp src/docview.css dist/docview.css
cp src/docview.png dist/docview.png

uglifyjs -o dist/docview.js\
  src/js/docview.js\
  src/js/mode.js\
  src/js/mode-filmstrip.js\
  src/js/mode-flipbook.js\
  src/js/mode-grid.js\
  src/js/mode-inspect.js\
  src/js/page.js\
  src/js/queue.js

