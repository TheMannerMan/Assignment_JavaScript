'use strict';
import {seedGenerator, uniqueId, randomNumber, randomDecimal, deepCopy, isEqual} from '../SeidoHelpers/seido-helpers.js';


console.group('class to generate random data seeds');

const _seeder = new seedGenerator();
console.log(_seeder.petName);
console.log(_seeder.firstName);
console.log(_seeder.lastName);
console.log(_seeder.fullName);

const country = _seeder.Country;
console.log(country);
console.log(_seeder.city(country));
console.log(_seeder.street(country));
console.log(_seeder.zipCode);
console.log(_seeder.email());
console.log(_seeder.phoneNr);

console.log(_seeder.allQuotes);
console.log(_seeder.quotes(3));
console.log(_seeder.quote);

console.log(_seeder.allLatin);
console.log(_seeder.latinParagraphs(3));
console.log(_seeder.latinParagraph);

console.log(_seeder.latinSentences(3));
console.log(_seeder.latinSentence);

console.log(_seeder.latinWords(3));
console.log(_seeder.latinWord);

console.log(_seeder.musicBandName);
console.log(_seeder.musicAlbumName);

console.log(_seeder.bool);
console.log(_seeder.dateAndTime());


console.log(_seeder.fromString(`hello, world, again`));
console.log(_seeder.fromArray([`hello`, `world`, `again`]));

console.log(randomNumber(0, 100));
console.log(randomDecimal (0, 100));
console.log(randomDecimal (0, 100, 5));
console.log (uniqueId());


function createPerson (_sgen)
{
    const person = 
    {
        address:{}
    };
    person.firstName = _sgen.firstName;
    person.lastName = _sgen.lastName;

    person.address.country = _sgen.country;
    person.address.city = _sgen.city(person.address.country);

    return person;
}

let persons = _seeder.toArray(10, createPerson);
console.log(persons);

console.groupEnd();


