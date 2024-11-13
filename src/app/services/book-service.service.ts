import { Injectable } from '@angular/core';
import { Book } from '../commons/models/books-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      year: 2000,
      description: 'Description 1',
      coverImage: 'assets/book1.jpg',
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Author 2',
      year: 2001,
      description:
        'Description 2 Description 2 Description 2 Description 2 Description 2 Description 2 v v Description 2',
      coverImage: 'assets/book2.jpg',
    },
    {
      id: 3,
      title: 'Book 3',
      author: 'Author 3',
      year: 2002,
      description:
        'Description 3 Description 3 Description 3 Description 3 Description 3 Description 3 Description 3 Description 3 Description 3',
      coverImage: 'assets/book3.jpg',
    },
    {
      id: 4,
      title: 'Book 4',
      author: 'Author 4',
      year: 2003,
      description:
        'Description 4 Description 4 Description 4 Description 4 Description 4 Description 4 Description 4 Description 4 Description 4',
      coverImage: 'assets/book4.jpg',
    },
    {
      id: 5,
      title: 'Book 5',
      author: 'Author 5',
      year: 2004,
      description: 'Description 5',
      coverImage: 'assets/book5.jpg',
    },
    {
      id: 6,
      title: 'Hungry Wolves',
      author: 'Tara West',
      year: 2018,
      description:
        "She's desperate to sate her hunger. They're determined to possess her. Is she willing to give up her freedom for a taste of passion?\n" +
        '\n' +
        'Amara was content to live as a lone wolf, the only one of her kind—or so she’d thought. Her world was flipped on its head when a strange man with a familiar scent showed up at her work, demanding a private meeting.',
      coverImage: 'assets/hungry-wolves.jpg',
    },
    {
      id: 7,
      title: 'Million to one',
      author: 'Million',
      year: 2022,
      description:
        'Four daring young women must band together to pull off the heist of the century onboard the infamous Titanic. The new high stakes sapphic adventure from Adiba Jaigirdar, the author of Hani and Ishus Guide to Fake Dating.',
      coverImage: 'assets/million-to-one.jpg',
    },
    {
      id: 8,
      title: 'Walk into Shadow',
      author: 'Ramina Wilkinson',
      year: 2021,
      description:
        'Walking in the Shadow is a stunning account of a young life chronicling experiences children shouldn’t have to face, defied expectations, and found refuge in the most unexpected way. It is about a life that began and nearly ended in war-torn Iraq. Told with candor, sorrow, and hope, we are invited into a world of deep reflection to explore a childhood comprised of complex heritage, persecution, and the development of counter-cultural values. A childhood weighted by trauma yet filled with hope for the possibilities.',
      coverImage: 'assets/walk-into-shadow.jpg',
    },
  ];
  booksSubject = new BehaviorSubject<Book[]>(this.books);
  books$ = this.booksSubject.asObservable();

  addBook(book: Book) {
    this.books = [...this.books, { ...book, id: Date.now() }];
    this.booksSubject.next(this.books);
  }

  updateBook(updatedBook: Book) {
    this.books = this.books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book,
    );
    this.booksSubject.next(this.books);
  }

  deleteBook(id: number) {
    this.books = this.books.filter((book) => book.id !== id);
    this.booksSubject.next(this.books);
  }
}
