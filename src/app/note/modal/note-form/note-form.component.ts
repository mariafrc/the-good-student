import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import {NoteService, Note} from '../../../services/note/note.service'

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit {
	@Input() action: 'add' | 'edit'
  note: any
  constructor(
  	private modalCtrl: ModalController,
  	private navParams: NavParams,
  	private noteService: NoteService
  ) { }

  ngOnInit() {
  	if(this.action === 'add')
  	{
  		this.note = {
  			title: '',
  			content: ''
  		}
  	}
  	else{
  		this.note = this.navParams.get('note')
  	}
  }

  async onSubmitForm(){
  	const newNote = await this.noteService.upsertNote(this.note)
  	this.modalCtrl.dismiss({note: this.note})
  }

}
