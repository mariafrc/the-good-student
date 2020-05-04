import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../services/database.service'
import {TimetableService} from '../services/timetable/timetable.service'
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(
  	private timetable: TimetableService,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    const permission = await Notification.requestPermission()
    console.log(permission)
    if(permission === 'granted')
      var notification = new Notification("Hi there!")
    console.log(notification)
  }

}
