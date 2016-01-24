import when from '../../src/plz';

when('user').typesTo('.input')
  .then('app').produces((value) => `Hello ${value}`).to('.result')
  .plz();

when('user').clicks('.btn')
  .then('app').produces('Hello world!').to('.result')
  .and(() => { alert('You clicked the button!'); })
  .plz();
