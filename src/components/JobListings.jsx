import React, { useState } from 'react'
import { useStat, useEffect } from 'react';
import JobListing from './JobListing'
import Spinner from './Spinner'

const JobListings = ({isHome = false}) => {
   const [jobs, setJobs] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(()=>{
    const fetchJobs = async () => {
      const apiURL = isHome ? '/api/jobs?_limit=3' : '/api/jobs'
      try { 
      const res = await fetch(apiURL); 
      const data = await res.json();
      setJobs(data); 
    } catch (error) {
      console.log("Error while fetching", error); 
    } finally {
      setLoading(false);
    }
    }
    fetchJobs(); 
   }, []);
 
  /* const jobListings = isHome ? jobs.slice(0, 3) : jobs; */
  
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
          Browse Jobs
        </h2>
        
         { loading ? (<Spinner loading={loading}/>) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jobs.map((jobs) => (
                    <JobListing key={jobs.id} jobs={jobs} />
         ))} 
            </div>
         )}        
        
      </div>
    </section>
  )
}

export default JobListings