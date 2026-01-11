"use client";

import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { useMask } from "@react-input/mask";

import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useSchedules } from "@/store/useSchedules";

type props = {
  data: {
    name: string;
    date: string;
    hour: string;
    id: string;
  };
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EditField({ data, setIsOpen }: props) {
  const { schedules, findSchedule, updateSchedule, removeSchedule } =
    useSchedules();

  const [editSchedule, setEditSchedule] = useState({
    name: "",
    date: "",
    hour: "",
    id: "",
  });

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const findCurrentSchedule = findSchedule(data.id);

    if (findCurrentSchedule) {
      schedules.forEach((schedule) => {
        if (
          schedule.date === editSchedule.date &&
          schedule.hour === editSchedule.hour
        ) {
          console.log("He's bouncing up my bootie cheecks ");
        } else {
          updateSchedule(editSchedule);
        }
      });

      setIsOpen(false);
    }
  };

  const handleDelete = () => {
    const findCurrentSchedule = findSchedule(data.id);

    if (findCurrentSchedule) {
      removeSchedule(data.id);
      setIsOpen(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditSchedule((prev) => ({ ...prev, [name]: value }));
  };

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
                  value={editSchedule.name}
                  onChange={(e) => handleChange(e)}
                  required
                  name="name"
                  id="client-name"
                />
              </Field>
              <div className="flex gap-8">
                <Field>
                  <FieldLabel htmlFor="date">Data</FieldLabel>
                  <Input
                    value={editSchedule.date}
                    onChange={(e) => handleChange(e)}
                    required
                    name="date"
                    id="date"
                    ref={dateRef}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="hour">Hora</FieldLabel>
                  <Input
                    value={editSchedule.hour}
                    onChange={(e) => handleChange(e)}
                    required
                    name="hour"
                    id="hour"
                    ref={hourRef}
                  />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>

          <Field>
            <div className="flex flex-col gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleDelete()}
              >
                Marcar como concluido
              </Button>
              <Button type="submit" variant="default">
                Editar
              </Button>
            </div>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
