"use client"

import {
     AlertDialog, 
     AlertDialogAction,
     AlertDialogCancel,
     AlertDialogContent,
     AlertDialogDescription,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogTitle,
     AlertDialogTrigger
} from "@/components/ui/alert-dialog"


interface ConfirmModelProps {
    children:React.ReactNode,
    onConfirm:()=>void;
}


export const ConfirmModel = ({children,onConfirm}:ConfirmModelProps) => {


  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you sure ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action can not be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>
                    Continue
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}
