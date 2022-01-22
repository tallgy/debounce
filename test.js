var debounce = require('./index');

var obj = {
  a: 1
}
this.b = 2
var fn = debounce.call(obj, function () {
  console.log(this)
}, 1200)

fn()
fn()
fn()
fn.flush()