import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular'

@Component({
  selector: 'app-type-choice',
  templateUrl: './type-choice.component.html',
  styleUrls: ['./type-choice.component.scss'],
})
export class TypeChoiceComponent implements OnInit {

  constructor(
  	private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  onChoose(type: string){
  	this.modalCtrl.dismiss({type})
  }

}
