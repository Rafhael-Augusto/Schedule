"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { toast } from "sonner";
import { useMask } from "@react-input/mask";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFixedSchedule } from "@/store/useFixedSchedules";

type props = {
  data: {
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
  setIsOpen: (state: boolean) => void;
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

export default function EditFixedField({ data, setIsOpen }: props) {
  const { findSchedule, scheduleExist, updateSchedule, removeSchedule } =
    useFixedSchedule();

  const [editSchedule, setEditSchedule] = useState<props["data"]>({
    name: "",
    hour: "",
    day: "sunday",
    id: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const findCurrentSchedule = findSchedule(data.id);

    if (findCurrentSchedule) {
      const hasShedule = scheduleExist(editSchedule);

      if (hasShedule) {
        toast.error("Erro: Horario ja marcado");
        return;
      } else {
        updateSchedule(editSchedule);
        setIsOpen(false);
      }
    }
  };

  const handleDelete = () => {
    const findCurrentSchedule = findSchedule(data.id);

    if (findCurrentSchedule) {
      removeSchedule(data.id);
      setIsOpen(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: props["data"]["day"]) => {
    if (!value) return;

    setEditSchedule((prev) => ({ ...prev, day: value }));
  };

  const hourRef = useMask({
    mask: "HH:MM",
    replacement: {
      H: /\d/,
      M: /\d/,
    },
  });

  useEffect(() => {
    setEditSchedule(data);
  }, [data]);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FieldGroup>
          <FieldSet>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="client-name">Nome do cliente</FieldLabel>
                <Input
                  required
                  name="name"
                  value={editSchedule.name}
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
                    value={editSchedule.hour}
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
                    value={editSchedule.day}
                    onValueChange={(e) =>
                      handleSelectChange(e as props["data"]["day"])
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
            <Field>
              <div className="flex flex-col gap-4">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleDelete()}
                >
                  Remover
                </Button>
                <Button type="submit" variant="default">
                  Editar
                </Button>
              </div>
            </Field>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
