"use client";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useSchedules } from "@/store/useSchedules";
import { useFixedSchedule } from "@/store/useFixedSchedules";

type props = {
  data: {
    schedule: string;
    fixedSchedule: string;
  }[];
};

export default function SelectSchedule({ data }: props) {
  const { schedules, findSchedule, addSchedule, removeSchedule } =
    useSchedules();
  const { findSchedule: findFixedSchedule } = useFixedSchedule();

  const [selectedId, setSelectedId] = useState([""]);

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    selectedId.map((item) => {
      const fixedSChedule = findFixedSchedule(item);

      if (!fixedSChedule) return;

      const adaptedSchedule = {
        date: new Date().toLocaleDateString("pt-BR").slice(0, 5),
        hour: fixedSChedule.hour,
        name: fixedSChedule.name,
        id: fixedSChedule.id,
      };

      const findOldSchedule = schedules.find(
        (item) =>
          item.date === adaptedSchedule.date &&
          item.hour === adaptedSchedule.hour
      );

      if (findOldSchedule) {
        removeSchedule(findOldSchedule.id);
      }

      addSchedule(adaptedSchedule);
    });
  };

  const handleSelect = (id: string) => {
    const findSelected = selectedId.find((item) => item === id);

    if (findSelected) {
      setSelectedId((prev) => prev.filter((item) => item !== findSelected));
    } else {
      setSelectedId((prev) => [...prev, id]);
    }
  };

  const handleClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    console.log(selectedId);
  }, [selectedId]);
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={() => handleClick()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agendamento fixo</DialogTitle>
          </DialogHeader>

          <Table className="mb-4">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center"> Data</TableHead>
                <TableHead className="text-center"> Hora</TableHead>
                <TableHead className="text-center"> Nome</TableHead>
              </TableRow>
            </TableHeader>
            {data.map((schedule) => {
              const currentSchedule = findSchedule(schedule.schedule);
              const currentFixedSchedule = findFixedSchedule(
                schedule.fixedSchedule
              );

              return (
                <TableBody key={schedule.schedule} className="text-center">
                  <TableRow
                    onClick={() => handleSelect(schedule.schedule)}
                    className={cn(
                      selectedId.find((item) => item === schedule.schedule) &&
                        "bg-green-800 hover:bg-green-800"
                    )}
                  >
                    <TableCell>{currentSchedule?.date}</TableCell>
                    <TableCell>{currentSchedule?.hour}</TableCell>
                    <TableCell>{currentSchedule?.name}</TableCell>
                  </TableRow>
                  <TableRow
                    onClick={() => handleSelect(schedule.fixedSchedule)}
                    className={cn(
                      selectedId.find((item) => item === schedule.fixedSchedule)
                        ? "bg-green-800 hover:bg-green-800"
                        : "bg-primary/6"
                    )}
                  >
                    <TableCell>{currentSchedule?.date}</TableCell>
                    <TableCell>{currentFixedSchedule?.hour}</TableCell>
                    <TableCell>{currentFixedSchedule?.name}</TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>

          <p className="text-center">
            Já existe agendamentos fixos para este dia e horário.
          </p>

          <DialogFooter className="sm:justify-end">
            <DialogDescription className="sr-only">
              Erro ao criar agendamentos usando agendamentos fixo
            </DialogDescription>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleSubmit()}
              >
                Continuar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
