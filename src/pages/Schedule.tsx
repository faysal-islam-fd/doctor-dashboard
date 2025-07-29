import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, Save, Trash2, Edit } from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

interface DaySchedule {
  date: string;
  dayName: string;
  isWorking: boolean;
  slots: TimeSlot[];
}

const Schedule: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());

  // Generate week days
  const weekStart = startOfWeek(selectedWeek);
  const weekEnd = endOfWeek(selectedWeek);
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const defaultSlots: TimeSlot[] = [
    { id: '1', startTime: '09:00', endTime: '10:00', available: true },
    { id: '2', startTime: '10:00', endTime: '11:00', available: true },
    { id: '3', startTime: '11:00', endTime: '12:00', available: true },
    { id: '4', startTime: '14:00', endTime: '15:00', available: true },
    { id: '5', startTime: '15:00', endTime: '16:00', available: true },
    { id: '6', startTime: '16:00', endTime: '17:00', available: true },
  ];

  const [schedule, setSchedule] = useState<DaySchedule[]>(
    weekDays.map(day => ({
      date: format(day, 'yyyy-MM-dd'),
      dayName: format(day, 'EEEE'),
      isWorking: ![0, 6].includes(day.getDay()), // Not working on weekends by default
      slots: defaultSlots
    }))
  );

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = addDays(selectedWeek, direction === 'next' ? 7 : -7);
    setSelectedWeek(newWeek);
    
    // Generate new week schedule
    const newWeekStart = startOfWeek(newWeek);
    const newWeekEnd = endOfWeek(newWeek);
    const newWeekDays = eachDayOfInterval({ start: newWeekStart, end: newWeekEnd });
    
    setSchedule(newWeekDays.map(day => ({
      date: format(day, 'yyyy-MM-dd'),
      dayName: format(day, 'EEEE'),
      isWorking: ![0, 6].includes(day.getDay()),
      slots: defaultSlots
    })));
  };

  const toggleWorkingDay = (date: string) => {
    setSchedule(prev => prev.map(day => 
      day.date === date ? { ...day, isWorking: !day.isWorking } : day
    ));
  };

  const toggleSlotAvailability = (date: string, slotId: string) => {
    setSchedule(prev => prev.map(day => 
      day.date === date 
        ? {
            ...day,
            slots: day.slots.map(slot => 
              slot.id === slotId ? { ...slot, available: !slot.available } : slot
            )
          }
        : day
    ));
  };

  const addTimeSlot = (date: string) => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      startTime: '09:00',
      endTime: '10:00',
      available: true
    };

    setSchedule(prev => prev.map(day =>
      day.date === date 
        ? { ...day, slots: [...day.slots, newSlot] }
        : day
    ));
  };

  const removeTimeSlot = (date: string, slotId: string) => {
    setSchedule(prev => prev.map(day =>
      day.date === date 
        ? { ...day, slots: day.slots.filter(slot => slot.id !== slotId) }
        : day
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Schedule Management
          </h1>
          <p className="text-gray-600 mt-1">
            Set your availability and manage appointment time slots
          </p>
        </div>
        
        <button className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Week Navigation */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateWeek('prev')}
            className="flex items-center space-x-2 px-4 py-2 bg-white/60 hover:bg-white/80 rounded-xl transition-all duration-200 border border-gray-200/50"
          >
            <span>← Previous Week</span>
          </button>

          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900">
              {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Weekly Schedule</p>
          </div>

          <button
            onClick={() => navigateWeek('next')}
            className="flex items-center space-x-2 px-4 py-2 bg-white/60 hover:bg-white/80 rounded-xl transition-all duration-200 border border-gray-200/50"
          >
            <span>Next Week →</span>
          </button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {schedule.map((day) => (
          <div
            key={day.date}
            className={`bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/30 shadow-xl transition-all duration-300 ${
              !day.isWorking ? 'opacity-60' : ''
            }`}
          >
            {/* Day Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900">{day.dayName}</h3>
                <button
                  onClick={() => toggleWorkingDay(day.date)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                    day.isWorking
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {day.isWorking && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-600">{format(new Date(day.date), 'MMM d')}</p>
              <p className="text-xs text-gray-500 mt-1">
                {day.isWorking ? `${day.slots.filter(s => s.available).length} slots available` : 'Not working'}
              </p>
            </div>

            {/* Time Slots */}
            {day.isWorking && (
              <div className="space-y-2">
                {day.slots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`flex items-center justify-between p-2 rounded-lg border transition-all duration-200 ${
                      slot.available
                        ? 'bg-green-50/80 border-green-200 hover:bg-green-100/80'
                        : 'bg-red-50/80 border-red-200 hover:bg-red-100/80'
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900">
                        {slot.startTime} - {slot.endTime}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => toggleSlotAvailability(day.date, slot.id)}
                        className={`w-4 h-4 rounded-full border transition-all duration-200 ${
                          slot.available
                            ? 'bg-green-500 border-green-500'
                            : 'bg-red-500 border-red-500'
                        }`}
                        title={slot.available ? 'Available' : 'Unavailable'}
                      />
                      <button
                        onClick={() => removeTimeSlot(day.date, slot.id)}
                        className="w-4 h-4 text-red-500 hover:text-red-700 transition-colors"
                        title="Remove slot"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Add Slot Button */}
                <button
                  onClick={() => addTimeSlot(day.date)}
                  className="w-full flex items-center justify-center p-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-cyan-400 hover:bg-cyan-50/50 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-600">Add Slot</span>
                </button>
              </div>
            )}

            {/* Working Day Toggle */}
            {!day.isWorking && (
              <div className="text-center py-6">
                <CalendarIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-3">Day off</p>
                <button
                  onClick={() => toggleWorkingDay(day.date)}
                  className="text-xs text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Set as working day
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-md transition-all duration-200">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Set Regular Hours</p>
              <p className="text-sm text-gray-600">Apply standard working hours</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-200">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Block Time</p>
              <p className="text-sm text-gray-600">Block specific time slots</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-200">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Edit className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Bulk Edit</p>
              <p className="text-sm text-gray-600">Edit multiple days at once</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Schedule; 