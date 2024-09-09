import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import digitalPaymentImage from '../assets/digital-payment.avif';
import CashlyRemovedBg from '../assets/Cashly-removebg-edited.png'

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); {
    if (token) {
      navigate('/dashboard');
    }
  }
  return (

    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-20 lg:px-28 h-14 flex items-center bg-gradient-to-r from-[#ff6b6b] via-[#ffa500] to-[#8b008b] text-primary-foreground">

        <img className='w-32' src={CashlyRemovedBg} alt="logo" />

        <nav className="ml-auto flex gap-4 sm:gap-10 lg:gap-16">
          <Link to={'/signin'} className="text-base font-medium hover:underline underline-offset-4" >
            Login
          </Link>
          <Link to={'/signup'} className="text-base font-medium hover:underline underline-offset-4" >
            SignUp
          </Link>
        </nav>
      </header>
      <main className="flex flex-col  items-center ">
        <section className="w-11/12 py-12  md:py-20 ">
          <div className="container px-4 md:px-6">
            <div className="grid  lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2 ">
                  <h1 className="text-3xl pb-5 font-bold tracking-tighter sm:text-5xl xl:text-8xl/none">
                    Seamless Digital Payments

                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Cashly is the most trusted and convenient way to make digital payments. Experience the future of finance with Cashly.
                  </p>
                </div>
                <div className="flex flex-col pt-5 gap-2 min-[400px]:flex-row">

                  <Link
                    to={'/signin'}
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gradient-to-r from-[#ff6b6b] via-[#ff7b00] to-[#f4d005] hover:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <img
                src={digitalPaymentImage}
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full sm:pt-12 lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-11/12  md:py-24 lg:py-4 bg-white text-muted-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">

                <h2 className="text-3xl pb-5 font-bold tracking-tighter sm:text-8xl bg-gradient-to-r from-[#ff6b6b] via-[#ffa500] to-[#8b008b] bg-clip-text text-transparent">
                  Your Wallet ,  Reimagined
                </h2>
                <p className="max-w-[full] text-muted-foreground md:text-2xl ">
                  Unlock the power of digital payments and experience financial freedom like never before
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-11/12 py-12 md:py-24 lg:pb-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4 w-full h-auto border-gray-500 border-2 p-5 rounded-2xl">
              <CreditCardIcon className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Simplify your Financial Life</h3>
              <p className="text-muted-foreground text-lg">Effortlessly manage all your payment needs in one place.</p>
            </div>
            <div className="space-y-4 w-full h-auto border-gray-500 border-2 p-5 rounded-2xl">
              <ShieldIcon className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Secure, Instant transactions</h3>
              <p className="text-muted-foreground text-lg">Rest assured with our robust security measures.</p>
            </div>
          </div>
        </section>
        <section className="w-11/12 py-12 md:pb-24 lg:pb-32  text-primary-foreground">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-7xl/tight text-black">
                Revolutionize Your Payments
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get Started with Cashly and enjoy a seamless, secure, and convenient digital payments experience.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gradient-to-r from-[#ff6b6b] via-[#ffa500] to-[#8b008b] text-primary-foreground">
        <p className="text-xs">&copy; 2024 Cashly. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <span className="text-xs hover:underline underline-offset-4" >
            Privacy
          </span>
          <span className="text-xs hover:underline underline-offset-4" >
            Security
          </span>
          <span className="text-xs hover:underline underline-offset-4" >
            Support
          </span>
        </nav>
      </footer>
    </div>
  )
}
function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}




function ShieldIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}


export default Home