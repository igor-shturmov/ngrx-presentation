export type Books = Array<Book>;

export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  publisher?: string;
  publishedDate?: string;
  coverUrl?: string;
  isAdded?: boolean;
}

export interface ReadingListItem extends Omit<Book, 'id'> {
  bookId: string;
  finished?: boolean;
  finishedDate?: string;
}

export interface BooksResponse {
  totalItems: string;
  items: Array<Partial<any>>;
}
