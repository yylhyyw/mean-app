import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Deal } from '../models/deal';
import { Email } from '../models/email';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
};
@Injectable()
export class DealService {
  createDealUrl = 'http://192.168.1.90:8081/api/createdeal'; // URL to web api
  tenDealsUrl = 'http://192.168.1.90:8081/api/deal/active/firstTen';
  updateCompanyUrl = 'http://192.168.1.90:8081/api/deal/update';
  expiredDealUrl = 'http://192.168.1.90:8081/api/deal/expiredDeal';
  individualDealUrl = 'http://192.168.1.90:8081/api/deal/individualFind';
  sendNotificationUrl = 'http://192.168.1.90:8081/api/send-notification';
  giveBackQtyUrl = 'http://192.168.1.90:8081/api/deal/giveBackQty';
  // IndividualDealsUrl = 'http://192.168.1.86:8081/api/deal/active/firstTenIndivivdual';
  // updatePriceCompanyUrl = 'http://192.168.1.119:8081/api/deal/updatePrice';
  constructor(private http: HttpClient) {}

  createDeal(deal: Deal): Observable<Deal> {
    return this.http.post<Deal>(this.createDealUrl, deal, httpOptions);
  }
  emailNotification(email: Email): Observable<Email> {
    return this.http.post<Email>(this.sendNotificationUrl, email, httpOptions);
  }
  individualDeals(creator: string, individual: string): Observable<string> {
    const creatorJSON =
      '{ "creator" : ' +
      '"' +
      creator +
      '"' +
      ', ' +
      '"individual" : ' +
      '"' +
      individual +
      '"' +
      ' }';
    return this.http.post<string>(
      this.individualDealUrl,
      JSON.parse(creatorJSON),
      httpOptions
    );
  }
  tenDeals(creator: string): Observable<string> {
    const creatorJSON = '{ "creator" : ' + '"' + creator + '"' + ' }';

    // console.log(JSON.parse(creator));
    return this.http.post<string>(
      this.tenDealsUrl,
      JSON.parse(creatorJSON),
      httpOptions
    );
  }

  updateCompany(deal: Deal): Observable<Deal> {
    return this.http.post<Deal>(this.updateCompanyUrl, deal, httpOptions);
  }

  expiredDealRetrieve(creator: string): Observable<string> {
    const creatorJSON = '{ "creator" : ' + '"' + creator + '"' + ' }';
    return this.http.post<string>(
      this.expiredDealUrl,
      JSON.parse(creatorJSON),
      httpOptions
    );
  }

  giveBackQty(dealId: number, quantity: number): Observable<any> {
    const creatorJSON =
      '{ "dealId" : ' +
      '"' +
      dealId +
      '"' +
      ', ' +
      '"quantity" : ' +
      '"' +
      quantity +
      '"' +
      ' }';
    return this.http.post<any>(
      this.giveBackQtyUrl,
      JSON.parse(creatorJSON),
      httpOptions
    );
  }
}
