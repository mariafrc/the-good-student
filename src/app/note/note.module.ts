import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular';
import {NoteHomeComponent} from './note-home/note-home.component'
import {NotePreviewComponent} from './note-preview/note-preview.component'
import {TypeChoiceComponent} from './modal/type-choice/type-choice.component'
import {TextFormComponent} from './modal/text-form/text-form.component'
import {ListFormComponent} from './modal/list-form/list-form.component'

const routes: Routes = [
	{path: '', component: NoteHomeComponent},
  {path: ':id', component: NotePreviewComponent}
];

@NgModule({
  declarations: [
  	NoteHomeComponent,
    NotePreviewComponent,
    TypeChoiceComponent,
    TextFormComponent,
    ListFormComponent
  ],
  entryComponents: [
    TypeChoiceComponent,
    TextFormComponent,
    ListFormComponent
  ],
  imports: [
  	RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class NoteModule { }
