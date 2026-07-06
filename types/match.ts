export interface Match {
  id: string;

  homeTeam: string;
  awayTeam: string;

  homeScore: number;
  awayScore: number;

  status: "upcoming" | "live" | "finished";

  date: number;
  location: string;

  createdBy: string;
}