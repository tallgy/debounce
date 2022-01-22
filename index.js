/**
 * 防抖函数
 * 主要还是参考了npm的第一个防抖函数的写法，除了那个使用date的那个方法没有理解所以没有添加
 * 下面说明一下方法
 *  debounced 核心函数，进行定时器初始化，以及判断是否立即执行
 *  clear 清除定时器，不会执行正在定时的函数
 *  executeImmediately 立即执行定时器
 *  flush 刷新定时器，默认会立即执行定时器，可以进行修改，会将flag进行初始化。
 *  toggleIsModifyContext 修改指向的重心的Boolean
 *
 * 方法里面虽然有返回值，但是可能会有点混乱，因为我自己也写混乱了。。。
 *
 * 重点，this的指向。
 *  this的指向，默认是以创建的地方为主，后续是判断创建的那个this是否是存在的然后进行一个选择
 *    我们可以通过创建时进行 undefined 的指向进行修改
 *    也可以传入第四个参数为true来代表指向以每次调用防抖为主
 *   也可以调用 toggleIsModifyContext 进行修改
 *
 * @param fn { Function }
 * @param delay { Number }
 * @param immediate { Boolean }
 * @param isModifyContext { Boolean }
 */
// 默认的延时时间
var default_delay = 100

function debounce(fn, delay, immediate, isModifyContext) {
  // timer 是定时器的返回值，
  // context 是执行上下文
  // args 是执行参数
  // flag 是代表是否是第一次创建，可以通过 flush进行初始化
  // __this 保存最开始的this
  var timer, context, args, result
  var _this = this, __this = this, flag = true

  // immediate = immediate || false
  // canModifyContext = canModifyContext || false

  // 默认时间 100ms
  delay = delay || default_delay

  /**
   * 执行防抖函数
   */
  function executeDebounce() {
    result = fn.apply(context, args)
    // 执行完之后，需要将参数和上下文进行清除
    context = args = null
  }

  /**
   * 防抖核心函数
   */
  function debounced() {
    args = arguments
    // 设置执行上下文
    context = isModifyContext ? (this || _this) : (_this || this)

    // 是否立即执行，通过判断 flag 和 带入的参数进行判断
    var exeNow = flag && immediate
    // 立即执行
    if (exeNow) {
      executeDebounce.apply(context)
      flag = false

      return result
    }

    // 不立即执行
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      executeDebounce.apply(context)
    }, delay)

    return result
  }

  /**
   * 清除定时,不执行
   * clear清除不存在的也不会报错，我们也可以直接这样清除
   * 但是可能会影响性能等。所以我们先进行判断
   */
  debounced.clear = function () {
    if (timer) {
      clearTimeout(timer)
      context = timer = args = null
    }
  }

  /**
   * 立即执行定时器
   * 如果定时器还没有执行，
   * 则立即执行定时，并清空timer
   */
  debounced.executeImmediately = function () {
    if (timer) {
      executeDebounce.apply(context)
      context = args = null

      clearTimeout(timer)
      timer = null
    }

    return result
  }

  /**
   * 刷新定时器
   * 是否执行定时器通过携带的参数值判断。默认会执行
   * 最重点的就是 immediate 的初始化
   */
  debounced.flush = function (exec) {
    exec = exec===undefined ? true : exec
    if (exec) {
      result = debounced.executeImmediately()
    }
    debounced.clear()
    flag = true
    return result
  }

  /**
   * 修改指向的重心
   *
   * 不带参数： toggle，永久
   * 带一个参数则是进行赋值
   *
   * 舍弃带第二个参数
   * 带一个参数： 判断是什么类型
   *    string： 则是toggle，一次还是永久
   *    Boolean：则是boolean，配上永久
   * 带两个参数：
   *    boolean
   *    string
   *
   * @param flag { Boolean }
   * 舍弃，第二个参数
   * @param times { String } you can use 'once' or other
   */
  debounced.toggleIsModifyContext = function (flag) {
    if (arguments.length === 0) {
      isModifyContext = !isModifyContext
      return
    }

    isModifyContext = flag
  }

  /**
   * 修改创建时this
   * @param context
   */
  debounced.modifyContext = function (context) {
    _this = context || __this
  }
  /**
   * 初始化创建时this
   */
  debounced.initContext = function () {
    _this = __this
  }

  return debounced
}

// 这个是npm上面那个的，说是为了增加兼容性
// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce
