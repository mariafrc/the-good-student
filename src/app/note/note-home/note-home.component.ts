import { Component, OnInit } from '@angular/core';
import {NoteService, Note} from '../../services/note/note.service'
import {ModalController} from '@ionic/angular'
import {NoteFormComponent} from '../modal/note-form/note-form.component'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-note-home',
  templateUrl: './note-home.component.html',
  styleUrls: ['./note-home.component.scss'],
})
export class NoteHomeComponent implements OnInit {
	notes: Array<Note>
  maxLength: number = 70
  constructor(
  	private noteService: NoteService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
  	await this.noteService.beforeUse()
    this.initNotes()
  }

  async initNotes(){
    let notes = await this.noteService.getNotes()
    notes.forEach(n=>{
      if(n.content.length > this.maxLength)
        n.content = n.content.slice(0,this.maxLength) + '...'
    })
    this.notes = notes
  }

  async onShowForm(action: 'add' | 'edit', note: Note = null){
    const modal = await this.modalCtrl.create({
      component: NoteFormComponent,
      componentProps: {
        action,
        note: note ? {...note} : null
      }
    })

    await modal.present()

    const {data} = await modal.onWillDismiss()
    if(data){
      this.initNotes()
    }
  }

  async onDeleteNote(noteId: string){
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez vous vraiment supprimer cette note?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel'
        }, {
          text: 'Oui',
          handler: async () => {
            await this.noteService.deleteNote(noteId)
            this.notes = this.notes.filter(n => n.id !== noteId)
          }
        }
      ]
    })

    await alert.present()
  }

}
