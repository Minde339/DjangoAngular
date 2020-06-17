import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000/api/book/";
  httpHeaders = new HttpHeaders({'Content-type' : 'application/json'})

  constructor(
    private http: HttpClient,
    private authService : AuthService) {}

  getAllBooks(): Observable <any>{
    return this.http.get(this.baseurl, 
    {headers: this.httpHeaders});
  }

  getOneBook(id): Observable <any>{
    return this.http.get(this.baseurl + id + '/', 
    {headers: this.httpHeaders});
  }
  
  CreateBook(book): Observable <any>{
    const body = {title: book.title, price: book.price, quantity: book.quantity}
    return this.http.post(this.baseurl, body,
    {headers: this.httpHeaders});
  }

  UpdateBook(book): Observable <any>{
    const body = {title: book.title, price: book.price, quantity: book.quantity}
    return this.http.put(this.baseurl + book.id + '/', body,
    {headers: this.httpHeaders});
  }

  DeleteBook(id): Observable <any>{
    return this.http.delete(this.baseurl + id + '/',
    {headers: this.httpHeaders});
  }
  
}
