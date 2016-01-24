# plz.js

Describe your UI with Gherkin-like natural language.

Uses RxJS.

## [Example](http://aapee.kapsi.fi/plzjs/examples/hello/)
HTML:
```
<input class="input" placeholder="Type here plz">
<button class="btn">Click me plz</button>
<p class="result"></p>
```
ES6:
```
when('user').typesTo('.input')
  .then('app').produces((value) => `Hello ${value}`).to('.result')
  .plz();

when('user').clicks('.btn')
  .then('app').produces('Hello world!').to('.result')
  .and(() => { alert('You clicked the button!'); })
  .plz();
```
That's all!
