'use client';

import { Parlay, DayData } from '@/lib/types';
import { useState } from 'react';

interface DayEntryProps {
  date: string;
  initialData: DayData | null;
  onSave: (data: DayData) => void;
  onClose: () => void;
}

export default function DayEntry({ date, initialData, onSave, onClose }: DayEntryProps) {
  const [parlays, setParlays] = useState<Parlay[]>(initialData?.parlays || []);
  const [teams, setTeams] = useState('');
  const [odds, setOdds] = useState('');
  const [stake, setStake] = useState('');
  const [result, setResult] = useState<'win' | 'loss' | 'pending'>('pending');
  const [payout, setPayout] = useState('');

  const addParlay = () => {
    if (!teams || !odds || !stake) return;

    const newParlay: Parlay = {
      id: Date.now().toString(),
      teams,
      odds,
      stake: parseFloat(stake),
      result,
      payout: result === 'win' ? parseFloat(payout || '0') : undefined,
    };

    setParlays([...parlays, newParlay]);
    setTeams('');
    setOdds('');
    setStake('');
    setPayout('');
    setResult('pending');
  };

  const removeParlay = (id: string) => {
    setParlays(parlays.filter(p => p.id !== id));
  };

  const calculateNetProfit = () => {
    return parlays.reduce((sum, parlay) => {
      if (parlay.result === 'win') {
        return sum + (parlay.payout || 0) - parlay.stake;
      } else if (parlay.result === 'loss') {
        return sum - parlay.stake;
      }
      return sum;
    }, 0);
  };

  const handleSave = () => {
    const dayData: DayData = {
      date,
      parlays,
      netProfit: calculateNetProfit(),
    };
    onSave(dayData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-8 border-black max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="border-b-4 border-black p-4 flex justify-between items-center bg-gray-200">
          <h2 className="text-2xl font-bold">ENTRY: {date}</h2>
          <button 
            onClick={onClose}
            className="border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors font-bold"
          >
            X
          </button>
        </div>

        <div className="p-6">
          <div className="border-4 border-black p-4 mb-6 bg-gray-100">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">ADD PARLAY</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-bold mb-2">TEAMS/BET</label>
                <input
                  type="text"
                  value={teams}
                  onChange={(e) => setTeams(e.target.value)}
                  className="w-full border-2 border-black p-2 font-mono"
                  placeholder="e.g., Lakers ML + Celtics -5.5"
                />
              </div>
              
              <div>
                <label className="block font-bold mb-2">ODDS</label>
                <input
                  type="text"
                  value={odds}
                  onChange={(e) => setOdds(e.target.value)}
                  className="w-full border-2 border-black p-2 font-mono"
                  placeholder="e.g., +250"
                />
              </div>
              
              <div>
                <label className="block font-bold mb-2">STAKE ($)</label>
                <input
                  type="number"
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  className="w-full border-2 border-black p-2 font-mono"
                  placeholder="100"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block font-bold mb-2">RESULT</label>
                <select
                  value={result}
                  onChange={(e) => setResult(e.target.value as 'win' | 'loss' | 'pending')}
                  className="w-full border-2 border-black p-2 font-mono"
                >
                  <option value="pending">PENDING</option>
                  <option value="win">WIN</option>
                  <option value="loss">LOSS</option>
                </select>
              </div>
              
              {result === 'win' && (
                <div>
                  <label className="block font-bold mb-2">PAYOUT ($)</label>
                  <input
                    type="number"
                    value={payout}
                    onChange={(e) => setPayout(e.target.value)}
                    className="w-full border-2 border-black p-2 font-mono"
                    placeholder="350"
                    step="0.01"
                  />
                </div>
              )}
            </div>
            
            <button
              onClick={addParlay}
              className="w-full border-4 border-black p-3 font-bold hover:bg-black hover:text-white transition-colors"
            >
              + ADD PARLAY
            </button>
          </div>

          {parlays.length > 0 && (
            <div className="border-4 border-black mb-6">
              <div className="bg-gray-200 p-3 border-b-4 border-black">
                <h3 className="text-xl font-bold">PARLAYS ({parlays.length})</h3>
              </div>
              
              {parlays.map((parlay) => (
                <div key={parlay.id} className="border-b-2 border-black p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-bold text-lg mb-1">{parlay.teams}</div>
                      <div className="text-sm">
                        ODDS: {parlay.odds} | STAKE: ${parlay.stake.toFixed(2)}
                        {parlay.result === 'win' && parlay.payout && ` | PAYOUT: $${parlay.payout.toFixed(2)}`}
                      </div>
                      <div className={`inline-block mt-2 px-2 py-1 border-2 border-black font-bold ${
                        parlay.result === 'win' ? 'bg-green-200' : 
                        parlay.result === 'loss' ? 'bg-red-200' : 'bg-gray-200'
                      }`}>
                        {parlay.result.toUpperCase()}
                        {parlay.result === 'win' && parlay.payout && ` (+$${(parlay.payout - parlay.stake).toFixed(2)})`}
                        {parlay.result === 'loss' && ` (-$${parlay.stake.toFixed(2)})`}
                      </div>
                    </div>
                    <button
                      onClick={() => removeParlay(parlay.id)}
                      className="border-2 border-black px-3 py-1 hover:bg-red-500 hover:text-white transition-colors font-bold"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="bg-black text-white p-4 text-xl font-bold">
                NET PROFIT: {calculateNetProfit() >= 0 ? '+' : ''}${calculateNetProfit().toFixed(2)}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 border-4 border-black p-4 font-bold text-xl hover:bg-green-500 hover:text-white transition-colors"
            >
              SAVE DAY
            </button>
            <button
              onClick={onClose}
              className="border-4 border-black px-8 py-4 font-bold hover:bg-gray-300 transition-colors"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
