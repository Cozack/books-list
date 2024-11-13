import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { Book } from '../../commons/models/books-model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../services/book-service.service';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    BookFormComponent,
  ],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {
  isEditBook = false;

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public book: Book,
  ) {}

  openBookDetails(): void {
    this.isEditBook = !this.isEditBook;
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id);
    this.dialog.closeAll();
  }
}
