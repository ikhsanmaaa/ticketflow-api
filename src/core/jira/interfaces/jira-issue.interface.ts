export interface JiraIssue {
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
