import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { DealService } from '../../services/deal.service';
import { GroupService } from '../../services/group.service';
import { first } from 'rxjs/operators';
import { Inbound } from '../../models/inbound';
import { Deal } from '../../models/deal';
import { InboundService } from '../../services/inbound.service';
import { StorageService } from '../../services/storage.service';

declare var $: any;
@Component({
  selector: 'app-home-expired-deal-list',
  templateUrl: './home-expired-deal-list.component.html',
  styleUrls: ['./home-expired-deal-list.component.scss'],
  providers: [
    AuthenticationService,
    DealService,
    GroupService,
    InboundService,
    StorageService
  ]
})
export class HomeExpiredDealListComponent implements OnInit {
  public expiredDealList: any;

  public currentUser: any;

  public privilege: any;

  public followingList: any;

  public noFollowing: any;

  public expiredList: any;

  public inbound = new Inbound('', '', null, '', '', '', null, null, null);

  public selectDeal = new Deal(
    null,
    '',
    null,
    null,
    '',
    '',
    false,
    false,
    false,
    ''
  );

  public selectWarehouse = '';

  public selectProductId: any;

  public isProposed: any;

  public publicWarehouse: any;

  public privateWarehouse: any;

  public selfWarehouse: any;

  public dealCreator: any;

  public selectPrivateWarehouse: any;

  public selectPublicWarehouse: any;

  constructor(
    private authenticationService: AuthenticationService,
    private dealService: DealService,
    private groupService: GroupService,
    private inboundService: InboundService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    if (this.authenticationService.currentUserValue) {
      this.currentUser = this.authenticationService.currentUserValue[0];
      if (this.authenticationService.currentUserValue[2] === 'company') {
        this.privilege = true;
        this.expiredRetrieve(this.currentUser);
      } else {
        this.privilege = false;
        this.getfollowing(this.currentUser);
      }
    } else {
      // error handle no user
    }
  }
  getfollowing(creator) {
    this.groupService
      .findfollowing(creator)
      .pipe(first())
      .subscribe(
        data => {
          this.followingList = data;
          // console.log(this.followingList);
        },
        error => {
          console.log(error);
        },
        () => {
          if (this.followingList[0]) {
            this.expiredRetrieve(this.followingList[0].company);
          } else {
            this.noFollowing = true;
          }
        }
      );
  }
  expiredRetrieve(creator) {
    this.dealService
      .expiredDealRetrieve(creator)
      .pipe(first())
      .subscribe(data => {
        this.expiredList = data;
      });
  }

  takeDeal(productId: any) {
    this.selectProductId = productId;
    if (!this.privilege) {
      this.dealCreator = this.expiredList[productId].creator;
      this.Storage(this.dealCreator);
      if (productId >= 0) {
        this.inbound.product = this.expiredList[productId].product_name;
        this.inbound.price = this.expiredList[productId].price;
        this.inbound.quantity = 0;
        this.inbound.warehouse = '';
        if (this.followingList) {
          this.inbound.company = this.followingList[0].company;
        }
        this.inbound.individual = this.currentUser;
        this.inbound.status = 0;
        this.inbound.companyStatus = 0;
        this.inbound.propose = 1;
        this.inbound.dealId = this.expiredList[productId].id;
      }
    } else {
      this.selectDeal.id = this.expiredList[productId].id;
      this.selectDeal.productName = this.expiredList[productId].product_name;
      this.selectDeal.quantity = this.expiredList[productId].quantity;
      this.selectDeal.price = this.expiredList[productId].price;
      this.selectWarehouse = '';
    }
  }

  createPropose() {
    if (this.selfWarehouse) {
      this.inbound.warehouse = this.selectPrivateWarehouse;
    } else {
      this.inbound.warehouse = this.selectPublicWarehouse;
    }
    this.inboundService
      .createPropose(this.inbound)
      .pipe(first())
      .subscribe(
        data => {
          this.isProposed = true;
          this.inbound.clear();
          this.selectProductId = null;
        },
        error => {
          console.log(error);
        },
        () => {
          this.inbound.clear();
          this.selectPrivateWarehouse = null;
          this.selectPublicWarehouse = null;
        }
      );
  }

  useSelfWarehouse() {
    this.selfWarehouse = true;
    this.inbound.publicWarehouse = false;
    this.privateStorage(this.currentUser);
  }

  usePublicWarehouse() {
    this.selfWarehouse = false;
    this.inbound.publicWarehouse = true;
  }

  Storage(dealCreator) {
    console.log(dealCreator);
    this.storageService
      .retrieve(dealCreator)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.publicWarehouse = data;
        },
        error => {
          console.log(error);
        },
        () => {
          setTimeout(() => {
            $('.selectpicker').selectpicker('refresh');
          });
        }
      );
  }

  privateStorage(creator) {
    console.log(creator);
    this.storageService
      .retrieve(creator)
      .pipe(first())
      .subscribe(
        data => {
          this.privateWarehouse = data;
        },
        error => {
          console.log(error);
        },
        () => {
          setTimeout(() => {
            $('.selectpicker').selectpicker('refresh');
          });
        }
      );
  }
}
