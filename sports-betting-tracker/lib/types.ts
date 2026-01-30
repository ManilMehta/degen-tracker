export interface Parlay {
  id: string;
  teams: string;
  odds: string;
  stake: number;
  result: 'win' | 'loss' | 'pending';
  payout?: number;
}

export interface DayData {
  date: string;
  parlays: Parlay[];
  netProfit: number;
}
