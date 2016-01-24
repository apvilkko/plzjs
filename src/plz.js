import {Observable} from 'rxjs-es/Observable';
import 'rxjs-es/add/observable/fromEvent';
import 'rxjs-es/add/operator/pluck';


function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length ? fn.call(this, ...args) :
      (...rest) => {
        return curried.call(this, ...args, ...rest);
      };
  };
}

function addToChain(obj, key, what) {
  obj.chain.push({
    key: key,
    value: what
  });
  return obj;
}

function get(chain, key) {
  var found = chain.filter((item) => {
    if (typeof key === 'string') {
      return item.key === key;
    } else {
      return key.find(x => x === item.key);
    }
  });
  if (found.length > 0) {
    return found[0].value;
  }
}

function plz(data) {
  var event$ = get(data.chain, ['clicks', 'typesTo']);
  var product = get(data.chain, 'produces');
  var where = get(data.chain, 'to');
  var and = get(data.chain, 'and');

  event$.subscribe((event) => {
    var value = product;
    if (typeof product === 'function') {
      value = product(event);
    }
    document.querySelector(where).innerHTML = value;
    if (and) {
      and();
    }
  });
}

function to(data, where) {
  data = addToChain(data, 'to', where);
  data.plz = () => {
    plz(data);
  };
  return data;
}

function clicks(data, what) {
  var event$ = Observable.fromEvent(document.querySelector(what), 'click');
  data = addToChain(data, 'clicks', event$);
  return data;
}

function typesTo(data, where) {
  var event$ = Observable.fromEvent(document.querySelector(where), 'keyup')
    .pluck('target', 'value');
  data = addToChain(data, 'typesTo', event$);
  return data;
}

function chainable(name) {
  return function (data, value) {
    data = addToChain(data, name, value);
    return data;
  };
}

var methods = {
  to: to,
  produces: chainable('produces'),
  then: chainable('then'),
  clicks: clicks,
  typesTo: typesTo,
  and: chainable('and')
};

function createMethod(methodName, data) {
  data[methodName] = curry(methods[methodName])(data);
}

function when(who) {
  var data = addToChain({chain: []}, 'when', who);
  Object.keys(methods).forEach((method) => {
    createMethod(method, data);
  });
  return data;
}

export default when;
