import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import {NoteService, Note} from '../../../../services/note/note.service'
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms'

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss'],
})
export class ListFormComponent implements OnInit {
	@Input() action: 'add' | 'edit'
  note: any
  noteForm: FormGroup
  constructor(
  	private modalCtrl: ModalController,
  	private navParams: NavParams,
  	private noteService: NoteService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  	if(this.action === 'add')
  	{
      this.noteForm = this.fb.group({
        title: ['', Validators.required],
        type: 'list',
        content: this.fb.array([])
      })
  	}
  	else{
  		const note = this.navParams.get('note')
      this.noteForm = this.fb.group({
        id: note.id,
        title: [note.title, Validators.required],
        type: 'list',
        content: this.fb.array([])
      })
      for(const content of note.content){
        const elt = this.fb.group({name: [content.name, Validators.required]})
        this.noteContent.push(elt)
      }
  	}
  }

  get noteContent(){
    return this.noteForm.get('content') as FormArray
  }

  addNote(){
    const elt = this.fb.group({
      name: ['', Validators.required]
    })
    this.noteContent.push(elt)
  }

  deleteNote(index: number){
    this.noteContent.removeAt(index)
  }

  async onSubmitForm(){
  	const newNote = await this.noteService.upsertNote(this.noteForm.value as Note)
  	this.modalCtrl.dismiss({note: this.note})
  }

}
