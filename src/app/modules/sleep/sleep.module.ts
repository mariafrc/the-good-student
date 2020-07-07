import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import {AppSvgComponent} from './app-svg/app-svg.component'
import {SleepHomeComponent} from './sleep-home/sleep-home.component'

const routes: Routes = [
	{path: '', component: SleepHomeComponent}
]

@NgModule({
  declarations: [
  	SleepHomeComponent,
    AppSvgComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
		FormsModule
  ]
})
export class SleepModule { }
