import { db } from '@/lib/db'
import React from 'react'
import { Categories } from './_components/Categories'
import { SearchInput } from '@/components/SearchInput'
import { GetCourses } from '@/actions/get-courses'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { CoursesList } from '@/components/CoursesList'

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};


const SearchPage = async({
  searchParams
}: SearchPageProps) => {
  const { userId } = auth();

  if(!userId){
    return redirect('/')
  }

  const categoies = await db.category.findMany({
    orderBy:{
      name:'asc'
    }
  })

  const courses = await GetCourses({
    userId,
    ...searchParams,
  })
  return (
    <>
    <div className="px-6 pt-6 md:hidden md:mb-0 block">
      <SearchInput/>
    </div>
    <div className='p-6 space-y-4'>
      <Categories items={categoies} />
      <CoursesList items={courses} />
    </div>
    </>
  )
}

export default SearchPage