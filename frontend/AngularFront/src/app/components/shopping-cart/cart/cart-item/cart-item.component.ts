import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: any
  @Output() Event = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  decrement(){
    this.Event.emit({
      id : this.cartItem.id,
      quantity : this.cartItem.quantity--});
  }
  increment(){
    this.Event.emit({
      id : this.cartItem.id,
      quantity : this.cartItem.quantity++});
  }
  clear(){
    this.Event.emit({
      quantity : this.cartItem.quantity = 0});
  }
}
