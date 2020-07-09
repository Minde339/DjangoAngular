import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [
    // {id:1, title:'new', price:150, quantity:4 },
    // {id:2, title:'new', price:100, quantity:3 },
    // {id:3, title:'new', price:150, quantity:3 },
    // {id:4, title:'new', price:200, quantity:4 },
  ];

  cartTotal = 0

  constructor(private msg:MessengerService) { }

  ngOnInit(): void {

    this.msg.getMsg().subscribe(product => {

      this.cartItems.push({

      })

      this.cartItems.forEach(item => {
        this.cartTotal += (item.quantity * item.price)
      })
    })
  }

}
