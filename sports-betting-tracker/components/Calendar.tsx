'use client';

import { DayData } from '@/lib/types';
import { useState } from 'react';

interface CalendarProps {
  days: DayData[];
  onDateClick: (date: string) => void;
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

export default function Calendar({ days, onDateClick, currentMonth, onMonthChange }: CalendarProps) {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  
  const getDayData = (day: number): DayData | null => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return days.find(d => d.date === dateStr) || null;
  };

  const previousMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  return (
    <div className="border-4 border-black p-4">
      <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-2">
        <button 
          onClick={previousMonth}
          className="border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors font-bold"
        >
          {'<'}
        </button>
        <div className="text-2xl font-bold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button 
          onClick={nextMonth}
          className="border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors font-bold"
        >
          {'>'}
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-0 border-2 border-black">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
          <div key={day} className="border border-black p-2 text-center font-bold bg-gray-200">
            {day}
          </div>
        ))}
        
        {Array.from({ length: startingDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="border border-black p-2 h-24 bg-gray-100"></div>
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayData = getDayData(day);
          const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          
          return (
            <div
              key={day}
              onClick={() => onDateClick(dateStr)}
              className={`
                border border-black p-2 h-24 cursor-pointer transition-all hover:border-4
                ${dayData ? (dayData.netProfit >= 0 ? 'bg-green-200 hover:bg-green-300' : 'bg-red-200 hover:bg-red-300') : 'bg-white hover:bg-gray-100'}
              `}
            >
              <div className="font-bold text-lg">{day}</div>
              {dayData && (
                <div className="text-sm font-bold mt-1">
                  {dayData.netProfit >= 0 ? '+' : ''}{dayData.netProfit.toFixed(0)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
