import { Component } from '@angular/core';

@Component({
  selector: 'app-ice-cream',
  template: `
    <p>{{ flavor }} Ice Cream</p>

    <p> {{ toppings | json }} </p>
    <button (click)="addTopping()">Add</button>

    {{ price }}
  `,
})
export class IceCreamComponent {

  @Emoji()
  flavor = 'vanilla';

  toppings = [];

  @Confirmable('Are you sure?')
  @Confirmable('Are you super, super sure? There is no going back!')
  addTopping(topping = 'sprinkles') {
    this.toppings.push(topping);
  }

  @WithTax(0.15)
  get price() {
    return 5.00 + 0.25 * this.toppings.length;
  }

}

/// Class
function Frozen(constructor: Function) {
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}

console.log(Object.isFrozen(IceCreamComponent));

class FroYo extends IceCreamComponent {}



/// Property
function Emoji() {
  return function(target: Object, key: string | symbol) {

    let val = target[key];

    const getter = () =>  {
        return val;
    };
    const setter = (next) => {
        console.log('updating flavor...');
        val = `🍦 ${next} 🍦`;
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });

  };
}

// Method
function Confirmable(message: string) {
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

      descriptor.value = function( ... args: any[]) {
          const allow = confirm(message);

          if (allow) {
            const result = original.apply(this, args);
            return result;
          } else {
            return null;
          }
    };

    return descriptor;
  };
}


// Accessor
function WithTax(rate: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.get;

    descriptor.get = function() {
      const result = original.apply(this);
      return (result * (1 + rate)).toFixed(2);
    };

    return descriptor;
  };
}



// Parameter
import 'reflect-metadata';

function count(target: Object, key: string | symbol, parameterIndex: number) {

  Reflect.defineMetadata('myMetadataKey', 'something', target);

}
