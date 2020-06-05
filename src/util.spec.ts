
import { cleanupUrbanDictionaryDefinition, ellipsify } from './util';
import { equal } from 'assert';

describe('#cleanupUrbanDictionaryDefinition', function () {
    context('when input text contains no special characters', function () {
        it('should not change output text', function () {
            const inputText: string = 'This is a simple string.';
            equal(cleanupUrbanDictionaryDefinition(inputText), inputText);
        });
    });
    context('when input text contains square brackets', function () {
        it('should remove square brackets from the output text', function () {
            const inputText: string = 'This is a [more] [complex] string.';
            equal(cleanupUrbanDictionaryDefinition(inputText), 'This is a more complex string.');
        });
    });
    context('when input text contains newlines', function () {
        it('should replace newlines with spaces in the output text', function () {
            const inputText: string = 'This is a\r\nvery silly\r\nstring.';
            equal(cleanupUrbanDictionaryDefinition(inputText), 'This is a very silly string.');
        });
    });
    context('when text contains multiple spaces in a row', function () {
        it('should replace multiple spaces with a single space', function () {
            const inputText: string = 'This  is  a  spread-out     string.';
            equal(cleanupUrbanDictionaryDefinition(inputText), 'This is a spread-out string.');
        });
    });
});

describe('#ellipsify', function () {
    context('when text is shorter than $limit', function () {
        it('should not change inputText', function () {
            const inputText: string = 'This is a string.';
            equal(ellipsify(inputText, 20), inputText);
        });
    });
    context('when text length is equal to $limit', function () {
        it('should not change inputText', function () {
            const inputText: string = 'This is a string.';
            equal(ellipsify(inputText, inputText.length), inputText);
        });
    });
    context('when text is longer than $limit', function () {
        it('should truncate to $limit and append an ellipsis', function () {
            const inputText: string = 'This is a looooooooooooooooooooong string.';
            equal(ellipsify(inputText, 12), 'This is a lo…');
        });
    });
});
