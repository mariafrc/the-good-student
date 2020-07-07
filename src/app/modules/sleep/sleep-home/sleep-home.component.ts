import { Component, OnInit } from '@angular/core';
import {SleepService, SleepData} from '../../../services/sleep/sleep.service'
import * as moment from 'moment'

@Component({
  selector: 'app-sleep-home',
  templateUrl: './sleep-home.component.html',
  styleUrls: ['./sleep-home.component.scss'],
})
export class SleepHomeComponent implements OnInit {
	rhythm: string
	hours: any
	sleepData: SleepData
	hourTest: string = '00:00'
  constructor(
  	private sleepService: SleepService
  ) { }

  async ngOnInit() {
  	await this.sleepService.beforeUse()
  	this.sleepData = await this.sleepService.getSleepData()
  	this.initElements()
  }

  async onRhythmChange(){
  	await this.sleepService.upsertSleepData(this.sleepData)
  	this.initElements()
  }

  async onIncHour(){
  	this.sleepData.begin = moment(this.sleepData.begin, 'H:m').add(1, 'h').format('HH:mm')
  	await this.sleepService.upsertSleepData(this.sleepData)
  	this.initElements()
  }

  async onDecHour(){
  	this.sleepData.begin = moment(this.sleepData.begin, 'H:m').subtract(1, 'h').format('HH:mm')
  	await this.sleepService.upsertSleepData(this.sleepData)
  	this.initElements()
  }

  async onHourChange(){
  	await this.sleepService.upsertSleepData(this.sleepData)
  	this.initElements()
  }

  initElements(){
  	switch(this.sleepData.rhythm){
  		case 'monophasique':{
	  		this.hours = [
	  			{
	  				label: 'Debut',
	  				hour: this.sleepData.begin
	  			},
	  			{
	  				label: 'Fin',
	  				hour: moment(this.sleepData.begin, 'H:m').add(8, 'h').format('HH:mm')
	  			},
	  		]
  		}
  		break

  		case 'biphasique-one':{
	  		this.hours = [
	  			{
	  				label: 'Debut de la première partie',
	  				hour: this.sleepData.begin
	  			},
	  			{
	  				label: 'Fin de la première partie',
	  				hour: moment(this.sleepData.begin, 'H:m').add(4, 'h').format('HH:mm')
	  			},
	  			{
	  				label: 'Debut de la deuxième partie',
	  				hour: moment(this.sleepData.begin, 'H:m').add(6, 'h').format('HH:mm')
	  			},
	  			{
	  				label: 'Fin de la deuxième partie',
	  				hour: moment(this.sleepData.begin, 'H:m').add(10, 'h').format('HH:mm')
	  			},
	  		]
  		}
  		break

  		case 'biphasique-two':{
	  		this.hours = [
	  			{
	  				label: 'Debut du sommeil principal',
	  				hour: this.sleepData.begin
	  			},
	  			{
	  				label: 'Fin du sommeil principal',
	  				hour: moment(this.sleepData.begin, 'H:m').add(6, 'h').add(20, 'm').format('HH:mm')
	  			},
	  			{
	  				label: 'Debut de la sieste',
	  				hour: moment(this.sleepData.begin, 'H:m').add(3, 'h').add(10, 'm').add(12, 'h').subtract(24, 'm').format('HH:mm')
	  			},
	  			{
	  				label: 'Fin de la sieste',
	  				hour: moment(this.sleepData.begin, 'H:m').add(3, 'h').add(10, 'm').add(12, 'h').add(26, 'm').format('HH:mm')
	  			},
	  		]
  		}
  		break

  		case 'everyman':{
	  		this.hours = [
	  			{
	  				label: 'Debut du sommeil principal',
	  				hour: this.sleepData.begin
	  			},
	  			{
	  				label: 'Fin du sommeil principal',
	  				hour: moment(this.sleepData.begin, 'H:m').add(4, 'h').add(20, 'm').format('HH:mm')
	  			},
	  			
	  			//sieste 1
	  			{
	  				label: 'Debut de la sieste 1',
	  				hour: moment(this.sleepData.begin, 'H:m').add(3, 'h').add(10, 'm').subtract(10, 'm').format('HH:mm')
	  			},
	  			{
	  				label: 'Fin de la sieste 1',
						hour: moment(this.sleepData.begin, 'H:m').add(3, 'h').add(10, 'm').add(10, 'm').format('HH:mm')
					},

					//sieste 2
					{
	  				label: 'Debut de la sieste 2',
	  				hour: moment(this.sleepData.begin, 'H:m').add(3, 'h').add(14, 'm').subtract(14, 'm').format('HH:mm')
	  			},
	  			{
	  				label: 'Fin de la sieste 2',
						hour: moment(this.sleepData.begin, 'H:m').add(3, 'h').add(14, 'm').add(14, 'm').format('HH:mm')
					},

					//sieste 3
					{
	  				label: 'Debut de la sieste 3',
	  				hour: moment(this.sleepData.begin, 'H:m').add(3, 'h').add(18, 'm').subtract(18, 'm').format('HH:mm')
	  			},
	  			{
	  				label: 'Fin de la sieste 3',
						hour: moment(this.sleepData.begin, 'H:m').add(3, 'h').add(18, 'm').add(18, 'm').format('HH:mm')
					},
	  		]
  		}
  		break
  	}
  }

  toAngle(timeData: string):number {
  	let time = moment(timeData, 'HH:mm')
  	let hour = time.hours()
  	let min = time.minutes()
  	return +(((hour*60) + min) * 0.25)
  }
}
