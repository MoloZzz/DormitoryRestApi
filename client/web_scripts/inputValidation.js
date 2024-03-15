const ukrAndSpecSymbRegex = /^[а-яА-ЯїЇіІєЄґҐёЁґҐ\s'ʼ-]+$/;
const positiveNumRegex = /^\d+$/;
const positiveDecimalRegex = /^\d+(\.\d+)?$/;
const passportRegex = /^[A-Za-z]{2}\d{6}$|^\d{9}$/;

function isValidPositiveInteger(number) {
    return positiveNumRegex.test(number) && parseInt(number) > 0;
}

function isValidPositiveDecimal(number) {
    return positiveDecimalRegex.test(number) && parseFloat(number) > 0;
}

function isValidDecimal(number) {
    return positiveDecimalRegex.test(number) && parseFloat(number);
}

function isValidPassportNumber(passportNumber) {
    return passportRegex.test(passportNumber);
}

function isValidUkrSymb(passportNumber) {
    return ukrAndSpecSymbRegex.test(passportNumber);
}