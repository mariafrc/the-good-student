import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular';
import {NoteFormComponent} from './modal/note-form/note-form.component'

const routes: Routes = [

];

@NgModule({
  declarations: [
    NoteFormComponent,
  ],
  entryComponents: [
    NoteFormComponent
  ],
  imports: [
  	RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class NoteModule { }
