export interface BatchTestResult {
  issueKey: string;
  success: boolean;
  durationMs: number;
  error?: string;
}
