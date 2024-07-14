import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { CircleCheck } from "lucide-react";

interface Activity {
  id: string;
  name: string;
  date: string;
  status: boolean;
}

interface Trip {
  name: string;
  startDate: string;
  endDate: string;
  activities: Activity[];
}

export function Activities() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    api.get(`Trips/${tripId}`).then((resp) => setTrip(resp.data));
  }, [tripId]);

  return (
    <div className="space-y-8">
      {trip?.activities.map((activity) => (
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

          {/* <p className="text-zinc-500 text-sm">
            Nenhuma atividade cadastrada nessa data.
          </p> */}
        </div>
      ))}
    </div>
  );
}
