/*
 * Copyright (c) 2018 Eric Lange
 *
 * Distributed under the MIT License.  See LICENSE.md at
 * https://github.com/LiquidPlayer/LiquidCore for terms and conditions.
 */

/* In JavaScriptCore, a typed array that is constructed with an ArrayBuffer with non-integer
 * offset and/or length arguments will be treated as a zero-length array.  V8 takes the size
 * of the underlying ArrayBuffer.  We simulate that here.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';
  const handler = {
    construct(target, args, newTarget) {
      if (typeof args[0] === 'object' &&
        args[0] instanceof ArrayBuffer &&
        args.length >= 3 &&
        (args[1] === undefined || args[1] === null) &&
        (args[2] === undefined || args[2] === null)) {

        return Reflect.construct(target, [args[0], 0, args[0].byteLength], newTarget);
      } else if (typeof args[0] === 'number') {
        return Reflect.construct(target, [new ArrayBuffer(args[0] * Reflect.get(target, 'BYTES_PER_ELEMENT'))], newTarget);
      } else {
        return Reflect.construct(target, args, newTarget);
      }
    }
  };
  Uint8Array = new Proxy(Uint8Array, handler);
  Uint16Array = new Proxy(Uint16Array, handler);
  Uint32Array = new Proxy(Uint32Array, handler);
  Uint8ClampedArray = new Proxy(Uint8ClampedArray, handler);
  Int8Array = new Proxy(Int8Array, handler);
  Int16Array = new Proxy(Int16Array, handler);
  Int32Array = new Proxy(Int32Array, handler);
  Float32Array = new Proxy(Float32Array, handler);
  Float64Array = new Proxy(Float64Array, handler);
})));