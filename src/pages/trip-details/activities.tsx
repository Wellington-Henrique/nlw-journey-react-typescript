import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { CircleCheck } from "lucide-react";
import { Activity } from ".";

interface ActivitiesProps {
  activities: Activity[] | undefined;
}

export function Activities({ activities }: ActivitiesProps) {
  return (
    <div className="space-y-8">
      {activities?.map((activity) => (
        <div className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">
              Dia {format(activity.date, "d")}
            </span>
            <span className="text-xs text-zinc-500">
              {format(activity.date, "EEEE", { locale: ptBR })}
            </span>
          </div>

          <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
            <CircleCheck className="size-5 text-lime-300" />
            <span className="text-zinc-100">{activity.name}</span>
            <span className="text-zinc-400 ml-auto">
              {format(activity.date, "HH:mm")}h
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
