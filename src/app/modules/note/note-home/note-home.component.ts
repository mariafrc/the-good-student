import { Component, OnInit } from '@angular/core';
import {NoteService, Note} from '../../../services/note/note.service'
import {ModalController} from '@ionic/angular'
import { AlertController } from '@ionic/angular';
import {TypeChoiceComponent} from '../modal/type-choice/type-choice.component'
import {ListFormComponent} from '../modal/list-form/list-form.component'
import {TextFormComponent} from '../modal/text-form/text-form.component'

@Component({
  selector: 'app-note-home',
  templateUrl: './note-home.component.html',
  styleUrls: ['./note-home.component.scss'],
})
export class NoteHomeComponent implements OnInit {
	notes: Array<Note>
  constructor(
  	private noteService: NoteService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
  	await this.noteService.beforeUse()
    this.initNotes()
  }

  ionViewWillEnter(){
    if(this.notes){
      this.initNotes()
    }
  }

  async initNotes(){
    this.notes = await this.noteService.getNotes()
  }

  async onAdd(){
    const typeModal = await this.modalCtrl.create({
      component: TypeChoiceComponent,
    })

    await typeModal.present()

    let result = await typeModal.onWillDismiss()
    if(!result.data)
      return

    const modal = await this.modalCtrl.create({
      component: result.data.type === 'text' ? TextFormComponent : ListFormComponent,
      componentProps: {
        action: 'add',
      }
    })

    await modal.present()

    result = await modal.onWillDismiss()
    if(result.data){
      this.initNotes()
    }
  }
}
