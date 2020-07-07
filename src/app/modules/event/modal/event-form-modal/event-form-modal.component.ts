import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import {EventService, Event} from '../../../../services/event/event.service'
import * as moment from 'moment'

@Component({
  selector: 'app-event-form-modal',
  templateUrl: './event-form-modal.component.html',
  styleUrls: ['./event-form-modal.component.scss'],
})
export class EventFormModalComponent implements OnInit {
	@Input() action: 'add' | 'edit'
	cantSubmit: boolean = false
	event: Event
  now: string
  max: string
  constructor(
  	private modalCtrl: ModalController,
  	private eventService: EventService,
  	private navParams: NavParams
  ) { }

  ngOnInit() {
    this.now = moment().format('YYYY-MM-DDTHH:mm')
    this.max = moment().add(5, 'y').format('YYYY-MM-DDTHH:mm')
  	if(this.action === 'add'){
  		this.event = {
  			label: '',
  			date: ''
  		}
  	}
  	else{
  		this.event = this.navParams.get('event')
  		this.event.date = this.event.date.format('DD-MM-YYYY HH:mm')
  	}
  }

  async onSubmit(){
    let anEvent = await this.eventService.upsertEvent(this.event)
    this.modalCtrl.dismiss({event: anEvent})
  }

}
