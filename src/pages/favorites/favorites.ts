import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController } from 'ionic-angular';
import {Quote} from '../../data/quote.interface';
import {QuotesService} from '../../services/quotes';
import {QuotePage} from '../quote/quote';
import {SettingsService} from '../../services/serviceSettings';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private quotesService: QuotesService,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController,
    private SettingsService: SettingsService) {
  }
  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavoriteQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove:boolean) => {
      if (remove) {
        this.onRemoveFromFav(quote);
      }
    });
    // modal.didLeave.subscribe((remove:boolean) => {
    //   console.log(remove);
    // });
  }

  onRemoveFromFav(quote:Quote) {
    this.quotesService.removeQuoteFromFavorite(quote);
    //this.quotes = this.quotesService.getFavoriteQuotes(); // refresh the fav quotes page
    const position = this.quotes.findIndex((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    });
    this.quotes.splice(position, 1);
  }

  // onOpenMenu() {
  //   this.menuCtrl.open();
  // }
  getBackground() {
    return this.SettingsService.isAltBackground() ? 'altQuoteBg' : 'quoteBg';
  }
}
