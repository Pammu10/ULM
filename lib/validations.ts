import {z} from "zod";

export const signUpSchema = z.object({
    fullName: z.string().min(3, "Full name is required"),
    email: z.string().email(),
    universityId: z.coerce.number(),
    universityCard: z.string().nonempty("UniversityCard is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),

});


export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
})


export const bookSchema = z.object({
    title: z.string().min(3, "Title is required").max(100),
    description: z.string().trim().min(10, "Description is required").max(1000),
    author: z.string().min(3, "Author is required").max(100),
    genre: z.string().min(3, "Genre is required").max(50),
    rating: z.coerce.number().min(0).max(5),
    totalCopies: z.coerce.number().int().positive().lte(10000),
    // availableCopies: z.number().min(0),
    coverColor: z.string().trim().regex(/^#[0-9A-F]{6}$/i),
    coverUrl: z.string().nonempty(),
    videoUrl: z.string().nonempty(),
    summary: z.string().trim().min(10, "Summary is required"),
})
