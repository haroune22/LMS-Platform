import { create } from "zustand"

interface ConfettiStoreProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useConfettiSrore =  create<ConfettiStoreProps>((set) => ({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:true}),
}));