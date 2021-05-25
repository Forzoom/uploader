import 'core-js/modules/es.array.slice';
import 'core-js/modules/es.array.splice';
import 'core-js/modules/es.number.constructor';
import 'core-js/modules/es.array.map';
import 'core-js/modules/es.symbol';
import 'core-js/modules/es.symbol.description';
import 'core-js/modules/es.symbol.async-iterator';
import 'core-js/modules/es.symbol.iterator';
import 'core-js/modules/es.symbol.to-string-tag';
import 'core-js/modules/es.array.for-each';
import 'core-js/modules/es.array.iterator';
import 'core-js/modules/es.array.reverse';
import 'core-js/modules/es.date.to-string';
import 'core-js/modules/es.function.name';
import 'core-js/modules/es.json.to-string-tag';
import 'core-js/modules/es.math.to-string-tag';
import 'core-js/modules/es.object.create';
import 'core-js/modules/es.object.define-property';
import 'core-js/modules/es.object.get-prototype-of';
import 'core-js/modules/es.object.set-prototype-of';
import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.promise';
import 'core-js/modules/es.regexp.to-string';
import 'core-js/modules/es.string.iterator';
import 'core-js/modules/web.dom-collections.for-each';
import 'core-js/modules/web.dom-collections.iterator';
import 'core-js/modules/web.url';

var header = '<div class="ro-uploader-wrap" :class="containerClass" :style="containerStyle">';
var footer = '<div v-for="(image, index) in images" ' + ':key="index"' + 'class="ro-uploader-image-wrap"' + ':class="imageWrapClass"' + ':style="imageWrapStyle">' + '<div v-if="!lazyload" ' + 'class="ro-uploader-image"' + ':class="imageClass"' + ':style="[{\'background-image\': \'url(\' + transformImage(image) + \')\'}, imageStyle]"' + '@click="onClickImage(index)">' + '</div>' + '<div v-else ' + 'class="ro-uploader-image"' + ':class="imageClass"' + 'v-lazy:background-image="image"' + ':style="[imageStyle]"' + '@click="onClickImage(index)">' + '</div>' + '<div v-if="canModify" class="remove-wrapper" :class="removeClass" :style="removeStyle" @click="onClickRemove(index)"><div class="ro-uploader-remove"></div></div>' + '</div>' + '<slot name="request">' + '<div class="ro-uploader-image-wrap ro-uploader-request" ' + 'v-if="images.length < size && canModify"' + '@click="onClickRequest"' + ':class="requestClass"' + ':style="requestStyle">' + '</div>' + '</slot>' + '</div>';

/**
 * @load 当图片上传开始时
 * @finish 当图片上传结束时
 */

function factory(_Vue) {
  return _Vue.extend({
    name: 'Uploader',
    props: {
      /**
       * 允许上传图片个数
       */
      size: {
        type: Number,
        "default": 1
      },

      /**
       * 是否允许修改
       */
      canModify: {
        type: Boolean,
        "default": true
      },

      /**
       * 容器对象类
       */
      containerClass: {
        type: [Object, Array],
        "default": function _default() {
          return {};
        }
      },

      /**
       * 容器对象样式
       */
      containerStyle: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },

      /**
       * 图片对象类
       */
      imageClass: {
        type: [Object, Array],
        "default": function _default() {
          return {};
        }
      },

      /**
       * 图片对象样式
       */
      imageStyle: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },

      /**
       * wrap
       */
      imageWrapClass: {
        type: [Object, Array],
        "default": function _default() {
          return {};
        }
      },

      /**
       * wrap
       */
      imageWrapStyle: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },

      /**
       * 请求对象类
       */
      requestClass: {
        type: [Object, Array],
        "default": function _default() {
          return {};
        }
      },

      /**
       * 请求对象样式
       */
      requestStyle: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },

      /**
       * 删除按钮样式类
       */
      removeClass: {
        type: [Object, Array],
        "default": function _default() {
          return {};
        }
      },

      /**
       * 删除按钮样式
       */
      removeStyle: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },

      /**
       * 调用lazyload，因为无法确定存在vue-lazyload库，所以默认false
       */
      lazyload: {
        type: Boolean,
        "default": false
      }
    },
    data: function data() {
      return {
        // 包含所有图片的数组
        images: []
      };
    },
    methods: {
      /**
       * 重置所有的images列表，不会触发任何的remove和add事件
       */
      setImages: function setImages(images) {
        var tmp = [];

        for (var i = 0, len = images.length; i < len; i++) {
          tmp.push(images[i]);
        }

        this.images = tmp;
      },

      /**
       * 添加图片
       *  将触发@add(image)事件
       *
       * @param {string} image
       *
       * @return {boolean} 成功返回true，否则返回false
       */
      add: function add(image) {
        if (this.images.length < this.size) {
          this.images.push(image);
          this.$emit('add', image);
          return true;
        }

        return false;
      },

      /**
       * 删除图片
       *  将触发@remove(index)事件
       *
       * @param {number} index
       *
       * @return {boolean} true表示删除成功，false表示失败
       */
      remove: function remove(index) {
        if (0 <= index && index < this.size) {
          this.images.splice(index, 1);
          this.$emit('remove', index);
          return true;
        }

        return false;
      },

      /**
       * 删除所有的图片
       */
      removeAll: function removeAll() {
        for (var i = 0, len = this.images.length; i < len; i++) {
          this.remove(i);
        }

        return true;
      },

      /**
       * 获得所有图片
       *
       * @return {Array<string>}
       */
      getImages: function getImages() {
        return this.images.slice(0);
      },

      /**
       * 当点击图片时触发
       *
       * @param {number} index
       */
      onClickImage: function onClickImage(index) {
        this.$emit('click', index);
      },

      /**
       * 当点击删除按钮时触发
       */
      onClickRemove: function onClickRemove(index) {
        this.remove(index);
      },

      /**
       * 当点击添加按钮时
       */
      onClickRequest: function onClickRequest() {
        this.$emit('request');
      },

      /**
       * 获得允许上传的容量
       */
      getSize: function getSize() {
        return this.size;
      },

      /**
       * 获得当前已经上传的图片的数量
       */
      getCount: function getCount() {
        return this.images.length;
      },

      /**
       * 获取image，在模板中使用
       */
      transformImage: function transformImage(image) {
        return image;
      }
    },
    template: header + footer
  });
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var isIOS = /iPhone/.test(navigator.userAgent);
function previewImage(image, images) {
  wx.previewImage({
    current: image,
    urls: images
  });
}
/**
 * @return {Promise} res
 *  - localIds: string[]
 */

function chooseImage(count) {
  return new Promise(function (resolve, reject) {
    wx.chooseImage({
      count: count,
      sizeType: ['compressed'],
      success: function success(res) {
        return resolve(res);
      },
      // @ts-ignore
      cancel: function cancel() {
        return reject(new Error('cancel'));
      },
      // @ts-ignore
      fail: function fail() {
        return reject(new Error('fail'));
      }
    });
  });
}
/**
 * 默认不显示progress
 * @param localId
 *
 * @return {Promise} res
 *  - serverId
 */

function uploadImage(localId) {
  return new Promise(function (resolve, reject) {
    wx.uploadImage({
      localId: localId,
      isShowProgressTips: 0,
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(error) {
        reject(error);
      }
    });
  });
}
/**
 * @param localId
 *
 * @return {Promise} imageData
 */

function getLocalImgData(localId) {
  if (!isIOS || !window.__wxjs_is_wkwebview) {
    return localId;
  }

  return new Promise(function (resolve, reject) {
    wx.getLocalImgData({
      localId: localId,
      success: function success(res) {
        return resolve(res.localData);
      }
    });
  });
}

/**
 *
 *
 * @return {Promise} {image, serverId}
 */


function uploadWechatImage(localId, transformLocalImageData) {
  return uploadImage(localId).then(function (_res) {
    var serverId = _res.serverId; // 记录res

    return {
      localId: localId,
      serverId: serverId
    };
  }).then( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = res.localId;
              _context.t1 = res.serverId;
              _context.next = 4;
              return getLocalImgData(localId);

            case 4:
              _context.t2 = _context.sent;
              return _context.abrupt("return", {
                image: _context.t0,
                serverId: _context.t1,
                base64: _context.t2
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }())["catch"](function (error) {
    throw new Error(error.errMsg);
  });
}
/**
 * 
 */


function factory$1(_Vue, options) {
  var Uploader = factory(_Vue);
  return Uploader.extend({
    name: 'WechatUploader',
    props: {
      /**
       * 是否使用微信的预览内容
       */
      useWechatPreview: {
        type: Boolean,
        "default": true
      }
    },
    methods: {
      /**
       * 要求添加新的图片
       */
      onClickRequest: function onClickRequest() {
        this.request();
      },

      /**
       * 请求图片上传
       */
      request: function request() {
        var vm = this;
        vm.$emit('startRequest');
        return chooseImage(vm.size - vm.images.length).then(function (res) {
          vm.$emit('endRequest');
          var localIds = res.localIds;

          if (localIds.length > 0) {
            vm.$emit('choose', res);
            vm.$emit('load');
            return vm.uploadWechatImages(localIds).then(function () {
              vm.$emit('finish');
            })["catch"](function (errMsg) {
              vm.$emit('error', errMsg);
            });
          }
        })["catch"](function () {
          vm.$emit('endRequest');
        });
      },

      /**
       * 上传多张图片，需要保证一张上传完成之后，再上传另外一张
       */
      uploadWechatImages: function uploadWechatImages(localIds) {
        var vm = this;
        var localId = localIds.shift();
        return uploadWechatImage(localId, options.transformWXLocalImageData).then(function (_ref2) {
          var image = _ref2.image,
              serverId = _ref2.serverId,
              base64 = _ref2.base64;
          vm.add({
            image: image,
            serverId: serverId,
            base64: base64
          });

          if (localIds.length > 0) {
            return vm.uploadWechatImages(localIds);
          }
        })["catch"](function (errMsg) {
          throw new Error(errMsg);
        });
      },
      transformImage: function transformImage(image) {
        return image.base64 ? image.base64 : image.image;
      }
    },
    mounted: function mounted() {
      this.$on('click', function (index) {
        var images = this.images;
        previewImage(images[index].image, images.map(function (image) {
          return image.image;
        }));
      });
    }
  });
}

/**
 * 
 */


function factory$2(_Vue, options) {
  var Uploader = factory(_Vue);
  return Uploader.extend({
    name: 'InputUploader',
    props: {
      accept: {
        type: String
      }
    },
    methods: {
      /**
       * 要求添加新的图片
       */
      onClickRequest: function onClickRequest() {
        this.request();
      },

      /**
       * 请求图片上传
       */
      request: function request() {
        var $input = this.$refs.fileInput;

        if ($input) {
          $input.click();
        }
      },

      /**
       * 删除图片
       *  将触发@remove(index)事件
       *
       * @param {number} index
       *
       * @return {boolean} true表示删除成功，false表示失败
       */
      remove: function remove(index) {
        if (0 <= index && index < this.size) {
          var removed = this.images.splice(index, 1);

          for (var i = 0, len = removed.length; i < len; i++) {
            URL.revokeObjectURL(removed[i].objectUrl);
          }

          this.$emit('remove', index);
          return true;
        }

        return false;
      },
      onChangeInput: function onChangeInput() {
        var $input = this.$refs.fileInput;

        if ($input) {
          for (var i = 0, len = $input.files.length; i < len; i++) {
            if (this.images.length >= this.size) {
              return;
            }

            this.add({
              file: $input.files[i],
              objectUrl: URL.createObjectURL($input.files[i])
            });
          }
        }
      },

      /**
       * 获取image
       */
      transformImage: function transformImage(image) {
        return image.objectUrl;
      }
    },
    template: header + '<input ref="fileInput" class="ro-uploader-input" type="file" @change="onChangeInput" :multiple="(size - images.length) > 1" :accept="accept" />' + footer
  });
}

var installed = false;

function install(vue, options) {
  if (installed) {
    return;
  }

  installed = true;
  vue.component('Uploader', factory(vue));
  vue.component('WechatUploader', factory$1(vue, options));
  vue.component('InputUploader', factory$2(vue));
}

export default install;
