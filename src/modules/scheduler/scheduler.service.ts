import { Injectable } from '@nestjs/common';
import { BatchTestDto } from './dto/batch-test.dto';
import { JsmService } from 'src/core/jsm/jsm.service';
import { JsmIssue } from 'src/core/jsm/interfaces/jira-issue.interface';
import { BatchTestResult } from './interface-test';
import { PutFieldDto } from './dto/put-field.dto';

@Injectable()
export class SchedulerService {
  constructor(private readonly jsmService: JsmService) {}

  async runBatchTest(dto: BatchTestDto) {
    const startTime = Date.now();

    const assignee = '712020:05725dca-2191-4275-b168-19827c7029d0';

    const response = await this.jsmService.searchIssuesByAssignee(
      assignee,
      dto.batchSize,
    );

    const issues: JsmIssue[] = response.values ?? response.issues ?? [];

    const selectedIssues = issues.slice(0, dto.batchSize);

    if (selectedIssues.length === 0) {
      return {
        batchSize: dto.batchSize,
        totalFound: 0,
        totalProcessed: 0,
        success: 0,
        failed: 0,
        durationMs: Date.now() - startTime,
        averageDurationMs: 0,
        results: [],
      };
    }

    const results: BatchTestResult[] = [];

    for (const issue of selectedIssues) {
      const issueStartTime = Date.now();

      try {
        await this.jsmService.updateIssueField(
          issue.key,
          dto.fieldId,
          dto.value,
        );

        results.push({
          issueKey: issue.key,
          success: true,
          durationMs: Date.now() - issueStartTime,
        });
      } catch (error) {
        const jiraError =
          error?.response?.data || error?.message || 'Unknown error';
        results.push({
          issueKey: issue.key,
          success: false,
          durationMs: Date.now() - issueStartTime,
          error:
            typeof jiraError === 'string'
              ? jiraError
              : JSON.stringify(jiraError),
        });
      }
    }

    const successCount = results.filter((result) => result.success).length;

    const failedCount = results.length - successCount;

    const totalDuration = Date.now() - startTime;

    return {
      batchSize: dto.batchSize,
      totalFound: issues.length,
      totalProcessed: selectedIssues.length,
      success: successCount,
      failed: failedCount,
      durationMs: totalDuration,
      averageDurationMs:
        selectedIssues.length > 0
          ? Math.round(totalDuration / selectedIssues.length)
          : 0,
      results,
    };
  }

  async testUpdate(dto: PutFieldDto) {
    return await this.jsmService.updateIssueField(
      dto.issueKey,
      dto.fieldId,
      dto.value,
    );
  }
}
