"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { toast } from "sonner";
import { useMask } from "@react-input/mask";

import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useFixedSchedule } from "@/store/useFixedSchedules";

type props = {
  setOpen: (state: boolean) => void;
};

type fixedSchedule = {
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

const dayMap = {
  sunday: "Domingo",
  monday: "Segunda",
  tuesday: "Terça",
  wednesday: "Quarta",
  thursday: "Quinta",
  friday: "Sexta",
  saturday: "Sábado",
};

export default function FixedFieldComponent({ setOpen }: props) {
  const { schedules, addSchedule } = useFixedSchedule();

  const [schedule, setSchedule] = useState<fixedSchedule>({
    name: "",
    hour: "",
    day: "sunday",
    id: "",
  });

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const checkAvailable = () => {
      const check = schedules.some(
        (currentSchedule) =>
          currentSchedule.hour === schedule.hour &&
          currentSchedule.day === schedule.day
      );

      if (check) return true;

      return false;
    };

    if (checkAvailable()) {
      toast.error("Erro: Horario fixo ja marcado");
      return;
    }

    const uniqueId = crypto.randomUUID();
    const newSchedule = { ...schedule, id: uniqueId };

    addSchedule(newSchedule);
    setOpen(false);
    toast.success("Agendamento fixo criado");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: fixedSchedule["day"]) => {
    setSchedule((prev) => ({ ...prev, day: value }));
  };

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
                  onChange={(e) => handleInputChange(e)}
                  id="client-name"
                />
              </Field>
              <div className="flex gap-8">
                <Field>
                  <FieldLabel htmlFor="hour">Hora</FieldLabel>
                  <Input
                    required
                    name="hour"
                    value={schedule.hour}
                    onChange={(e) => handleInputChange(e)}
                    id="hour"
                    ref={hourRef}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="day">Dia</FieldLabel>
                  <Select
                    required
                    name="day"
                    value={schedule.day}
                    onValueChange={(e) =>
                      handleSelectChange(e as fixedSchedule["day"])
                    }
                  >
                    <SelectTrigger id="day">
                      <SelectValue placeholder="selecione o dia" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Dias da semana</SelectLabel>

                        {Object.entries(dayMap).map(([day, label]) => (
                          <SelectItem key={day} value={day}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
