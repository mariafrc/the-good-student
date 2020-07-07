import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {TimetableService, Subject, Hour} from '../../../../services/timetable/timetable.service'

@Component({
  selector: 'app-timetable-subject-modal',
  templateUrl: './timetable-subject-modal.component.html',
  styleUrls: ['./timetable-subject-modal.component.scss'],
})
export class TimetableSubjectModalComponent implements OnInit {
	cantSubmit: boolean = false
	@Input() hours: Array<Hour>
  constructor(
  	private modalCtrl: ModalController,
  	private timetableService: TimetableService
  ) { }

  ngOnInit() {}

  async onSubmit(subject: Subject){
  	await this.timetableService.addSubject(this.hours, subject)
    //console.log({hours: this.hours, subject})
  	this.modalCtrl.dismiss({
      action: 'submit',
      subject
    })
  }

}
