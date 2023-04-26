import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  num = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  decrement() {
    this.num--;
    if (this.num < 0) {
      this.num = 0;
    }
  }

  increment() {
    this.num++;
  }
}
