import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Book } from '../../commons/models/books-model';
import { BookService } from '../../services/book-service.service';
import { BookFormComponent } from '../book-form/book-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatLineModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { Subject, takeUntil } from 'rxjs';
import { ZeroScreenComponent } from '../zero-screen/zero-screen.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatLineModule,
    MatDialogModule,
    MatIconModule,
    ZeroScreenComponent,
  ],
  templateUrl: './book-list.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  unsubscribe = new Subject();
  searchQuery: string = '';

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.bookService.books$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((books) => {
        this.books = books;
        this.filteredBooks = books;
        this.applyFilter();
      });
  }

  openDetails(book: Book) {
    this.dialog.open(BookDetailsComponent, {
      data: book,
    });
  }

  openAddBookForm() {
    const dialogRef = this.dialog.open(BookFormComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((result) => {
        if (result) {
          this.bookService.addBook(result);
          this.applyFilter();
        }
      });
  }

  editBook(book: Book) {
    const dialogRef = this.dialog.open(BookFormComponent, { data: book });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((result) => {
        if (result) {
          this.bookService.updateBook(result);
          this.applyFilter();
        }
      });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id);
    this.applyFilter();
  }

  onSearch(query: any) {
    this.searchQuery = query.target.value;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredBooks = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }
}
