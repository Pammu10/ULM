
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import BookCover from './BookCover'
import { borrowRecords, users } from '@/database/schema'
import { and, eq } from 'drizzle-orm'
import { db } from '@/database/drizzle'
import BorrowBook from './BorrowBook'

interface Props extends Book {
    userId: string
}

const BookOverview = async ({
    title,
    author,
    genre,
    rating,
    totalCopies,
    availableCopies,
    description,
    coverColor,
    coverUrl,
    id,
    userId,
  } : Props) => {
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    const [borrowRecord] = await db
        .select()
        .from(borrowRecords)
        .where(
            and(
                eq(borrowRecords.bookId, id),
                eq(borrowRecords.userId, userId),
                eq(borrowRecords.status, "BORROWED")
            )
        )
        .limit(1);
        const isBorrowed = !!borrowRecord
    const borrowingElligibility = {
        isEligible: availableCopies > 0 && user.status === "APPROVED" && !isBorrowed,
        message: isBorrowed ? 'You have already borrowed this book' : availableCopies <= 0 ? 'Book is not available' : 'You are not eligible to borrow this book',
    }
  return (
    <section className='book-overview'>
        <div className='flex flex-1 flex-col gap-5'>
            <h1>{title}</h1>
            <div className='book-info'>
                <p>By <span className='font-semibold text-light-200'>{author}</span></p>
                <p>Category{" "} <span className='font-semibold text-light-200'>{genre}</span></p>
                <div className='flex flex-row gap-1'>
                    <Image src='/icons/star.svg' alt='star' width={22} height={22}/>
                    <p>{rating}</p>
                </div>
            </div>
                <div className='book-copies'>
                    <p>Total Books <span>{totalCopies}</span></p>
                    <p>Available Books <span>{availableCopies}</span></p>
                </div>
                <p className='book-description'>{description}</p>
                {user && <BorrowBook bookId = {id} userId = {userId} borrowingElligibility={borrowingElligibility}/>}
                </div>

                <div className='relative flex flex-1 justify-center'>
                    <div className='relative'>
                        <BookCover 
                        variant="wide" 
                        className="z-10"
                        coverColor={coverColor}
                        coverImage={coverUrl}
                        />
                    
                    <div className='absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden'>
                        <BookCover 
                        variant="wide" 
                        coverColor={coverColor}
                        coverImage={coverUrl}
                        />
                    </div>
                </div>
            </div>
    </section>
)
}

export default BookOverview