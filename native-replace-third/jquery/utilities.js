// isArray
$.isArray(range);
Array.isArray(range);

// Trim
$.trim(string);
String.trim(string);

// ObjectAssign
// 继承，使用 object.assign polyfill https://github.com/ljharb/object.assign
$.extend({}, defaultOpts, opts);
Object.assign({}, defaultOpts, opts);

// Contains
$.contains(el, child);
el !== child && el.contains(child);