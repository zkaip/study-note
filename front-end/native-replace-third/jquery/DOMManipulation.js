// Remove
$el.remove();
el.parentNode.removeChild(el);


// Text
// GetText
$el.text();
el.textContent;
// SetText
$el.text(string);
el.textContent = string;


// Html
// GetHTML
$el.html();
el.innerHTML;
// SetHTML
$el.html(htmlString);
el.innerHTML = htmlString;


// Append 插入子节点末尾
$el.append(newEl);
let newEl = document.createElement('div');
newEl.setAttribute('id', 'container');
newEl.innerHTML = 'hello';
el.appendChild(newEl)


// Prepend
$el.prepend(newEl);
let newEl = document.createElement('div');
newEl.setAttribute('id', 'container');
newEl.innerHTML = 'hello';
el.insertBefore(newEl, el.firstChild);


// insertBefore 在选中元素前插入新节点
$newEl.insertBefore(queryString);
newEl.insertBefore(document.querySelector(queryString));

// insertAfter
$newEl.insertAfter(queryString);
function insertAfter (newEl, queryString) {
  const parent = document.querySelector(queryString).parentNode;
  if (parent.lastChild === newEl) {
    parent.appendChild(newEl);
  } else {
    parent.insertBefore(newEl, parent.nextSibling);
  }
}














