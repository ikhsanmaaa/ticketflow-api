export interface JsmIssue {
  key: string;

  fields: {
    summary: string;

    updated: string;

    status: {
      name: string;
    };

    issuetype: {
      name: string;
    };
  };
}
