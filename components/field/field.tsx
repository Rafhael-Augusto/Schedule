"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { toast } from "sonner";
import { useMask } from "@react-input/mask";

import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useSchedules } from "@/store/useSchedules";

interface props {
  setOpen: (state: boolean) => void;
}

export default function FieldComponent({ setOpen }: props) {
  const { schedules, addSchedule } = useSchedules();

  const [schedule, setSchedule] = useState({
    name: "",
    date: "",
    hour: "",
    id: "",
  });

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const checkAvailable = () => {
      const check = schedules
        .filter((currentSchedule) => currentSchedule.date === schedule.date)
        .some((currentSchedule) => currentSchedule.hour === schedule.hour);

      if (check) return true;

      return false;
    };

    if (checkAvailable()) {
      toast.error("Erro: Horario ja marcado");
      return;
    }

    const uniqueId = crypto.randomUUID();
    const newSchedule = { ...schedule, id: uniqueId };

    addSchedule(newSchedule);
    setOpen(false);
    toast.success("Agendamento criado");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const dateRef = useMask({
    mask: "DD/MM",
    replacement: {
      D: /\d/,
      M: /\d/,
    },
  });

  const hourRef = useMask({
    mask: "HH:MM",
    replacement: {
      H: /\d/,
      M: /\d/,
    },
  });

  return (
    <div>
      <form onSubmit={(e) => handleForm(e)}>
        <FieldGroup>
          <FieldSet>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="client-name">Nome do cliente</FieldLabel>
                <Input
                  required
                  name="name"
                  value={schedule.name}
                  onChange={(e) => handleChange(e)}
                  id="client-name"
                />
              </Field>
              <div className="flex gap-8">
                <Field>
                  <FieldLabel htmlFor="date">Data</FieldLabel>
                  <Input
                    required
                    name="date"
                    value={schedule.date}
                    onChange={(e) => handleChange(e)}
                    id="date"
                    ref={dateRef}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="hour">Hora</FieldLabel>
                  <Input
                    required
                    name="hour"
                    value={schedule.hour}
                    onChange={(e) => handleChange(e)}
                    id="hour"
                    ref={hourRef}
                  />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>

          <Field>
            <Button type="submit">Continuar</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
