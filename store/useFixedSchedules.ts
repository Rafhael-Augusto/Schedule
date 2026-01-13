import { create } from "zustand";
import { persist } from "zustand/middleware";

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

type types = {
  schedules: fixedSchedule[];
  addSchedule: (newSchedule: fixedSchedule) => void;
  removeSchedule: (id: string) => void;
  scheduleExist: (schedule: fixedSchedule) => boolean;
  findSchedule: (id: string) => fixedSchedule | undefined;
  updateSchedule: (updatedSchedule: fixedSchedule) => void;
};

export const useFixedSchedule = create<types>()(
  persist(
    (set, get) => ({
      schedules: [],
      addSchedule: (newSchedule) =>
        set((state) => ({ schedules: [...state.schedules, newSchedule] })),
      removeSchedule: (id) =>
        set((state) => ({
          schedules: state.schedules.filter((schedule) => schedule.id !== id),
        })),
      scheduleExist: (schedule) =>
        get().schedules.some(
          (item) => item.hour === schedule.hour && item.day === schedule.day
        ),
      findSchedule: (id) =>
        get().schedules.find((schedule) => schedule.id === id),
      updateSchedule: (updatedSchedule) =>
        set((state) => ({
          schedules: state.schedules.map((item) =>
            item.id === updatedSchedule.id
              ? { ...item, ...updatedSchedule }
              : item
          ),
        })),
    }),
    {
      name: "fixedSchedules-storage",
    }
  )
);
