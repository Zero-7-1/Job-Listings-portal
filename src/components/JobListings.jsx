import React, { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiURL = isHome
        ? 'https://backend-job-hunt-hirer-portal-default-rtdb.firebaseio.com/jobs.json?_limit=3'
        : 'https://backend-job-hunt-hirer-portal-default-rtdb.firebaseio.com/jobs.json';
      try {
        const res = await fetch(apiURL);
        const data = await res.json();
        // Handle potential null data from Firebase
        setJobs(data || []); // Set to empty array if data is null
      } catch (error) {
        console.log("Error while fetching", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
          Browse Jobs
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          // Check if jobs is an array and has elements before mapping
          jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobListing key={job.id} job={job} /> // Pass the entire job object
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No jobs found.</p>
          )
        )}
      </div>
    </section>
  );
};

export default JobListings;
