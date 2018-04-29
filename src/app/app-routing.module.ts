import { NgModule } from '@angular/core';
import { BrandsComponent } from './brands/brands.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/facebook', pathMatch: 'full'},
    { path: 'facebook', component: BrandsComponent},
    { path: 'youtube', component: BrandsComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule{}