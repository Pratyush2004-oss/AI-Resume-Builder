import Header from '@/components/custom/Header'
import { UserButton } from '@clerk/clerk-react'
import { AtomIcon, Edit, Share2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Header />
      <div>
        {/* <img src={'/grid.svg'} className="absolute z-[-10] w-full" 
      width={1200} height={300} /> */}
        {/* <Header/> */}
        <section className="z-50 ">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
            <a href="#" className="inline-flex items-center justify-between px-1 py-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full mb-7 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
              <span className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">Tubeguruji.com All new Apps</span>
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
            </a>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Build Your Resume <span className='text-primary'>With AI</span> </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Effortlessly Craft a Standout Resume with Our AI-Powered Builder</p>
            <div className="flex flex-col mb-8 space-y-4 lg:mb-16 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <Link to={'/dashboard'} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Get Started
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </Link>
              <a href="https://youtu.be/Q5LM985yUmQ" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                Watch video
              </a>
            </div>
          </div>
        </section>
        <section className="z-50 max-w-screen-xl px-4 py-8 mx-auto text-center bg-white lg:py-16 lg:px-12">
          <h2 className="text-3xl font-bold">How it Works?</h2>
          <h2 className="text-gray-500 text-md">Give mock interview in just 3 simplar easy step</h2>

          <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="block p-8 transition bg-white border border-gray-200 shadow-xl rounded-xl hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <AtomIcon className='w-8 h-8' />

              <h2 className="mt-4 text-xl font-bold text-black">Write promot for your form</h2>

              <p className="mt-1 text-sm text-gray-600">
                Give Basic details and get the relevant information from the AI andedit it and then add it in your Resume.
              </p>
            </a>

            <a
              className="block p-8 transition bg-white border border-gray-200 shadow-xl rounded-xl hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Edit className='w-8 h-8' />

              <h2 className="mt-4 text-xl font-bold text-black">Edit Your form </h2>

              <p className="mt-1 text-sm text-gray-600">
                Edit the details in Your previous resume and save for later.
              </p>
            </a>

            <a
              className="block p-8 transition bg-white border border-gray-200 shadow-xl rounded-xl hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Share2 className='w-8 h-8' />

              <h2 className="mt-4 text-xl font-bold text-black">Share & Start Accepting Responses</h2>

              <p className="mt-1 text-sm text-gray-600">
                Share and download your resume and share it to your friends and recruiters.
              </p>
            </a>


          </div>

          <div className="mt-12 text-center">
            <Link
              to={"/auth/sign-in"}
              className="inline-block px-12 py-3 text-sm font-medium text-white transition bg-pink-600 rounded hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </div>

    </div>
  )
}

export default Home