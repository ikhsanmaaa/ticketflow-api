import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class JiraService {

  private readonly baseUrl: string;
  private readonly username: string;
  private readonly apiKey: string;
  private readonly auth: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.getOrThrow<string>('JIRA_BASE_URL');
    this.username = this.config.getOrThrow<string>('JIRA_USERNAME');
    this.apiKey = this.config.getOrThrow<string>('JIRA_API_KEY');
    this.auth = Buffer.from(`${this.username}:${this.apiKey}`).toString('base64');
  }

  async response(params?: string) {
    return await firstValueFrom(
      this.http.get(`${this.baseUrl}${params}`,
        {
          headers: {
            Authorization: `Basic ${this.auth}`,
            Accept: 'application/json',
          },
        })

    );
  }

  async getAllIssues() {
    const params = `search/jql?jql=project=ITSM&&fields=status,summary,assignee`
    const response = this.response(params);
    return (await response).data

  };

  async getIssues(id: string) {
    const params = `issue/ITSM-${id}?fields=status,summary,assignee`
    const response = this.response(params);
    return (await response).data

  };


}
