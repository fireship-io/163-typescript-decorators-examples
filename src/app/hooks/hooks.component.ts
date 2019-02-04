import { Component } from '@angular/core';

@Component({
  selector: 'app-hooks',
  template: `
    <p>You clicked {{count}} times</p>
    <button (click)="setCount(count + 1)">Click Me</button>
  `,
})
export class HooksComponent {

  @UseState(0) count; setCount;

  @UseEffect()
  onEffect() {
    document.title = `You clicked ${this.count} times`;
  }

}

function UseState(seed: any) {
  return function (target, key) {
    target[key] = seed;
    target[`set${key.replace(/^\w/, c => c.toUpperCase())}`] = (val) => target[key] = val;
  };
}


function UseEffect() {
  return function (target, key, descriptor) {
    target.ngOnInit = descriptor.value;
    target.ngAfterViewChecked = descriptor.value;
  };
}


