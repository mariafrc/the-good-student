import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
	{ path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
  	HomeComponent
  ],
  imports: [
  	RouterModule.forChild(routes),
    CommonModule,
    IonicModule
  ]
})
export class ViewsModule { }
