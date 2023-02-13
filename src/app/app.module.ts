import { NgModule } from '@angular/core';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { FormsModule } from "@angular/forms";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzTableModule } from "ng-zorro-antd/table";
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { XyzComponent } from './xyz/xyz.component';
import { TableComponent } from './common/table/table.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    XyzComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NzTableModule
  ],
  providers: [ {
    provide: NZ_I18N,
    useValue: en_US
  } ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
