import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular';
import {NoteHomeComponent} from './note-home/note-home.component'
import {NoteFormComponent} from './modal/note-form/note-form.component'
import {NotePreviewComponent} from './note-preview/note-preview.component'

const routes: Routes = [
	{path: '', component: NoteHomeComponent},
  {path: ':id', component: NotePreviewComponent}
];

@NgModule({
  declarations: [
  	NoteHomeComponent,
    NoteFormComponent,
    NotePreviewComponent
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
