import React from 'react'
import ShortUrlForm from '../components/UrlForm'
import { Link } from 'lucide-react'
import UserUrl from '../components/UserUrl'
import Navbar from '../components/Navbar'

function DashboardPage() {
    return (
        <main className="min-h-screen bg-gray-100 py-24 lg:pl-65" >
            <Navbar />
            <div className="flex flex-col items-center justify-around px-5">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-indigo-100 flex items-center justify-center">
                            <Link className="w-7 h-7 text-indigo-600" />
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Shorten Your URL
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Make your long links short, simple and shareable.
                        </p>
                    </div>

                    < h1 className="text-2xl font-bold text-center mb-6" > URL Shortener</h1 >
                    <ShortUrlForm />
                    <UserUrl />
                </div >
            </div>
        </main >
    )
}

export default DashboardPage
