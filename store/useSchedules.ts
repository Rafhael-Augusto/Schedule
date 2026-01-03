import { create } from "zustand";

type schedule = {
  name: string;
  hour: string;
  date: string;
  id: string;
};

interface types {
  schedules: schedule[];
  addSchedule: (newSchedule: schedule) => void;
  removeSchedule: (removedSchedule: string) => void;
}

export const useSchedules = create<types>((set) => ({
  schedules: [],
  addSchedule: (newSchedule) =>
    set((state) => ({ schedules: [...state.schedules, newSchedule] })),
  removeSchedule: (removedSchedule) =>
    set((state) => ({
      schedules: state.schedules.filter((item) => {
        return item.id !== removedSchedule;
      }),
    })),
}));
