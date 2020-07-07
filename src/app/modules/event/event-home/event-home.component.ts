import { Component, OnInit } from '@angular/core';
import {EventService, Event} from '../../../services/event/event.service'
import { ModalController } from '@ionic/angular';
import {EventFormModalComponent} from '../modal/event-form-modal/event-form-modal.component'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.scss'],
})
export class EventHomeComponent implements OnInit {
	events: Array<Event>
  constructor(
  	private eventService: EventService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
  	await this.eventService.beforeUse()
  	this.events = await this.eventService.getEvents()
  }

  async onShowForm(action: 'add' | 'edit', event: Event | null = null){
    const modal = await this.modalCtrl.create({
      component: EventFormModalComponent,
      componentProps: {
        action
      }
    });
    await modal.present()

    await modal.onWillDismiss()
    this.events = await this.eventService.getEvents()
  }

  async onDeleteEvent(eventId: string){
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Voulez vous vraiment supprimer cet element?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel'
        }, {
          text: 'Oui',
          handler: async () => {
            await this.eventService.deleteEvent(eventId)
            this.events = this.events.filter(e => e.id !== eventId)
          }
        }
      ]
    })

    await alert.present()
  }

}
