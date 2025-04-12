"use client";

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { borrowBook } from '@/lib/actions/book';


interface Props {
    userId: string;
    bookId: string;
    borrowingElligibility: {
        isEligible: boolean;
        message: string;
    }
}


const BorrowBook = ({userId, bookId, borrowingElligibility: {isEligible, message}}: Props) => {
    const router = useRouter();
    const [borrowing, setBorrowing] = useState(false);
    const handleBorrowing = async () => {
        if (!isEligible){
            toast.error('Error', {
                description: message,
            });
            return;
        }
        setBorrowing(true);
        try {
            const result = await borrowBook({bookId, userId});
            if (result.success){
                toast.success('Success', {
                    description: 'Book borrowed successfully',
                });
                router.push('/my-profile');
            }
            else {
                toast.error('Error', {
                    description: result.error,
                });
            }
        } catch(error){
            console.log(error);
            toast.error('Error', {
                description: 'An error occured while borrowing the book',
            });
        }
        finally {
            setBorrowing(false);
        }
    }
  return (
    <Button className='book-overview_btn' onClick={handleBorrowing} disabled={borrowing}>
    <Image src='/icons/book.svg' alt='book' width={20} height={20}/>
    <p className='font-bebas-neue text-xl text-dark-100' >{borrowing ? "Borrowing...": "Borrow Book"}</p>
</Button>
  )
}

export default BorrowBook