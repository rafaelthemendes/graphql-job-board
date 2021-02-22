import React, { useEffect, useState } from "react";
import { JobList } from "./JobList";
import { loadJobs } from "./requests";

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async function () {
      const data = await loadJobs();
      setJobs(data);
    })();
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
};
