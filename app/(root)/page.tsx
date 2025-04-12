import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";


const Home = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const latestBooks = await db.select().from(books).limit(10).orderBy(desc(books.createdAt)) as Book[];
  return (
    <>
    <BookOverview {...latestBooks[0]} userId={userId as string}/>
    <BookList title="Latest Books" type="home" books={latestBooks.slice(1)} containerClassName="mt-28" userId={userId}/>
    </>
  );
}

export default Home;
