import UserStatusButton from '@/components/admin/UserStatusButton';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import config from '@/lib/config';
import Image from 'next/image';
import React from 'react'

const Page = async () => {
  const allUsers = await db.select().from(users);
  
  return (
    <section className='w-full rounded-2xl bg-white p-7'>
        <div className='flex flex-wrap items-center justify-center gap-2'>
            <h2 className='text-xl font-semibold'>All Users</h2>
        </div>
        <div className='mt-7 w-full overflow-x-auto'>
            <table className='w-full text-left text-sm text-dark-300 mt-10 rounded-xl overflow-hidden bg-white shadow-md' >
              <thead className="bg-light-300 text-dark-300 border-b border-dark-100">
                <tr>
                  <th className="px-6 py-4">University ID</th>
                  <th className="px-6 py-4">Full Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">University Card</th>
                  <th className='px-6 py-4'>Actions</th>
                </tr>
              </thead>
              <tbody className="border-b border-light-300 hover:bg-light-300/50 transition-colors">
                {allUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 font-medium">{user.universityId}</td>
                    <td className="px-6 py-4">{user.fullName}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.status}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                        <div className="w-full h-[60px] rounded-md overflow-hidden">
                            <Image src={config.env.imagekit.urlEndpoint + user.universityCard} alt='user' width={0} height={0} sizes="100vw" className="w-full h-full object-cover"/>
                        </div>                      
                    </td>
                    <td className='px-6 py-4'>
                        <UserStatusButton userId={user.id} currentStatus={user.status}/>
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