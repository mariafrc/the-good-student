import { Component, OnInit, Input } from '@angular/core';
import {Subject} from '../../../services/timetable/timetable.service'
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-subject-info-modal',
  templateUrl: './subject-info-modal.component.html',
  styleUrls: ['./subject-info-modal.component.scss'],
})
export class SubjectInfoModalComponent implements OnInit {
	@Input() subject: Subject
  constructor(
  	private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

}
