'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"


const page = () => {

  const { toast } = useToast();
  const router = useRouter()

  //zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })
    if (result?.error) {
      if (result.error == 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: "Incorrect username or password",
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive'
        })
      }
    }
    if (result?.ok) {
      router.replace('/dashboard')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-10 space-y-4 bg-white rounded-lg shadow-md border">

        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-6">
            Join Mystery
            <br />
            Message
          </h1>

          <p className="text-lg">
            Sign in to start your anonymous adventure
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4">

            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input
                    {...field}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
            > Signin
            </Button>
          </form>
        </Form>
        <div className="text-center">
          <p>
            Not a member yet?{" "}
            <Link
              href="/sign-up"
              className="text-blue-600 hover:text-blue-800"
            >
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default page
