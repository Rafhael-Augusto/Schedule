"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSchedules } from "@/store/useSchedules";

import { Button } from "../ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type schedule = {
  data: {
    data: string;
    hora: string;
    nome: string;
    id: string;
  }[];
};

export default function SchedulesPreview({ data }: schedule) {
  const { schedules } = useSchedules();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(true);
  }, [data]);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={() => handleClose()}>
        <DialogContent className="max-h-[80%] overflow-scroll">
          <DialogHeader>
            <DialogTitle>Lista de agendamentos</DialogTitle>
          </DialogHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center"> Data</TableHead>
                <TableHead className="text-center"> Hora</TableHead>
                <TableHead className="text-center"> Nome</TableHead>
              </TableRow>
            </TableHeader>
            {data.map((schedule, index) => {
              const itemExistStore = schedules.find(
                (item) =>
                  item.date === schedule.data && item.hour === schedule.hora
              );

              const itemExistList = data.find(
                (item) =>
                  item.data === schedule.data &&
                  item.hora === schedule.hora &&
                  item.id !== schedule.id
              );

              return (
                <TableBody key={schedule.id} className="text-center">
                  <TableRow
                    className={cn(
                      "bg-secondary",
                      index % 2 !== 0 && "bg-primary/6",
                      itemExistStore && "bg-red-800",
                      itemExistList && "bg-blue-800"
                    )}
                  >
                    <TableCell>{schedule.data}</TableCell>
                    <TableCell>{schedule.hora}</TableCell>
                    <TableCell>{schedule.nome}</TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>

          <DialogFooter className="sm:justify-end">
            <DialogDescription className="sr-only">
              Lista de agendamentos criados por arquivo csv
            </DialogDescription>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Continuar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
