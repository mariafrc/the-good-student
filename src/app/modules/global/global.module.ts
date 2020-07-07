import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {TestComponent} from './test/test.component'

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{path: 'home', component: HomeComponent},
	{path: 'test', component: TestComponent}
];

@NgModule({
  declarations: [HomeComponent, TestComponent],
  imports: [
  	RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
  ]
})
export class GlobalModule { }
