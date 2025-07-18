export type AppStatus =
  | "Accepted"
  | "Rejected"
  | "Waitlisted"
  | "In Review"
  | "Submitted"
  | "In Progress"
  | "Not Started";

export type AppType = "Hacker" | "Mentor" | "Volunteer";

export interface Application {
  type: AppType;
  status: AppStatus;
  lastUpdated: string;
}
