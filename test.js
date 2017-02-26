'use strict' // eslint-disable-line strict, lines-around-directive

const zealit = require('./zealit')



/* eslint-disable no-unused-vars, no-unused-expressions */
const foo = zealit({ bar: true })
let test = foo.bar
let err
try {
    test = foo.baz
}
catch (_err) {
    err = _err
    const messageShouldBe = "zealit: property 'baz' is nonexistent"
    if (err.message !== messageShouldBe) {
        throw new Error('test failed')
    }
}
if (!err) {
    throw new Error('test failed')
}

foo.bar = false
if (foo.bar !== false) {
    throw new Error('test failed')
}



const qux = zealit({ bar: true }, { freeze: true })
err = null
try {
    qux.bar = false
}
catch (_err) {
    err = _err
}
if (!err || qux.bar !== true) {
    throw new Error('test failed')
}



err = null
const myConstants = Object.freeze(zealit({
    PI: 3.14159265,
}))
test = myConstants.PI // 3.14159265
try {
    test = myConstants.Pi // throws a ReferenceError
}
catch (_err) {
    err = _err
    const messageShouldBe = "zealit: property 'Pi' is nonexistent"
    if (err.message !== messageShouldBe) {
        throw new Error('test failed')
    }
}
if (!err) {
    throw new Error('test failed')
}

err = null
try {
    myConstants.PI = 12 // throws a TypeError
}
catch (_err) {
    err = _err
}
if (!err) {
    throw new Error('test failed')
}

err = null
try {
    zealit({ a: { b: { c: true } } }).a.b.cc
}
catch (_err) {
    err = _err
}
if (!err) {
    throw new Error('test failed')
}



err = null
try {
    zealit({ a: true }).b
}
catch (_err) {
    err = _err
}
if (!err) {
    throw new Error('test failed')
}

err = null
try {
    const z = zealit({ a: true }, { ignore: 'b' })
    z.a
    z.b
    z.c
}
catch (_err) {
    err = _err
}
if (!err || err.message !== "zealit: property 'c' is nonexistent") {
    throw new Error('test failed')
}

err = null
try {
    const z = zealit({ a: true }, { ignore: ['b'] })
    z.a
    z.b
    z.c
}
catch (_err) {
    err = _err
}
if (!err || err.message !== "zealit: property 'c' is nonexistent") {
    throw new Error('test failed')
}