import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { TicketMapper } from 'src/utils/ticket.mapper';

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
    this.auth = Buffer.from(`${this.username}:${this.apiKey}`).toString(
      'base64',
    );
  }

  async response(params?: string) {
    const response = await firstValueFrom(
      this.http.get(`${this.baseUrl}${params}`, {
        headers: {
          Authorization: `Basic ${this.auth}`,
          Accept: 'application/json',
        },
      }),
    );
    return response.data;
  }

  async getAllIssues() {
    const params = `search/jql?jql=project=ITSM&&fields=status,summary,assignee&&maxResults=3`;
    const response = await this.response(params);
    return response;
  }

  async getIssues(id: string) {
    const params = `issue/${id}?fields=key,issuetype,summary,status,updated`;
    const response = await this.response(params);
    return TicketMapper.toResponseSingle(response);
  }

  async getTopFiveIssue() {
    try {
      const params = `search/jql?jql=project=ITSM&&fields=key,issuetype,summary,status,updated&&maxResults=5`;
      const response = await this.response(params);
      return TicketMapper.toResponseList(response.issues);
    } catch (error) {
      console.error(
        'Error fetching Jira tickets:',
        error?.response?.data || error.message,
      );
      throw error;
    }
  }
}
