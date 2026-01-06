import AddItemButton from "@/components/addItem/addItem";
import Menu from "@/components/menu/menu";
import ScheduleTable from "@/components/scheduleTable/scheduleTable";

export default function Home() {
  return (
    <div className="relative h-screen">
      <Menu />
      <div className="m-8">
        <ScheduleTable />
      </div>
      <div className="absolute  bottom-8 right-8">
        <AddItemButton />
      </div>
    </div>
  );
}
