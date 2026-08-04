import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id';
import { JiraIssue } from 'src/core/jira/interfaces/jira-issue.interface';
import { TicketResponseDto } from 'src/core/jira/dto/ticket-response';

dayjs.extend(relativeTime);
dayjs.locale('id');
export class TicketMapper {
  static toResponseSingle(issue: JiraIssue): TicketResponseDto {
    return {
      key: issue.key,

      summary: issue.fields.summary,

      status: issue.fields.status.name,

      issueType: issue.fields.issuetype.name.replace('[System]', '').trim(),

      lastUpdated: dayjs(issue.fields.updated).fromNow(),
    };
  }
  static toResponseList(issues: JiraIssue[]): TicketResponseDto[] {
    return issues.map(this.toResponseSingle);
  }
}
