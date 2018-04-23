import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrandService } from './brand.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { BrandsComponent } from './brands/brands.component';
import { LogoRendererComponent } from './logo-renderer/logo-renderer.component';
import { BrandNameRendererComponent } from './brand-name-renderer/brand-name-renderer.component';


@NgModule({
  declarations: [
    AppComponent,
    BrandsComponent,
    LogoRendererComponent,
    BrandNameRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([LogoRendererComponent, BrandNameRendererComponent])
  ],
  providers: [BrandService],
  bootstrap: [AppComponent]
})
export class AppModule { }
