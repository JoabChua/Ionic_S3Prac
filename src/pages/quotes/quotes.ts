import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Quote} from '../../data/quote.interface';
import {QuotesService} from '../../services/quotes';

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {
  quoteGroup: {category:string, quotes:Quote[], icon:string};

  constructor(private navCtrl: NavController, 
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private quoteService: QuotesService) {
  }
  // ionViewDidLoad() {
  //   this.quoteGroup = this.navParams.data;
  // } add ? operator
  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }
  onAddToFav(selectedQuote: Quote) {
    const alert = this.alertCtrl.create({
      title: "Add Quote",
      subTitle: "Are you sure?",
      message: "Are you sure you want to add the quote?",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.quoteService.addQuoteToFavoriteQuotes(selectedQuote);
          }
        },
        {
          text: "No",
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    });
    alert.present();
  }
  onRemoveFav(quote: Quote) {
    this.quoteService.removeQuoteFromFavorite(quote);
  }
  isFav(quote:Quote){
    return this.quoteService.isQuoteFav(quote);
  }
}
