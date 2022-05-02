import { expect } from 'chai'
import 'mocha'
import {CountWords} from '../src/ej2/ej2'
it ("prueba", () => {

    let a: CountWords = new CountWords("ola")
    expect(a).to.be.equal(a);

})