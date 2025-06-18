export interface Book {
  id: number
  title: string
  author: string
  genre: BookGenre
  yearPublished: number
  summary: string
  note?: string
  coverImageUrl?: string
  publisher?: string
  pageCount?: number
  format?: BookFormat
  language?: BookLanguage
}

export enum BookGenre {
  Fiction = 'Fiction',
  NonFiction = 'Non-Fiction',
  Mystery = 'Mystery',
  ScienceFiction = 'Science Fiction',
  Fantasy = 'Fantasy',
  Biography = 'Biography',
  History = 'History',
  Romance = 'Romance',
  Thriller = 'Thriller',
  Horror = 'Horror',
  SelfHelp = 'Self-Help',
  Children = 'Children',
  YoungAdult = 'Young Adult',
  Dystopian = 'Dystopian',
  PoliticalSatire = 'Political Satire',
}

export enum BookFormat {
  Hardcover = 'Hardcover',
  Paperback = 'Paperback',
  Ebook = 'Ebook',
  Audiobook = 'Audiobook',
}

export enum BookLanguage {
  English = 'English',
  German = 'German',
  Russian = 'Russian',
  Arabic = 'Arabic',
}
