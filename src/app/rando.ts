import { Injector } from '@angular/core';

export class Rando {
    static injector: Injector;
    constructor(injector: Injector) {
        Rando.injector = injector;
    }

  }

