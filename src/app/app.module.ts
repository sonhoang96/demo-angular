import { NgModule } from '@angular/core';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzTableModule } from "ng-zorro-antd/table";
import { NzButtonModule} from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { XyzComponent } from './xyz/xyz.component';
import { TableComponent } from './common/table/table.component';
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";

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
        NzTableModule,
        NzButtonModule,
        NzIconModule,
        NzLayoutModule,
        NzGridModule,
        NzInputModule,
        NzSelectModule,
        NzModalModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputNumberModule,
        NzPopconfirmModule
    ],
  providers: [ {
    provide: NZ_I18N,
    useValue: en_US
  } ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
