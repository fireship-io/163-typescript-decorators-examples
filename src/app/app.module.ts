import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IceCreamComponent } from './ice-cream/ice-cream.component';
import { HooksComponent } from './hooks/hooks.component';

@NgModule({
  declarations: [
    AppComponent,
    IceCreamComponent,
    HooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}



