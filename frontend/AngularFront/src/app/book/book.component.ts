import { Component, OnInit } from '@angular/core';
import { ApiService } from './book.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [ApiService],
})
export class BookComponent implements OnInit {
  books = [{title : 'test'}];
  SelectedBook;

  constructor(private api:ApiService){
    this.getBooks();
    this.SelectedBook = {
      id: -1,
      title:'',
      price:'',
      quantity:'',
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
      },
    error => {
      console.log(error);
    }
   );
  }

  updateBook = () => {
    this.api.UpdateBook(this.SelectedBook).subscribe(
      data => {
        this.getBooks();
      },
    error => {
      console.log(error);
    }
   );
  }

  createBook = () => {
    this.api.CreateBook(this.SelectedBook).subscribe(
      data => {
        this.books.push(data);
      },
    error => {
      console.log(error);
    }
   );
  }

  deleteBook = () => {
    this.api.DeleteBook(this.SelectedBook.id).subscribe(
      data => {
        this.getBooks();
      },
    error => {
      console.log(error);
    }
   );
  }

  ngOnInit(): void {
  }

}
