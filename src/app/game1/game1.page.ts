import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-game1',
  templateUrl: './game1.page.html',
  styleUrls: ['./game1.page.scss']
})
export class Game1Page implements OnInit {

    constructor(public modalController : ModalController) { }

    ngOnInit() {
    }

    public async dismissModal() {
        this.modalController.dismiss();
    }

}
