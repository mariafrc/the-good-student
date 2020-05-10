import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import {NoteService, Note} from '../../../services/note/note.service'

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.scss'],
})
export class TextFormComponent implements OnInit {
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
  			content: '',
        type: 'text'
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
