import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toggle } from 'ionic-angular';
import {SettingsService} from '../../services/serviceSettings';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private settingsService: SettingsService) {
  }

  onToggle(toggle: Toggle) {
    this.settingsService.setBackground(toggle.checked);
  }
  checkAltBackground() {
    return this.settingsService.isAltBackground();
  }
}
