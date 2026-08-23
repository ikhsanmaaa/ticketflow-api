import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id';
import { TicketResponseDto } from 'src/core/jsm/dto/ticket-response';
import { JsmIssue } from 'src/core/jsm/interfaces/jira-issue.interface';

dayjs.extend(relativeTime);
dayjs.locale('id');
export class TicketMapper {
  static toResponseSingle(issue: JsmIssue): TicketResponseDto {
    return {
      key: issue.key,

      summary: issue.fields.summary,

      status: issue.fields.status.name,

      issueType: issue.fields.issuetype.name.replace('[System]', '').trim(),

      lastUpdated: dayjs(issue.fields.updated).fromNow(),
    };
  }
  static toResponseList(issues: JsmIssue[]): TicketResponseDto[] {
    return issues.map(this.toResponseSingle);
  }
}
