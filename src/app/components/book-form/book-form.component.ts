import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Book } from '../../commons/models/books-model';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../services/book-service.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  animations: [
    trigger('dynamicAppear', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(50px) rotate(90deg) scale(0.8)',
        }),
        animate(
          '0.7s ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0) rotate(0) scale(1)',
          }),
        ),
      ]),
    ]),
  ],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BookFormComponent>,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: Book | null,
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      id: [this.data?.id || null],
      title: [this.data?.title || '', Validators.required],
      author: [this.data?.author || '', Validators.required],
      year: [this.data?.year || null, [Validators.required, Validators.min(0)]],
      description: [this.data?.description || ''],
      coverImage: [this.data?.coverImage ?? 'assets/cover-not-found.jpg'],
    });
  }

  saveBook(formValue: Book): void {
    this.dialogRef.close(this.bookForm.value);
    this.bookService.updateBook(formValue);
  }
}
