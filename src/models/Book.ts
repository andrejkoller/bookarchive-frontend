export interface Book {
  id: number
  title: string
  author: string
  genre: BookGenre
  yearPublished: number
  summary: string
  note?: string
  file: File | undefined
  fileName: string
  filePath: string
  previewImage?: string
  publisher?: string
  pageCount?: number
  format?: BookFormat
  language?: BookLanguage
}

export enum BookGenre {
  Fiction = 'Fiction',
  NonFiction = 'NonFiction',
  Mystery = 'Mystery',
  ScienceFiction = 'ScienceFiction',
  Fantasy = 'Fantasy',
  Biography = 'Biography',
  History = 'History',
  Romance = 'Romance',
  Thriller = 'Thriller',
  Horror = 'Horror',
  SelfHelp = 'SelfHelp',
  Children = 'Children',
  YoungAdult = 'Young Adult',
  Dystopian = 'Dystopian',
  PoliticalSatire = 'PoliticalSatire',
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
