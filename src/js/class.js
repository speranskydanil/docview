export default function Class(conf) {
  var init = conf.init || function() {};
  delete conf.init;

  var parent = conf.parent || function() {};
  delete conf.parent;

  var F = function() {};

  F.prototype = parent.prototype;
  var f = new F();
  for (var fn in conf) f[fn] = conf[fn];
  init.prototype = f;

  return init;
};
