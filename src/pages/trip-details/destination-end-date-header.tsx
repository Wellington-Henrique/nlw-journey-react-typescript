import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { format } from "date-fns";

interface Trip {
  name: string;
  startDate: string;
  endDate: string;
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  useEffect(() => {
    api.get(`Trips/${tripId}`).then((resp) => setTrip(resp.data));
  }, [tripId]);

  const displayedDate = trip
    ? format(trip.startDate, "d' de 'LLL")
        .concat(" até ")
        .concat(format(trip.endDate, "d' de 'LLL"))
    : null;

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.name}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
