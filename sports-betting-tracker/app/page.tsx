'use client';

import { useState, useEffect } from 'react';
import Calendar from '@/components/Calendar';
import DayEntry from '@/components/DayEntry';
import { DayData } from '@/lib/types';
import { getAllDays, saveDayData, getTotalProfit, deleteDayData } from '@/lib/storage';

export default function Home() {
  const [days, setDays] = useState<DayData[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showEntry, setShowEntry] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allDays = getAllDays();
    setDays(allDays);
    setTotalProfit(getTotalProfit());
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setShowEntry(true);
  };

  const handleSave = (dayData: DayData) => {
    saveDayData(dayData);
    loadData();
    setShowEntry(false);
    setSelectedDate(null);
  };

  const handleClose = () => {
    setShowEntry(false);
    setSelectedDate(null);
  };

  const handleDelete = (date: string) => {
    if (confirm('Delete all data for this day?')) {
      deleteDayData(date);
      loadData();
    }
  };

  const getSelectedDayData = () => {
    if (!selectedDate) return null;
    return days.find(d => d.date === selectedDate) || null;
  };

  const getStats = () => {
    const wins = days.filter(d => d.netProfit > 0).length;
    const losses = days.filter(d => d.netProfit < 0).length;
    const winRate = days.length > 0 ? ((wins / days.length) * 100).toFixed(1) : '0';
    
    return { wins, losses, winRate };
  };

  const stats = getStats();

  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-8 border-black mb-8 bg-black text-white">
          <div className="p-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">SPORTS BETTING TRACKER</h1>
            <div className="text-3xl md:text-5xl font-bold mb-2">
              TOTAL: {totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)}
            </div>
            <div className="flex justify-center gap-8 text-sm md:text-base mt-4">
              <div className="border-2 border-white px-4 py-2">
                <span className="font-bold">WINS:</span> {stats.wins}
              </div>
              <div className="border-2 border-white px-4 py-2">
                <span className="font-bold">LOSSES:</span> {stats.losses}
              </div>
              <div className="border-2 border-white px-4 py-2">
                <span className="font-bold">WIN RATE:</span> {stats.winRate}%
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => handleDateClick(new Date().toISOString().split('T')[0])}
            className="w-full md:w-auto border-4 border-black px-8 py-4 font-bold text-xl hover:bg-black hover:text-white transition-colors"
          >
            + ADD TODAY'S BETS
          </button>
        </div>

        <Calendar 
          days={days}
          onDateClick={handleDateClick}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
        />

        {days.length > 0 && (
          <div className="mt-8 border-4 border-black">
            <div className="bg-gray-200 p-4 border-b-4 border-black">
              <h2 className="text-2xl font-bold">RECENT ACTIVITY</h2>
            </div>
            <div className="divide-y-2 divide-black max-h-96 overflow-y-auto">
              {[...days].reverse().slice(0, 10).map((day) => (
                <div 
                  key={day.date}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    day.netProfit >= 0 ? 'border-l-8 border-l-green-500' : 'border-l-8 border-l-red-500'
                  }`}
                  onClick={() => handleDateClick(day.date)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-lg">{day.date}</div>
                      <div className="text-sm">{day.parlays.length} PARLAY{day.parlays.length !== 1 ? 'S' : ''}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`text-2xl font-bold ${day.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {day.netProfit >= 0 ? '+' : ''}${day.netProfit.toFixed(2)}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(day.date);
                        }}
                        className="border-2 border-black px-3 py-1 hover:bg-red-500 hover:text-white transition-colors font-bold text-sm"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 border-4 border-black p-6 bg-gray-100">
          <h3 className="text-xl font-bold mb-2">HOW TO USE</h3>
          <ol className="list-decimal list-inside space-y-1 font-mono text-sm">
            <li>Click any date on the calendar to add or view parlays</li>
            <li>Add your bet details: teams, odds, stake, and result</li>
            <li>Green dates = profit, Red dates = loss</li>
            <li>Track your total profit at the top of the page</li>
          </ol>
        </div>
      </div>

      {showEntry && selectedDate && (
        <DayEntry
          date={selectedDate}
          initialData={getSelectedDayData()}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </main>
  );
}
