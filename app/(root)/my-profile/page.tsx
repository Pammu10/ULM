import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants';
import { auth, signOut } from '@/auth';
import React from 'react'
import { db } from '@/database/drizzle';
import { books, borrowRecords, users } from '@/database/schema';
import { desc, eq, inArray } from 'drizzle-orm';

const Page = async () => {
  const session = await auth();
  const userId= session?.user?.id as string
  const borrowedBooksId = await db.select({bookId: borrowRecords.bookId}).from(borrowRecords).where(eq(borrowRecords.userId, userId));
  const bookIds = borrowedBooksId.map(entry => entry.bookId);

  const borrowedBooks = await db.select().from(books).where(inArray(books.id, bookIds)) as Book[];
  return (
    <>
    <form action={async() => {
        "use server";
        await signOut();
    }}
    className='mb-10'
    >
        <Button>Logout</Button>
    </form>
    
    <BookList title='Borrowed Books' type='profile' books={borrowedBooks}/>
    </>
  )
}

export default Page