import {Component, OnInit} from '@angular/core';
import {render} from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.renderPayPalBtn();
  }

  renderPayPalBtn() {
    document.getElementById('paypalBtn').innerHTML = '<div id="paypalButtons" style="margin-left: 300px"></div>';
    render(
      {
        id: '#paypalButtons',
        value: '100',
        currency: 'USD',
        onApprove: (details) => {
          alert('Payment success!');

        }
      }
    );
  }
}
