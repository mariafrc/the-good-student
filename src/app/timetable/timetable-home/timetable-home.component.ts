import { Component, OnInit, ViewChild } from '@angular/core';
import {TimetableService, Day, Hour} from '../../services/timetable/timetable.service'
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {TimetableHoursModalComponent} from '../modal/timetable-hours-modal/timetable-hours-modal.component'
import {TimetableSubjectModalComponent} from '../modal/timetable-subject-modal/timetable-subject-modal.component'
import {SubjectInfoModalComponent} from '../modal/subject-info-modal/subject-info-modal.component'
import {Router} from '@angular/router'

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable-home.component.html',
  styleUrls: ['./timetable-home.component.scss'],
})
export class TimetableHomeComponent implements OnInit {
  @ViewChild('f', {static: false}) editForm: any
	day: Day
  editModeOn: boolean = false
  constructor(
    private timetable: TimetableService,
    private alertController: AlertController,
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    if(!this.day){
      await this.timetable.beforeUse()
      //this.timetable.deleteHours()
      this.initDay(0)
    }
    else if(this.day.hours.length === 0){
      this.presentAlert()
    }
  }

  /* -- days -- */
  async initDay(dayId: number){
  	this.day = await this.timetable.getDay(dayId)
    if(this.day.hours.length === 0){
      this.presentAlert()
    }
  }

  async onChangeDay(dayId: number){
  	this.day = await this.timetable.getDay(dayId)
  }

  /* -- hours -- */
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Avertissement',
      message: 'Les horraires ne sont pas encore configurés.',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            this.router.navigate(['/'])
          }
        },
        {
          text: 'Configurer',
          handler: () => {
            this.presentHoursModal()
          }
        },
      ]
    })

    await alert.present()
  }

  async presentHoursModal() {
    const modal = await this.modalController.create({
      component: TimetableHoursModalComponent
    });
    await modal.present()

    await modal.onDidDismiss()
    this.initDay(this.day.id)
  }

  /* -- subjects -- */
  onToggleEdition(){
    this.editModeOn = !this.editModeOn
  }

  async onEditSubject(){
     const modal = await this.modalController.create({
      component: TimetableSubjectModalComponent,
      componentProps: {
        hours: this.selectedHours
      }
    });
    await modal.present()

    const { data } = await modal.onWillDismiss();
    if(data.action === 'submit'){
      this.editForm.reset()
      this.initDay(this.day.id)
    }
  }

  async onResetSubject(){
    await this.timetable.addSubject(this.selectedHours, {
      fullname: null,
      shortname: null,
      professor: null,
      homework: false
    })
    this.editForm.reset()
    this.initDay(this.day.id)
  }

  async onViewSubject(subject){
     const modal = await this.modalController.create({
      component: SubjectInfoModalComponent,
      componentProps: {
        subject
      }
    });
    await modal.present()
  }

  async onToggleHomework(hour){
    await this.timetable.toggleHomework(hour)
  }

  /* -- getter and setters -- */ 
  get morning(){
    return (this.day) ? this.day.hours.filter(h => Number.parseInt(h.begin) <= 12) : []
  }

  get afternoon(){
    return (this.day) ? this.day.hours.filter(h => Number.parseInt(h.begin) > 12) : []
  }

  get selectedHourCount(){
    const hourList = this.editForm.value
    let count = 0
    for (const id in hourList) {
      if(hourList[id])
        count++
    }
    return count
  }

  get selectedHours(): Array<Hour>{
    const hourList = this.editForm.value
    const selected = []
    for (const id in hourList) {
      if(hourList[id])
        selected.push(this.day.hours.find(h => h.id === id))
    }
    return selected
  }
}
