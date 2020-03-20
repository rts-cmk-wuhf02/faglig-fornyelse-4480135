import { Component, ApplicationInitStatus } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game1Page } from '../game1/game1.page';
import { Game2Page } from '../game2/game2.page';

import { startGame01 } from "./game01"
import { startGame02 } from "./game02"


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    applications : Array<PageObject> = [
        {title: "game1", page: Game1Page, script: startGame01},
        {title: "game2", page: Game2Page, script: startGame02}
    ]

    constructor(public modalController : ModalController) {
        
    }

    public async presentModal(title : string) {
        let item = this.applications.find(element => {
            return element.title == title;
        });
        
        const modal = await this.modalController.create({
            component: item.page
        });

        return await modal.present().then(function() {
            item.script();
        });
    }
}

class PageObject {
    title : string
    page : any
    script: any
}