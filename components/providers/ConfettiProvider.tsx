"use client"
import ReactConfetti from 'react-confetti'
import { useConfettiSrore } from '@/hooks/use-confetti-store'


export const ConfettiProvider = () => {
    const confetti = useConfettiSrore();
    if(!confetti.isOpen) return null;

  return (
    <ReactConfetti 
        numberOfPieces={500}
        recycle={false}
        className='pointer-events-none  z-[100]' 
        onConfettiComplete={()=>{
            confetti.onClose
        }}
    >
        
    </ReactConfetti>
  )
}
