import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {Restriction, TimetableService} from '../../../../services/timetable/timetable.service'
import { ModalController } from '@ionic/angular';
import * as moment from 'moment'

@Component({
  selector: 'app-timetable-hours-modal',
  templateUrl: './timetable-hours-modal.component.html',
  styleUrls: ['./timetable-hours-modal.component.scss'],
})
export class TimetableHoursModalComponent implements OnInit {
	restrictionForm: FormGroup
	cantSubmit: boolean = false
  showAlert: boolean = false
  constructor(
  	private fb: FormBuilder,
  	private timetableService: TimetableService,
  	private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.timetableService.getDay(0).then((day)=>{
      if(day.hours.length !== 0)
        this.showAlert = true
    })

  	const dayForm = this.fb.group({
  		begin: ['', Validators.required],
  		end: ['', Validators.required]
  	})
  	const pauseForm = this.fb.group({
  		begin: ['', Validators.required],
  		end: ['', Validators.required]
  	})

  	this.restrictionForm = this.fb.group({
  		day: dayForm,
  		pause: pauseForm
  	})
  }

  async onSubmit(){
  	this.cantSubmit = true
    const restriction: Restriction = {
      day: {
        begin: moment(this.day.begin).format('HH:mm'),
        end: moment(this.day.end).format('HH:mm')
      },
      pause: {
        begin: moment(this.pause.begin).format('HH:mm'),
        end: moment(this.pause.end).format('HH:mm')
      }
    }
  	await this.timetableService.initHours(restriction)
  	this.modalCtrl.dismiss()
  }

  onHourChange(){
    const dayBegin = moment(this.day.begin)
    const dayEnd = moment(this.day.end)
    const pauseBegin = moment(this.pause.begin)
    const pauseEnd = moment(this.pause.end)

    if(dayEnd.isBefore(dayBegin))
      this.dayEnd = ''

    if(pauseBegin.isBefore(dayBegin) || pauseBegin.isAfter(dayEnd))
      this.pauseBegin = ''

    if(pauseEnd.isBefore(pauseBegin) || pauseEnd.isAfter(dayEnd))
      this.pauseEnd = ''
  }

  /* -- Getters and Setters -- */
  get day(){
    return this.restrictionForm.value.day
  }

  get pause(){
    return this.restrictionForm.value.pause
  }

  set dayEnd(value){
    this.restrictionForm.patchValue({day: {end: value}})
  }

  set pauseBegin(value){
    this.restrictionForm.patchValue({pause: {begin: value}})
  }

  set pauseEnd(value){
    this.restrictionForm.patchValue({pause: {end: value}})
  }
}
