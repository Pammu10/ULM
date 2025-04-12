import React from 'react'
import BookCard from './BookCard'
import { db } from '@/database/drizzle';
import { and, eq } from 'drizzle-orm';
import { borrowRecords } from '@/database/schema';

interface Props {
  title: string,
  books: Book[],
  type: 'home' | 'profile',
  containerClassName?: string,
  userId?: string
}


const BookList = async ({title, books, type, containerClassName, userId} : Props) => {
  
  if (books.length < 2 && type === 'home') return;
  let borrowedBookIds: string[] = [];
  if (userId){
    const records = await db.select({bookId: borrowRecords.bookId}).from(borrowRecords)
    .where(
      and(
        eq(borrowRecords.userId, userId),
        eq(borrowRecords.status, "BORROWED")
      )
    );
  borrowedBookIds = records.map(record => record.bookId);
  }
  return (
    
    <section className={containerClassName}>
        <h2 className='font-bebas-neue text-4xl text-light-100'>{title}</h2>
         <ul className='book-list'>
          {books.map((book) => (
            <BookCard  key={book.title} {...book} type={type} isLoanedBook={borrowedBookIds.includes(book.id)}/>
          ))}
        </ul>
    </section>
    
  )
}

export default BookList