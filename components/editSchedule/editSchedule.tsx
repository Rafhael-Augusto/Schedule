"use client";

import { useSchedules } from "@/store/useSchedules";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
import EditField from "../editField/editField";

type props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  id: string;
};

type schedule = {
  name: string;
  date: string;
  hour: string;
  id: string;
};

export default function EditSchedule({ isOpen, setIsOpen, id }: props) {
  const { findSchedule } = useSchedules();

  const [schedule, setSchedule] = useState<schedule>();

  const handleClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setSchedule(findSchedule(id));
  }, [isOpen]);

  return (
    <div>
      {schedule && (
        <div>
          <Dialog open={isOpen} onOpenChange={(e) => handleClick()}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar agendamento</DialogTitle>
              </DialogHeader>

              <div>
                <EditField data={schedule} setIsOpen={setIsOpen} />
              </div>

              <DialogFooter className="sm:justify-end">
                <DialogDescription className="h-0 text-transparent">
                  Aditar agendamento
                </DialogDescription>
                <DialogClose asChild>
                  <Button type="button" variant="default">
                    Salvar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
