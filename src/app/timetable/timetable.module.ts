import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import {TimetableHoursModalComponent} from './modal/timetable-hours-modal/timetable-hours-modal.component'
const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    TimetableHoursModalComponent,
  ],
  entryComponents: [
    TimetableHoursModalComponent,
  ],
  imports: [
  	RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TimetableModule { }
