import React, { useState } from 'react';
import { MentoringSession } from '../types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

interface MentorSchedulerProps {
  onSchedule: (sessionData: Partial<MentoringSession>) => void;
  onClose: () => void;
}

const MentorScheduler: React.FC<MentorSchedulerProps> = ({ onSchedule, onClose }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);
  const [type, setType] = useState<'call' | 'chat'>('chat');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;

    const [hours, minutes] = time.split(':').map(Number);
    const scheduledFor = new Date(date);
    scheduledFor.setHours(hours, minutes);

    onSchedule({
      scheduledFor,
      duration,
      type,
    });
  };

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  ];

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Programar Mentoría</DialogTitle>
          <DialogDescription>
            Selecciona fecha y hora para la sesión de mentoría.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Fecha
            </label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={es}
              disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
              className="rounded-md border"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Hora
            </label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una hora" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Duración
            </label>
            <Select value={duration.toString()} onValueChange={(value) => setDuration(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona la duración" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutos</SelectItem>
                <SelectItem value="30">30 minutos</SelectItem>
                <SelectItem value="45">45 minutos</SelectItem>
                <SelectItem value="60">1 hora</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tipo de sesión
            </label>
            <Select value={type} onValueChange={(value: 'call' | 'chat') => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de sesión" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chat">Chat</SelectItem>
                <SelectItem value="call">Llamada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={!date || !time}
              className="bg-teal-600 text-white hover:bg-teal-700"
            >
              Programar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MentorScheduler;