'use client'

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from 'axios'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
  } from "@/components/ui/form";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";



const formSchema = z.object({
    title: z.string().min(1, {
      message: "Title is required",
    }),
  });

const CreatePage= () => {

    const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values:z.infer<typeof formSchema>)=> {
    try {

        const res = await axios.post('/api/courses',values);
        router.push(`/teacher/courses/${res.data.id}`)
        toast.success("Course created successfully")
    } catch (error) {
        toast.error("Somthing Went Wrong")
    }
  }

  return (
    <div className="mex-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
        <div className="">
            <h1 className="text-2xl">
                Name Your Course
            </h1>
            <p className="text-sm text-slate-600">
                What would you like to name your course? don&apos;t worry , you can change it later
            </p>
            <Form {...form}>
                <form 
                className="space-y-8 mt-8"
                onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    control={form.control} 
                    name='title'
                    render={({field}) =>(
                        <FormItem>
                            <FormLabel>
                                Course Title
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'Advanced Web Development"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                What will you teach in this course?
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                     <div className="flex items-center gap-x-2">
                        <Link href="/">
                            <Button
                            type="button"
                            variant="ghost"
                            >
                            Cancel
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </div>
  )
}

export default CreatePage