import { Injectable } from '@angular/core';
import {DatabaseService} from '../database.service'
import * as moment from 'moment'

export interface Restriction{
	day: { begin: string, end: string}
	pause: { begin: string, end: string}
}

export interface Subject{
	shortname: string
	fullname: string
  professor?: string
  homework: boolean
}

export interface Hour{
	id?: string
	begin: string
	end: string
	day: string
	subject?: Subject
}

export interface Day{
  id: number
  name: string
  hours?: Array<Hour>
}

const days: Array<Day>= [
	{id: 0, name: 'Lundi'},
	{id: 1, name: 'Mardi'},
	{id: 2, name: 'Mercredi'},
	{id: 3, name: 'Jeudi'},
	{id: 4, name: 'Vendredi'},
	{id: 5, name: 'Samedi'}
]

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  constructor(private database: DatabaseService) { }

  async beforeUse(){
    await this.database.initDatabase()
  }

  async initHours(restriction: Restriction){
		await this.database.getTable('timetable_hours').query('delete').exec()
  	for(const day of days){
  		let hour = moment(restriction.day.begin, 'H:m')
  		const pauseBegin = moment(restriction.pause.begin, 'H:m')
  		const pauseEnd = moment(restriction.pause.end, 'H:m')
  		const dayEnd = moment(restriction.day.end, 'H:m')

  		//before pause
  		do{
  			await this.database.getTable('timetable_hours').query('upsert', {
  				begin: hour.format('H:m'),
  				end: hour.add(1, 'h').isAfter(pauseBegin) ? pauseBegin.format('H:m') : hour.format('H:m'),
  				dayId: day.id
  			}).exec()
  		}while(hour.isBefore(pauseBegin))

  		//after pause
  		hour = pauseEnd
  		do{
  			await this.database.getTable('timetable_hours').query('upsert', {
  				begin: hour.format('H:m'),
  				end: hour.add(1, 'h').isAfter(dayEnd) ? dayEnd.format('H:m') : hour.format('H:m'),
  				dayId: day.id
  			}).exec()
  		}while(hour.isBefore(dayEnd))
		}
  }

  private async getHours(dayId: Number): Promise< Array<Hour> >{
  	let hours = await this.database.getTable('timetable_hours')
  		.query('select')
  		.where(['dayId', '=', dayId])
  		.exec() as Array<Hour>
    hours.sort((a, b)=>{
      return Number.parseInt(a.begin) - Number.parseInt(b.begin)
    })
    return hours
  }

  async getDay(dayId: Number){
    let day: Day = days.find(d => d.id === dayId)
    day.hours = await this.getHours(dayId)
    return day
  }

  async addSubject(hours: Array<Hour>, subject: Subject){
  	for(const hour of hours){
  		hour.subject = subject
  		await this.database.getTable('timetable_hours').query('upsert', hour).exec()
  	}
  }

  async deleteSubject(hours: Array<Hour>){
  	for(const hour of hours){
  		hour.subject = null
  		await this.database.getTable('timetable_hours').query('upsert', hour).exec()
  	}
  }

  async toggleHomework(hour){
    hour.subject.homework = !hour.subject.homework
    await this.database.getTable('timetable_hours').query('upsert', hour).exec()
  }

  async deleteHours(){
    await this.database.getTable('timetable_hours').query('delete').exec()
  }
}
