// CSS
// GetStyle
$el.css('color');
// 注意：此处为了解决当 style 值为 auto 时，返回 auto 的问题
const win = el.ownerDocument.defaultView;
// null 的意思是不返回伪类元素
win.getComputedStyle(el, null).color;

// SetStyle
$el.css({color: '#ff0011'});
el.style.color = '#ff0011';

// AddClass
$el.addClass(className);
el.classList.add(className);

// RemoveClass
$el.removeClass(className);
el.classList.remove(className);

// HasClass
$el.hasClass(className);
el.classList.contains(className);

// ToggleClass
$el.toggleClass(className);
el.classList.toggle(className);


// Width & Height
// With与Height获取方法相同, 以Height为例
// Window height
$(window).height();
// 不含scrollbar, 与jQuery行为一致
window.document.documentElement.clientHeight;
// 含scrollbar
window.innerHeight;

// Document height
$(document).height();
document.documentElement.scrollHeight;

// Element height
$el.height();
// 与 jQuery 一致（一直为 content 区域的高度）
function getHeight (el) {
  const styles = this.getComputedStyles(el);
  const height = el.offsetHeight;
  const borderTopWidth = parseFloat(styles.borderTopWidth);
  const borderBottomWidth = parseFloat(styles.borderBottomWidth);
  const paddingTop = parseFloat(styles.paddingTop);
  const paddingBottom = parseFloat(styles.paddingBottom);
  return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
}
// 精确到整数（border-box 时为 height 值，content-box 时为 height + padding + border 值）
el.clientHeight;
// 精确到小数（border-box 时为 height 值，content-box 时为 height + padding + border 值）
el.getBoundingClientRect().height;

// Iframe height
$('iframe').contents().height();
iframe.contentDocument.documentElement.scrollHeight;




// Position & Offset
// Position
$el.position();
{left: el.offsetLeft, top: el.offsetTop}
// Offset
$el.offset();
function getOffset (el) {
  const box = el.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  }
}



// Scroll Top
$(window).scrollTop();
(document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;