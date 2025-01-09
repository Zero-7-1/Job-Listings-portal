import React from 'react'
import { Link } from 'react-router-dom'
import Cards from './Cards'

const HomeCards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Cards bg='bg-red-100'> 
            <h2 className="text-2xl font-bold">For Developers</h2>
            <p className="mt-2 mb-4">
              Explore current job listings, happy applying!
            </p>
            <Link
              to="/jobs"
              className="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-700">
              Browse Jobs
            </Link>
          </Cards>
          
          <Cards bg='bg-green-100'>
            <h2 className="text-2xl font-bold">For Employers</h2>
            <p className="mt-2 mb-4">
              List your requirements and find the best suited developers, hire now!
            </p>
            <Link
              to="/add-job"
              className="inline-block bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
            >
              Add Job
            </Link>
          </Cards>
        </div>
      </div>
    </section>
  )
}

export default HomeCards