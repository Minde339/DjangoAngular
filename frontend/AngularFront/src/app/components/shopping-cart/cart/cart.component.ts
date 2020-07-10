import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [];

  cartTotal = 0

  constructor(private msg:MessengerService) { }

  ngOnInit(): void {

    this.msg.getMsg().subscribe(product => {
      console.log(product)
      this.addProductToCart(product)
    })
  }
  addProductToCart(product) {

    let productExists = false

    for(let i in this.cartItems) {
      if(this.cartItems[i].id === product.id) {
        this.cartItems[i].quantity++
        productExists = true
        break;
      }
    }
    if (!productExists) {
      this.cartItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1
      })
    }
      this.cartTotal = 0
      this.cartItems.forEach(item => {
        this.cartTotal += (item.quantity * item.price)
      })
  }
}
