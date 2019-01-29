import * as Manikin from '../index';

describe('Manikin', () => {
    const expectedExports = ['computed', 'createModel', 'ManikinObject'];
    expectedExports.forEach(exportName => {
        it(`exports ${exportName}`, () => {
            expect(Manikin[exportName]).toBeTruthy();
        });
    });
});
