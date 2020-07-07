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
  maxLength: number = 10
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

  sliceTitle(text: string): string{
    if(text.length > this.maxLength)
      text = text.slice(0,this.maxLength) + ' ...'

    return text
  }

  // sliceText(text: string): string{
  //   if(text.length > this.maxLength)
  //     text = text.slice(0,this.maxLength) + '...'

  //   return text
  // }

  // sliceArray(tab: Array<any>): Array<any>{
  //   if(tab.length>2)
  //     tab = [tab[0], {name: '...'}]

  //   return tab
  // }

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

  // async onEdit(note: Note){
  //   const modal = await this.modalCtrl.create({
  //     component: note.type === 'text' ? TextFormComponent : ListFormComponent,
  //     componentProps: {
  //       action: 'edit',
  //       note: {...note}
  //     }
  //   })

  //   await modal.present()

  //   const {data} = await modal.onWillDismiss()
  //   if(data){
  //     this.initNotes()
  //   }
  // }

  // async onDeleteNote(noteId: string){
  //   const alert = await this.alertController.create({
  //     header: 'Confirmation',
  //     message: 'Voulez vous vraiment supprimer cette note?',
  //     buttons: [
  //       {
  //         text: 'Non',
  //         role: 'cancel'
  //       }, {
  //         text: 'Oui',
  //         handler: async () => {
  //           await this.noteService.deleteNote(noteId)
  //           this.notes = this.notes.filter(n => n.id !== noteId)
  //         }
  //       }
  //     ]
  //   })

  //   await alert.present()
  // }

}
