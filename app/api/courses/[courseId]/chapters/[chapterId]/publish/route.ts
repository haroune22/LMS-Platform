import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{params}:{params:{courseId:string,chapterId:string}}){

    try {
        
        const {userId} =auth()

        if(!userId) {
            return new NextResponse('unauthorized',{status:404})
        }

        const ownCourse = await db.course.findUnique({
            where: {
              id: params.courseId,
              userId: userId,
            }
          });
      
          if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
          }

          const chapter = await db.chapter.findUnique({
            where:{
                id:params.chapterId,
                courseId:params.courseId
            }
          })
          
          const muxData = await db.muxData.findUnique({
              where:{
               chapterId:params.chapterId
            }
          })
          
          if(!chapter || !muxData || !chapter.title || ! chapter.description || !chapter.videoUrl){
            return new NextResponse('Missing required fields', {status:404})
          }
          
          const publishedChapter = await db.chapter.update({
            where:{
                id:params.chapterId,
                courseId:params.courseId
            },
            data:{
                isPublished:true
            }
          })

          return NextResponse.json(publishedChapter)

    } catch (error) {
        console.log('[CHAPTER_ID_PUBLISH',error)
        return new NextResponse('internel error',{status:500})
    }
}