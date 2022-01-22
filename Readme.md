# debounce



防抖函数，**debounce**

* 清除定时器 **clear**

* 立即执行 **executeImmediately**

* 刷新定时器 **flush**

* 修改this的重心 **toggleIsModifyContext**

* 修改创建时this **modifyContext**

* 初始化创建时 this **initContext**



# 安装

```
npm install tallgy-debounce
```



# 案例 test

## 核心函数

```javascript
var debounce = require('tallgy-debounce');

如果使用箭头函数，那么指向无法被修改
debounce(() => {})
```

```
四个参数
第一个参数是执行函数，对于要修改this指向的，不能使用箭头函数
第二个参数是延迟时间
第三个参数是代表第一次是否立即执行，效果只有第一次，但是可以使用 flush 进行刷新
第四个参数就是 this的指向的重心选择。是创建时this还是调用时this的选择
		true就是调用时this
		false就是创建时this
debounce(() => {}, 100, true, true)
```



```javascript
var debounce = require('tallgy-debounce');

var obj = {
  a: 1
}
this.b = 2
var fn = debounce.call(obj, function () {
  console.log(this)
}, 120)

fn()
fn()
fn()
```



## 清除定时器

```javascript
fn()
fn.clear()
```



## 立即执行

```javascript
fn()
fn()
fn()
fn.executeImmediately()
```



## 刷新

​	携带参数，true代表马上执行后刷新，false就是不执行直接刷新

​		默认为true

```javascript
fn()
fn.flush()

fn.flush(false)
```



## 修改this指向重心

​	记住，这个是修改重心，并不是修改指向。

​		修改指向的重心就是在 存在 创建时的this 和 调用时的this时，选择以谁为重心

默认是进行 toggle ，可以携带true和false

​	true代表了重心是调用时为主

​	false代表了创建时的this为主

​		如果对于this不存在就会使用另一个this

```javascript
fn.toggleIsModifyContext()

fn.toggleIsModifyContext(true)
```



## this 指向和vue的methods

vue的methods

​	只需要最后一个一个参数为true即可

​	注意：不能箭头函数，因为箭头函数不能修改this的指向。

```
methods: {
	fn: debounce(function () {}, 100, true, true)
}
```



## 修改this

​	不带参数就是初始化。

```
fn.modifyContext(context)
```



## 初始化this

```
fn.initContext
```

