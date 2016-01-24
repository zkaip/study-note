// QueryBySomething
// ID
$('#id');
document.querySelector('#id');
document.getElementById('id');
// Class
$('.css');
document.querySelectorAll('.css');
document.getElementByClassName('css');
// Attribute
$('a[target=_blank]');
document.querySelectorAll('a[target=_blank]');


// FindsSomething
// Nodes
$el.find('li');
el.querySelectorAll('li');

// Body
$('body');
document.body;

// Attribute
$el.attr('foo');
el.getAttribute('foo');

// DataAttribute
$el.data('foo');
el.getAttribute('data-foo');
el.dataset['foo'];// only IE 11+

// SiblingElements
$el.siblings();
[].filter.call(el.parentNode.children, function (child) {
  return child !== el;
});

// PreviousElements
$el.prev();
el.previousElementSibling;

// NextElements
$el.next();
el.nextElementSibling;

// Closest 
// 获得匹配选择器的第一个祖先元素，
// 从当前元素开始沿 DOM 树向上。
$el.closest(querySelector);
function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    } else {
      el = el.parentElement;
    }
  }
  return null;
}

// Parents Until
// 获取当前每一个匹配元素集的祖先，不包括匹配元素的本身
$el.parentsUntil(selector, filter);
function parentsUntil (el, selector, filter) {
  const result = [];
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  // match start from parent
  el = el.parentElement;
  while (el && !matchesSelector.call(el, selector)) {
    if (!filter) {
      result.push(el);
    } else {
      if (matchesSelector.call(el, filter)) {
        result.push(el);
      }
    }
    el = el.parentElement;
  }
  return result;
}



// From
// Input / Textarea
$('#my-input').val();
document.querySelector('#my-input').value;
// Get index of e.currentTarget between .radio
$(e.currentTarget).index('.radio');
[].indexof.call(document.querySelectorAll('.radio'), e.currentTarget);

// IframeContents
$iframe.contents();
iframe.contentDocument;
// IframeQuery
$iframe.contents().find('.css');
iframe.contentDocument.querySelectorAll('.css');