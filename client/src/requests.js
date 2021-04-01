import { isLoggedIn, getAccessToken } from './auth';
const endpointURL = "http://localhost:9000/graphql";

async function graphqlRequest(query, variables = {}) {
  const request = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  if (isLoggedIn()) {
    request.headers['authorization'] = `Bearer ${getAccessToken()}`;
  }
  
  const response = await fetch(endpointURL, request);
  const responseBody = await response.json();
  if (responseBody.errors) {
    const message = responseBody.errors
      .map((error) => error.message)
      .join("\n");
    throw new Error(message);
  }
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

export async function loadCompanyById(companyId) {
  const query = `query LoadCompany($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }`;
  const variables = {
    id: companyId,
  };
  const { company } = await graphqlRequest(query, variables);
  return company;
}

export async function createJob({ title, description }) {
  const mutation = `mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      id
      title
      description
      company {
        id
        name
        description
      }
    }
  }`;
  const variables = {
    input: {
      title,
      description,
    },
  }
  const { job } = await graphqlRequest(mutation, variables);
  return job;
}
