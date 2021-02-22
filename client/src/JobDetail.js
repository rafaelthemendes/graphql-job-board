import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadJobById } from "./requests";

export const JobDetail = ({ match }) => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    (async function () {
      const data = await loadJobById(match.params.jobId);
      setJob(data);
    })();
  }, [match.params.jobId]);

  if (!job) return null;

  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );
};
