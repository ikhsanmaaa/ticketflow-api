import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { TicketMapper } from 'src/utils/ticket.mapper';

@Injectable()
export class JsmService {
  private readonly baseUrl: string;
  private readonly username: string;
  private readonly apiKey: string;
  private readonly auth: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.getOrThrow<string>('JSM_BASE_URL');
    this.username = this.config.getOrThrow<string>('JSM_USERNAME');
    this.apiKey = this.config.getOrThrow<string>('JSM_API_KEY');
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
    try {
      const params = `search/jql?jql=project=ITSM&&fields=status,summary,assignee&&maxResults=3`;
      const response = await this.response(params);
      return response;
    } catch (error) {
      console.error(
        'Error fetching Jsm tickets:',
        error?.response?.data || error.message,
      );
      throw error;
    }
  }

  async getIssues(id: string) {
    try {
      const params = `issue/${id}?fields=key,issuetype,summary,status,updated`;
      const response = await this.response(params);
      return TicketMapper.toResponseSingle(response);
    } catch (error) {
      console.error(
        'Error fetching Jsm tickets:',
        error?.response?.data || error.message,
      );
      throw error;
    }
  }

  async getTopFiveIssue() {
    try {
      const params = `search/jql?jql=project=ITSM&&fields=key,issuetype,summary,status,updated&&maxResults=5`;
      const response = await this.response(params);
      return TicketMapper.toResponseList(response.issues);
    } catch (error) {
      console.error(
        'Error fetching Jsm tickets:',
        error?.response?.data || error.message,
      );
      throw error;
    }
  }

  async searchIssuesByAssignee(assignee: string, maxResults: number) {
    const jql = `project = ITSM AND assignee = "${assignee}"`;

    const params = new URLSearchParams({
      jql,
      fields: 'key,assignee',
      maxResults: String(maxResults),
    });

    return this.response(`search/jql?${params.toString()}`);
  }

  async updateIssueField(issueKey: string, fieldId: string, value: unknown) {
    const response = firstValueFrom(
      this.http.put(
        `${this.baseUrl}issue/${issueKey}`,
        {
          fields: {
            [fieldId]: value,
          },
        },
        {
          headers: {
            Authorization: `Basic ${this.auth}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    try {
      const result = await response;
      if (result.status === 204) {
        return {
          success: true,
          status: result.status,
        };
      }
      return result.data;
    } catch (error) {
      console.error(
        'Error put to jira field:',
        error?.response?.data || error.message,
      );
      throw error;
    }
  }
}
