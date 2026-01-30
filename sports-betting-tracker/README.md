# Sports Betting Tracker

A brutalist monochrome web app for tracking daily sports betting parlays and profits.

## Features

- **Daily Parlay Tracking**: Add multiple parlays per day with teams, odds, stakes, and results
- **Visual Calendar**: Color-coded calendar showing profitable days (green) and losing days (red)
- **Profit/Loss Display**: Each calendar day shows net profit/loss amount
- **Total Counter**: Track total money made/lost across all betting
- **Statistics**: View win rate, total wins, and total losses
- **Local Storage**: All data persists in browser localStorage
- **Brutalist Design**: Clean, monochrome interface with bold borders and simple typography

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Local Storage for data persistence

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploying to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project and deploy

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and deploy

### Option 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

## Usage

1. **Add Bets**: Click any date on the calendar or use "ADD TODAY'S BETS" button
2. **Enter Parlay Details**: 
   - Teams/Bet description (e.g., "Lakers ML + Celtics -5.5")
   - Odds (e.g., "+250")
   - Stake amount
   - Result (Win/Loss/Pending)
   - Payout amount (if win)
3. **Save**: Click "SAVE DAY" to store your data
4. **View History**: Click any calendar date to view/edit that day's bets
5. **Track Progress**: Monitor your total profit and win rate at the top

## Data Storage

All data is stored in browser localStorage. This means:
- ✅ No server needed
- ✅ Completely private
- ✅ Fast and responsive
- ⚠️ Data is tied to your browser (clearing browser data will delete it)
- ⚠️ Data won't sync across devices

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
