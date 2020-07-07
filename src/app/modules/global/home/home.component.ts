import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {InfoModalComponent} from '../info-modal/info-modal.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async onShowModal(){
  	const modal = await this.modalCtrl.create({
      component: InfoModalComponent
    });
    await modal.present()
  }

}
