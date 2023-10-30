'use client';

import { ConfirmModel } from "@/components/models/ConfirmModel";
import { Button } from "@/components/ui/button";
import { useConfettiSrore } from "@/hooks/use-confetti-store";
import axios from "axios";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";



interface ActionsProps {
    isPublished:boolean; 
    disabled:boolean;
    courseId: string;
  };

  
  export const Actions = ({disabled,isPublished,courseId}:ActionsProps) => {

    const router = useRouter()
    const [isLoading,setIsLoading]= useState(false)
    const confetti = useConfettiSrore();
      const onClick = async()=>{
        try {
            setIsLoading(true)
            if(isPublished){
                await axios.patch(`/api/courses/${courseId}/unpublish`)
    
                toast.success('Course Unpublished')
                
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`)
    
                toast.success('Course Published')
                confetti.onOpen()
            }
            
            router.refresh()
        } catch (error) {
            toast.error('somthing went Wrong')
        }finally{
            setIsLoading(false)
        }
      }

 
      const onDelete = async()=>{
        try {
            setIsLoading(true)
            await axios.delete(`/api/courses/${courseId}`)

            toast.success('Course deleted')
            router.refresh()
            router.push(`/teacher/courses`)

        } catch (error) {
            toast.error('somthing went Wrong')
        }finally{
            setIsLoading(false)
        }
      }

    return (
        <div className="flex items-center gap-x-2">
            <Button 
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Unpublish" : "Publish"}

            </Button>
            <ConfirmModel onConfirm={onDelete} >
                <Button disabled={isLoading} size='sm'>
                    <Trash className="h-4 w-4"/>
                </Button>
            </ConfirmModel>
        </div>
  )
}
