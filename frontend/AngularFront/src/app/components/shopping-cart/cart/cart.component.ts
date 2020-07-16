import { Component, OnInit, Input } from '@angular/core';
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
      this.addProductToCart(product)
    })
  }

receiveQuantity($event) {

  let productExists = false

  for(let i in this.cartItems) {
    if(this.cartItems[i].id === $event.id) {
      this.cartItems[i].quantity
      productExists = true
      break;
    }
  }
  if (!productExists) {
    this.cartItems.push({
      id: $event.id,
      quantity: 1
    })
  }
  if ($event.quantity === 0) {
   for (let q in this.cartItems){
     if(this.cartItems[q].quantity === 0){
       this.cartItems.splice(this.cartItems[q],1)
     }
   }
  }
    this.cartTotal = 0
    this.cartItems.forEach(item => {
      this.cartTotal += (item.quantity * item.price)
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
