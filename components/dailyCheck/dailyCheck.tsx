"use client";

import { useEffect, useState } from "react";

import SelectSchedule from "@/components/selectSchedule/selectSchedule";

import { useFixedSchedule } from "@/store/useFixedSchedules";
import { useSchedules } from "@/store/useSchedules";

type scheduleIds = {
  schedule: string;
  fixedSchedule: string;
};

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export default function DailyCheck() {
  const { todaySchedules } = useFixedSchedule();
  const { schedules, hydrated, addSchedule } = useSchedules();

  const [sameSchedules, setSameSchedules] = useState<scheduleIds[]>([]);

  const createSchedules = (date: string) => {
    const dateSchedules = todaySchedules(date);

    dateSchedules.forEach((schedule) => {
      const exists = schedules.some((item) => item.id === schedule.id);
      if (exists) return;

      if (schedule.day === date) {
        const date = new Date().toLocaleDateString("pt-BR").slice(0, 5);

        const sameSchedule = schedules.find(
          (item) => item.date === date && item.hour === schedule.hour
        );

        if (sameSchedule) {
          setSameSchedules((prev) => [
            ...prev,
            { schedule: sameSchedule.id, fixedSchedule: schedule.id },
          ]);
          return;
        }

        const adaptedSchedule = {
          date: date,
          hour: schedule.hour,
          name: schedule.name,
          id: schedule.id,
        };
        addSchedule(adaptedSchedule);
      }
    });
  };

  useEffect(() => {
    if (!hydrated) return;

    const today = days[new Date().getDay()];

    createSchedules(today);
  }, [hydrated]);

  return sameSchedules.length > 0 ? (
    <SelectSchedule data={sameSchedules} />
  ) : null;
}
