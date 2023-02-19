import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';
import { AppComponent } from './app.component';
import { SocialsComponent } from './components/socials.component';

@NgModule({
  declarations: [
    AppComponent,
    SocialsComponent,
  ],
  imports: [
    AutosizeModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
