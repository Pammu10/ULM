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