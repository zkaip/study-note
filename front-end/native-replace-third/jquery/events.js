// BindEvent
$el.on(eventName, eventHandler);
el.addEventListener(eventName, eventHandler);


// UnbindEvent
$el.off(eventName, eventHandler);
el.removeEventListener(eventName, eventHandler);



// Trigger 触发器
$el.trigger('custom-event', {key1: 'data'});
if (window.CustomEvent) {
  const event = new CustomEvent('custom-event', {detail: {key1: 'data'}});
}else {
  const event = document.createEvent('CustomEvent');
  event.initCustomEvent('custom-event', true, true, {key1: 'data'});
}
el.dispatchEvent(event);