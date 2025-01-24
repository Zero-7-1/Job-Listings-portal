import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiURL = isHome
        ? 'https://backend-job-hunt-hirer-portal-default-rtdb.firebaseio.com/jobs.json?orderBy="$key"&limitToFirst=3' // Limit to 3 for homepage
        : 'https://backend-job-hunt-hirer-portal-default-rtdb.firebaseio.com/jobs.json'; // Fetch all jobs for Browse Jobs page

      try {
        const res = await fetch(apiURL);
        const data = await res.json();

        // Convert the Firebase object into an array, and format it properly
        const jobsArray = Object.entries(data || {}).map(([id, job]) => ({
          id,
          ...job,
          contactEmail: job.company?.contactEmail || 'No email available',
          contactPhone: job.company?.contactPhone || 'No phone available',
          companyName: job.company?.name || 'No company name available',
          companyDescription: job.company?.description || 'No description available',
        }));

        setJobs(jobsArray);
      } catch (error) {
        console.error('Error fetching data', error);
        setJobs([]); // Fallback to empty array if fetching fails
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          {isHome ? 'Browse Jobs' : 'All Jobs'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;


