import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import Link from 'next/link'
import React from 'react'

const Page = async () => {
  const allBooks = await db.select().from(books);
  return (
    <section className='w-full rounded-2xl bg-white p-7'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
            <h2 className='text-xl font-semibold'>All Books</h2>
            <Button className='bg-primary-admin' asChild>
                <Link href="/admin/books/new" className='text-white'>+ Create a New Book</Link> 
            </Button>
        </div>
        <div className='mt-7 w-full overflow-hidden'>
            <table className='w-full text-left text-sm text-dark-300 mt-10 rounded-xl overflow-hidden bg-white shadow-md'>
              <thead className="bg-light-300 text-dark-300 border-b border-dark-100">
                <tr>
                  <th className="px-6 py-4">Book Title</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Genre</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Total Copies</th>
                  <th className="px-6 py-4">Available Copies</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="border-b border-light-300 hover:bg-light-300/50 transition-colors">
                {allBooks.map((book) => (
                  <tr key={book.id}>
                    <td className="px-6 py-4 font-medium">{book.title}</td>
                    <td className="px-6 py-4">{book.author}</td>
                    <td className="px-6 py-4">{book.genre}</td>
                    <td className="px-6 py-4">{book.rating}</td>
                    <td className="px-6 py-4">{book.totalCopies}</td>
                    <td className="px-6 py-4">{book.availableCopies}</td>
                    <td className="px-6 py-4">
                      <Button variant="link" asChild className="text-primary-admin hover:underline">
                        <Link href={`/books/${book.id}`}>View</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
        </div>
    </section>
  )
}

export default Page