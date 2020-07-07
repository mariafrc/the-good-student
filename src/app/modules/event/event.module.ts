import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';
import {EventHomeComponent} from './event-home/event-home.component'
import {EventFormModalComponent} from './modal/event-form-modal/event-form-modal.component'

const routes: Routes = [
	{path: '', component: EventHomeComponent}
];

@NgModule({
  declarations: [
  	EventHomeComponent,
    EventFormModalComponent
  ],
  entryComponents: [
    EventFormModalComponent
  ],
  imports: [
  	RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EventModule { }
