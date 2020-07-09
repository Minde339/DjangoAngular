import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/book/book.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ApiService],
})
export class ProductListComponent implements OnInit {
  books = []
  SelectedBook;
  constructor(private api:ApiService, private msg:MessengerService) {
    this.getBooks();
    this.SelectedBook = {
      id: -1,
      title:'',
      price:'',
      quantity:'',
      image1:'',
      image2:'',
      image3:'',
    };
  }

  getBooks = () => {
    this.api.getAllBooks().subscribe(
      data => {
          this.books = data;
      },
    error => {
      console.log(error);
    }
   )
  }

  bookClicked = (book) => {
    this.api.getOneBook(book.id).subscribe(
      data => {
        this.SelectedBook = data;
        this.msg.sendMsg(this.SelectedBook)
      },
    error => {
      console.log(error);
    }
   );
  }

  ngOnInit(): void {
  }

}
