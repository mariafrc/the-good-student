import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './app-svg.component.html',
  styleUrls: ['./app-svg.component.scss'],
})
export class AppSvgComponent implements OnInit {
	@Input() name: string
	@Input() color: string
  @Input() rotation: any
	fillColor: string
  constructor() { }

  ngOnInit() {
  	this.fillColor = this.color ? 'var(--ion-color-' + this.color + ')' : 'var(--ion-color-dark)'
    if(!this.rotation)
      this.rotation = 0
    else
      this.rotation = Number.parseInt(this.rotation)
    while(this.rotation > 360){
      this.rotation -= 360
    }
  }

}
