import { checkformat } from '../src/client/js/checkformat'

describe('Test "checkformat()" should exist' , () => {
    test('It should return true', async () => {
        expect(checkformat).toBeDefined();
    });
});

describe('Test "checkformat()" should be a function' , () => {
    test('It should be a function', async () => {
        expect(typeof checkformat).toBe("function");
    });
});