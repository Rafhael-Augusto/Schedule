"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import EditField from "../editField/editField";

import { useSchedules } from "@/store/useSchedules";
import { useFixedSchedule } from "@/store/useFixedSchedules";
import EditFixedField from "../editFixedField/editFixedField";

type props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  id: string;
};

type schedule = {
  name: string;
  hour: string;
  day:
    | "sunday"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday";
  id: string;
};

export default function EditFixedSchedule({ isOpen, setIsOpen, id }: props) {
  const { findSchedule } = useFixedSchedule();

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
                <EditFixedField data={schedule} setIsOpen={setIsOpen} />
              </div>

              <DialogFooter className="sm:justify-end absolute">
                <DialogDescription className="sr-only">
                  Aditar agendamento
                </DialogDescription>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
