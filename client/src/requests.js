const endpointURL = "http://localhost:9000/graphql";

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(endpointURL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const responseBody = await response.json();
  return responseBody.data;
}

export async function loadJobs() {
  const query = `query LoadJobs {
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }`;
  const { jobs } = await graphqlRequest(query);
  return jobs;
}

export async function loadJobById(jobId) {
  const query = `query LoadJob($id: ID!) {
    job(id: $id) {
      id
      title
      description
      company {
          id
          name
      }
    }
  }`;
  const variables = {
    id: jobId,
  };
  const { job } = await graphqlRequest(query, variables);
  return job;
}
