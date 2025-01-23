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
    const res = await fetch(firebaseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return res.json(); // return the response data if needed
  };

  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`https://backend-job-hunt-hirer-portal-default-rtdb.firebaseio.com/jobs/${id}.json`, {
      method: 'DELETE',
    });
    return res.json(); // return the response data if needed
  };

  // Update Job
  const updateJob = async (job) => {
    const res = await fetch(`https://backend-job-hunt-hirer-portal-default-rtdb.firebaseio.com/jobs/${job.id}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return res.json(); // return the response data if needed
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
