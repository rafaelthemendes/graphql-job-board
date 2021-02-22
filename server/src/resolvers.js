const db = require("./db");

const Query = {
  jobs: () => db.jobs.list(),
  job: (_root, args) => db.jobs.get(args.id)
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

module.exports = { Query, Job };
