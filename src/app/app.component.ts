import { BookService } from './books/services/book.service';
import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from './books/interfaces/book.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { provideHttpClient } from '@angular/common/http';
import { NewBookComponent } from './books/components/new-book/new-book.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { EditBookComponent } from './books/components/book-card/edit-book/edit-book.component';
import { BookCardComponent } from './books/components/book-card/book-card.component';
import { TopBarComponent } from './books/components/top-bar/top-bar.component';
import { SearchBarComponent } from './books/components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    NewBookComponent,
    BookCardComponent,
    TopBarComponent,
    TopBarComponent,
    SearchBarComponent,
    SearchBarComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'books-app';

  bookService = inject(BookService);

  books = signal<Book[]>([]);
  filteredBooks = signal<Book[]>([]);

  selectedBook = signal<boolean>(false);

  searched: boolean = false;

  constructor() {
    this.bookService.showBooks().subscribe((data) => {
      this.books.set(data);
      this.filteredBooks.set(data); // Aquí sí están los datos disponibles
    });
  }

  onDeleteBook(bookToDelete: Book) {
    this.bookService.deleteBooks(bookToDelete.id).subscribe(() => {
      const updated = this.books().filter(
        (book) => book.id !== bookToDelete.id
      ); // Returns the elements of an array that meet the condition specified in a callback function.
      this.filteredBooks.set(updated);
    });
  }

  onBookSelected(newBook: Book) {
    console.log('Nuevo libro recibido:', newBook);
    this.filteredBooks.update((currentBooks) => [...currentBooks, newBook]);
  }

  onUpdateBook(bookToUpdate: Book) {
    console.log('Fase 3:', bookToUpdate);
    this.filteredBooks.update((currentBooks) =>
      currentBooks.map((book) =>
        book.id === bookToUpdate.id ? bookToUpdate : book
      )
    );
  }

  onSearch(input: string) {
    const query = input.toLowerCase();
    const filtered = this.books().filter((book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.isbn.toLowerCase().includes(query) ||
      book.publishedDate?.toLowerCase().includes(query)
    );
    this.filteredBooks.set(filtered);
  }
}
