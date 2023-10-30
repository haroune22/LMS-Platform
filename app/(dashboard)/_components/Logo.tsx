import Image from 'next/image'


export const Logo = () => {
  return (
    <div className='flex items-center'>
        <Image src="/logo.svg" height={30} width={30} alt='Logo' />
        <span className='ml-4 text-[#0369a1] font-semibold'>LMS</span>
    </div>
  )
}
