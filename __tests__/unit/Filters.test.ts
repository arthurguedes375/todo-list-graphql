import dateFilter from '@src/fields/filters/date.filter';
import emailFilter from '@src/fields/filters/email.filter';
import passwordFilter from '@src/fields/filters/password.filter';

describe('Date Filter', () => {
    it('should return that the date is wrong', () => {
        expect(
            dateFilter('3002-11-31'),
        ).toBe(false);
        expect(
            dateFilter('1514-11-31'),
        ).toBe(false);
        expect(
            dateFilter('2014-20-31'),
        ).toBe(false);
        expect(
            dateFilter('2014-11-41'),
        ).toBe(false);
        expect(
            dateFilter('2014/11/31'),
        ).toBe(false);
        expect(
            dateFilter('31-11-2014'),
        ).toBe(false);
    });
    it('should return that the date is right', () => {
        expect(
            dateFilter('2014-11-31'),
        ).toBe(true);
        expect(
            dateFilter('1954-11-31'),
        ).toBe(true);
        expect(
            dateFilter('2014-12-31'),
        ).toBe(true);
        expect(
            dateFilter('2014-11-28'),
        ).toBe(true);
        expect(
            dateFilter('2014-11-09'),
        ).toBe(true);
    });
});
describe('Email Filter', () => {
    it('should return that the email is wrong', () => {
        expect(
            emailFilter('abc@abc'),
        ).toBe(false);
        expect(
            emailFilter('abc.abc'),
        ).toBe(false);
        expect(
            emailFilter('alala'),
        ).toBe(false);
        expect(
            emailFilter(''),
        ).toBe(false);
    });
    it('should return that the email is right', () => {
        expect(
            emailFilter('abc@abc.asd'),
        ).toBe(true);
        expect(
            emailFilter('abc+abc@dsadsa.asd'),
        ).toBe(true);
        expect(
            emailFilter('abc#abc@ads.ds'),
        ).toBe(true);
        expect(
            emailFilter('my@email.casd.ad.ds'),
        ).toBe(true);
        expect(
            emailFilter('my@email.dsd.ad'),
        ).toBe(true);
    });
});
describe('Password Filter', () => {
    it('should return that the password is wrong', () => {
        expect(
            passwordFilter('aC1'),
        ).toBe(false);
        expect(
            passwordFilter('ac345678'),
        ).toBe(false);
        expect(
            passwordFilter('AC345678'),
        ).toBe(false);
        expect(
            passwordFilter('aCdafghj'),
        ).toBe(false);
        expect(
            passwordFilter(''),
        ).toBe(false);
    });
    it('should return that the password is right', () => {
        expect(
            passwordFilter('aC#3451ddsa21t5sdf@'),
        ).toBe(true);
    });
}); 