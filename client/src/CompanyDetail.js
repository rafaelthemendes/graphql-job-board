import React, { useEffect, useState } from "react";
import { loadCompanyById } from "./requests";

export const CompanyDetail = ({ match }) => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    (async function () {
      const data = await loadCompanyById(match.params.companyId);
      setCompany(data);
    })();
  }, [match.params.companyId]);

  if (!company) return null;

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
    </div>
  );
};
