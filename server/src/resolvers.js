const db = require("./db");

const Query = {
  jobs: () => db.jobs.list(),
  job: (_root, args) => db.jobs.get(args.id),
  company: (_root, args) => db.companies.get(args.id),
};

const Mutation = {
  createJob: (_root, {input}, {user}) => {
    if (!user) {
      throw new Error('Unauthorized');
    }
    const id = db.jobs.create({...input, companyId: user.companyId});
    return db.jobs.get(id);
  }
}

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

const Company = {
  jobs: (company) =>
    db.jobs.list().filter((job) => job.companyId === company.id),
};

module.exports = { Query, Mutation, Job, Company };
