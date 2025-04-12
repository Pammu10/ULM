"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"
import { ZodType } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { FIELD_NAMES, FIELD_TYPES } from '@/constants'
import FileUpload from './FileUpload'
import {toast } from 'sonner';
import { useRouter } from 'next/navigation'



interface Props<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{success: boolean, error?: string}>;
    type: "SIGN_IN" | "SIGN_UP";

}

const AuthForm = <T extends FieldValues >({type, schema, defaultValues, onSubmit}: Props<T>) => {
    const router = useRouter()
    const isSignIn = type === "SIGN_IN";
    // 1. Define your form.
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })
 
  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
      if (result.success){
        toast.success("Success", {
            description: isSignIn ? "You have successfully signed in" : "You have successfully signed up"
        });
        router.push("/");
      }
      else {
        toast.error(isSignIn ? "Sign in failed" : "Sign up failed", {
            description: result.error
        });
      }
  }
  return (
    <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-semibol text-white'>
            {isSignIn ? "Welcome back to UML" : "Create your library account"}
        </h1>
        <p className='text-ligth-100'>
            {isSignIn ? "Access the vast collection of resources, and stay updated" : "Please complete all fields and upload a valid university ID to gain access to the library"}
        </p>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
      {Object.keys(defaultValues).map((field) => (
            <FormField 
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='capitalize'>{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                <FormControl>
                    {field.name === "universityCard" ? <FileUpload type='image' accept="image/*" placeholder="Upload your ID" folder="ids" variant="dark" onFileChange={field.onChange}/> : <Input required type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]} {...field} className='form-input' value={field.value}/>}
                  
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 
        ))}
        
        
        <Button type="submit" className='form-btn'>{isSignIn ? "Sign in" : "Sign up"}</Button>
      </form>
    </Form>
    <p className='text-center text-base font-medium'>
        {isSignIn ? "New to UML? " : "Already have an account? "} 
        <Link href={isSignIn ? "/sign-up" : "/sign-in"} className='font-bold text-primary'>{isSignIn ? "Create an account" : "Sign in"}</Link>
    </p>
    </div>
    
  )
}

export default AuthForm