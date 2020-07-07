import { Component, OnInit } from '@angular/core';
import {NoteService, Note} from '../../../services/note/note.service'
import {ActivatedRoute, Router} from '@angular/router'
import { AlertController } from '@ionic/angular';
import {ModalController} from '@ionic/angular'
import {TextFormComponent} from '../modal/text-form/text-form.component'
import {ListFormComponent} from '../modal/list-form/list-form.component'

@Component({
  selector: 'app-note-preview',
  templateUrl: './note-preview.component.html',
  styleUrls: ['./note-preview.component.scss'],
})
export class NotePreviewComponent implements OnInit {
	note: Note
  constructor(
  	private noteService: NoteService,
  	private route: ActivatedRoute,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  async ngOnInit() {
  	this.note = await this.noteService.getNote(this.route.snapshot.params['id'])
    if(!this.note)
      this.router.navigate(['/note'])
  }

  async onShowForm(){
    const modal = await this.modalCtrl.create({
      component: this.note.type === 'text' ? TextFormComponent : ListFormComponent,
      componentProps: {
        action: 'edit',
        note: {...this.note}
      }
    })

    await modal.present()

    const {data} = await modal.onWillDismiss()
    if(data){
      this.note = await this.noteService.getNote(this.route.snapshot.params['id'])
    }
  }

  async onDeleteNote(){
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
            await this.noteService.deleteNote(this.note.id)
            this.router.navigate(['/note'])
          }
        }
      ]
    })

    await alert.present()
  }

}
