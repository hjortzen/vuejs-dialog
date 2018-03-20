/**
 * Created by Emmy on 10/8/2017.
 */

import Vue from 'vue'
import Promise from 'promise-polyfill'
import {assert, expect} from 'chai'
import * as HOOKS from '../../utilities/hooks'
import {nodeLength, getElem} from '../../utilities/helpers'

Vue.config.productionTip = false

describe('Calling "alert()"', function () {
    let dg

    before(HOOKS.sanitizeAndPrepareWindow)
    before(function (done) {
        dg = window.vm.triggerAlert()
        Vue.nextTick(done) // be sure done has updated before proceeding
    })

    it('Should return a promise', function () {
        expect(dg).to.be.instanceOf(Promise)
    })

    it('Should make the dialog visible', function () {
        assert.strictEqual(nodeLength('.dg-container'), 1)
    })

    it('Should make the ok button visible', function () {
        assert.strictEqual(nodeLength('.dg-btn--ok'), 1)
    })

    it('Should exclude the cancel button', function () {
        assert.strictEqual(nodeLength('.dg-btn--cancel'), 0)
    })
})

describe('Clicking "ok" on #alert()', function () {
    before(HOOKS.sanitizeAndPrepareWindow)

    it('Should resolve the promise', function (done) {
        window.vm.triggerAlert().then(() => {done()}) // expected
        Vue.nextTick(() => window.vm.clickDialogBtn('ok'))
    })
})

describe('Verify custom classes', function () {
    before(HOOKS.sanitizeAndPrepareWindow)
    before(function (done) {
        window.vm.triggerCustomClasses()
        Vue.nextTick(done) // be sure done has updated before proceeding
    })
    it('Should have custom class on ok button', function () {
        assert(getElem('.dg-btn--ok').getAttribute('class')
            .includes('testing-class'), 'Custom class not found on okButton!')
    })

    it('Cancel should not have custom class', function () { //Test the negative case, in case all components accidently got a class
        assert(!getElem('.dg-btn--cancel').getAttribute('class')
            .includes('testing-class'), 'Custom class should not be present on cancelButton!')
    })
})