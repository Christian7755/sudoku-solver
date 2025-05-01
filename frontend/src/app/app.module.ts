import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent // Standalone-Komponente wird hier importiert
  ],
  providers: [],
  bootstrap: [AppComponent] // Keine Änderung hier
})
export class AppModule { }

