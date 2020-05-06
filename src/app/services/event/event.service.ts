import { Injectable } from '@angular/core';
import {DatabaseService} from '../database.service'
import * as moment from 'moment'
moment.locale('fr')

export interface Event{
	id?: string
	label: string
	date: any
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
  	private database: DatabaseService
  ) { }

  async beforeUse(){
    await this.database.initDatabase()
  }

  async upsertEvent(event: Event): Promise<Event>{
    if(typeof event.date !== 'string')
      event.date = event.date.format()

  	const anEvent = await this.database.getTable('event').query('upsert', event).exec() as Array<Event>
    anEvent[0].date = moment(anEvent[0].date)
    return anEvent[0]
  }

  async getEvents(): Promise< Array<Event> >{
  	let events = await this.database.getTable('event').query('select').orderBy(["date ASC"]).exec() as Array<Event>
    events.forEach(e => e.date = moment(e.date))
    return events
  }

  async deleteEvent(eventId: string){
  	await this.database.getTable('event').query('delete').where(['id', '=', eventId]).exec()
  }
}
