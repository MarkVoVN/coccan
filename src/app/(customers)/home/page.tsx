import Link from 'next/link'

export default function Home() {

  return (
    <>
      <div>Home</div>
      <Link href='/login'>Log In</Link>
      <Link href='/profile'>Profile</Link>
    
    </>
  )
}