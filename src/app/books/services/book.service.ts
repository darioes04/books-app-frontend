import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../interfaces/book.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';





@Injectable({
  providedIn: 'root'
})


export class BookService {


  private http = inject(HttpClient);


  showBooks(){
    return this.http.get<Book[]>(`${environment.apiUrl}/books`)
  }

  deleteBooks(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${id}`);
  }

  addBook(book: Book) {
    return this.http.post<Book>(`${environment.apiUrl}/books`, book);

  }

  updatebook(book: Book){
    return this.http.put<Book>(`${environment.apiUrl}/books`, book);
  }

  


}
