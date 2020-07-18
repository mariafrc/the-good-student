import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {version} from '../../../../../package.json'
@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit {
	version: string = version
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

}
