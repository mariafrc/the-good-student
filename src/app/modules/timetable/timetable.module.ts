import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import {TimetableHomeComponent} from './timetable-home/timetable-home.component'
import {TimetableHoursModalComponent} from './modal/timetable-hours-modal/timetable-hours-modal.component'
import {TimetableSubjectModalComponent} from './modal/timetable-subject-modal/timetable-subject-modal.component' 
import {SubjectInfoModalComponent} from './modal/subject-info-modal/subject-info-modal.component'

const routes: Routes = [
  {path: '', component: TimetableHomeComponent},
];

@NgModule({
  declarations: [
    TimetableHomeComponent,
    TimetableHoursModalComponent,
    TimetableSubjectModalComponent,
    SubjectInfoModalComponent
  ],
  entryComponents: [
    TimetableHoursModalComponent,
    TimetableSubjectModalComponent,
    SubjectInfoModalComponent
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
