import {Component, OnInit} from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];
  nameSearch: '';

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    if (this.nameSearch === undefined){
      this.nameSearch = '';
    }
    console.log('nameSearch' + this.nameSearch);
    this.findAll();
  }

  findAll() {
    this.productService.findAllByName(this.nameSearch).subscribe(next => {
      this.products = next;
    });
  }

  search() {
    this.ngOnInit();
  }
}
