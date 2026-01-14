"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AddFixedItem from "@/components/addFixedItem/addFixedItem";
import EditFixedSchedule from "@/components/editFixedSchedule/editFixedSchedule";

import { useFixedSchedule } from "@/store/useFixedSchedules";

const dayMap = {
  sunday: "Domingo",
  monday: "Segunda",
  tuesday: "Terça",
  wednesday: "Quarta",
  thursday: "Quinta",
  friday: "Sexta",
  saturday: "Sábado",
};

export default function SchedulesFixed() {
  const { schedules } = useFixedSchedule();

  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const handleClick = (id: string) => {
    setCurrentId(id);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <Table>
        <TableCaption className="sr-only">
          Lista de agendamentos fixos
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Dia</TableHead>
          </TableRow>
        </TableHeader>

        {schedules.map((schedule, index) => {
          return (
            <TableBody
              key={schedule.id}
              onClick={() => handleClick(schedule.id)}
            >
              <TableRow className={cn(index % 2 !== 0 ? "bg-primary/6" : "")}>
                <TableCell>{schedule.name}</TableCell>
                <TableCell>{schedule.hour}</TableCell>
                <TableCell>{dayMap[schedule.day]}</TableCell>
              </TableRow>
            </TableBody>
          );
        })}
      </Table>

      <AddFixedItem />
      <EditFixedSchedule isOpen={isOpen} setIsOpen={setIsOpen} id={currentId} />
    </div>
  );
}
