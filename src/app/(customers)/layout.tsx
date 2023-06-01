import Header from './Header'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import '../globals.css'
export const metadata = {
  title: 'Coc Can',
  description: 'Generated by create next app',
}

function CustomerLayout({
    children,
  }: {
    children: React.ReactNode
  }){

    
  return (
    <html lang="en">
      <body className={inter.className}>
      <>
        <Header></Header>
        {children}

        </>
      </body>
    </html>
    
  )
}

export default CustomerLayout;

