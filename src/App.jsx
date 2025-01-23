import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JobPage from './pages/JobPage';
import JobPages, { jobLoader } from './pages/JobPages';
import NotFoundPage from './pages/NotFoundPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
  
  // Firebase URL
  const firebaseURL = 'https://backend-job-hunt-hirer-portal-default-rtdb.firebaseio.com/jobs.json';

  // Add New Job
  const addJob = async (newJob) => {
    try {
      const res = await fetch(firebaseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to add job: ${res.status} - ${res.statusText} - ${JSON.stringify(errorData)}`);
      }

      const data = await res.json(); // Get the response which contains the generated key
      const generatedKey = data.name; // Access the generated key

      return generatedKey; // Return the key
    } catch (error) {
      console.error("Error adding job:", error);
      return null; // or throw the error
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`https://backend-job-hunt-hirer-portal-default-rtdb.firebaseio.com/jobs/${id}.json`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to delete job: ${res.status} - ${res.statusText} - ${JSON.stringify(errorData)}`);
      }

      console.log("Job deleted successfully");
      return true; // or handle success message
    } catch (error) {
      console.error("Error deleting job:", error);
      return false; // or handle error message
    }
  };

  // Update Job
  const updateJob = async (job) => {
    try {
      const res = await fetch(`https://backend-job-hunt-hirer-portal-default-rtdb.firebaseio.com/jobs/${job.id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to update job: ${res.status} - ${res.statusText} - ${JSON.stringify(errorData)}`);
      }

      console.log("Job updated successfully");
      return true; // or handle success message
    } catch (error) {
      console.error("Error updating job:", error);
      return false; // or handle error message
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
        <Route path="/jobs/:id" element={<JobPages deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
