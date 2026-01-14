"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EditSchedule from "@/components/editSchedule/editSchedule";

import { useSchedules } from "@/store/useSchedules";

type ScheduleItem = {
  date: string;
  hour: string;
  name: string;
  id: string;
};

export default function ScheduleTable() {
  const { schedules } = useSchedules();

  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const [sortedList, setSortedList] = useState<Record<
    string,
    ScheduleItem[]
  > | null>(null);

  const handleClick = (id: string) => {
    setCurrentId(id);
    setIsOpen(true);
  };

  useEffect(() => {
    const sortList = (list: ScheduleItem[]) => {
      const sort = list.sort((a, b) => {
        const toMinutes = (h: string) => {
          const [hours, minutes] = h.split(":").map(Number);
          return hours * 60 + minutes;
        };

        return toMinutes(a.hour) - toMinutes(b.hour);
      });

      return sort;
    };

    const groupedByDate = sortList(schedules).reduce((acc, schedule) => {
      if (!acc[schedule.date]) {
        acc[schedule.date] = [];
      }

      acc[schedule.date].push(schedule);
      return acc;
    }, {} as Record<string, typeof schedules>);

    setSortedList(groupedByDate);
  }, [schedules]);

  return (
    <div className="w-screen p-4">
      {sortedList &&
        Object.entries(sortedList).map(([date, items]) => (
          <Table key={date} className="mb-4">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center"> Data</TableHead>
                <TableHead className="text-center"> Hora</TableHead>
                <TableHead className="text-center"> Nome</TableHead>
              </TableRow>
            </TableHeader>
            {items.map((schedule, index) => (
              <TableBody
                key={schedule.id}
                onClick={() => handleClick(schedule.id)}
                className="text-center"
              >
                <TableRow className={cn(index % 2 !== 0 ? "bg-primary/6" : "")}>
                  <TableCell>{date}</TableCell>
                  <TableCell>{schedule.hour}</TableCell>
                  <TableCell>{schedule.name}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        ))}

      <EditSchedule isOpen={isOpen} setIsOpen={setIsOpen} id={currentId} />
    </div>
  );
}
