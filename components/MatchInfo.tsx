import { MapPin, Clock, Calendar, CheckCircle } from "lucide-react";

type MatchInfoProps = {
  date: string;
  time: string;
  place: string;
  maps: string;
  yesPlayers: number;
  minPlayers: number;
};

export default function MatchInfo({
  date,
  time,
  place,
  maps,
  yesPlayers,
  minPlayers,
}: MatchInfoProps) {
  const percent = (yesPlayers / minPlayers) * 100;

  return (
    <div className="mt-6 space-y-3">

      <div className="bg-zinc-800 rounded-xl p-4 flex items-center gap-3">
        <Calendar size={20} />
        <span>{date}</span>
      </div>

      <div className="bg-zinc-800 rounded-xl p-4 flex items-center gap-3">
        <Clock size={20} />
        <span>{time}</span>
      </div>

      <div className="bg-zinc-800 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MapPin size={20} />
          <span>{place}</span>
        </div>

        <a
          href={maps}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-300"
        >
          Карта
        </a>
      </div>

      <div className="bg-green-600 rounded-xl p-3 text-center font-bold">
        👥 Будуть: {yesPlayers}/{minPlayers}
      </div>

      <div className="w-full bg-zinc-700 rounded-full h-3">
        <div
          className="bg-green-500 h-3 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="text-center">
        {yesPlayers >= minPlayers ? (
          <div className="text-green-400 font-bold flex items-center justify-center gap-2">
            <CheckCircle size={20} />
            Гра відбудеться
          </div>
        ) : (
          <div className="text-yellow-400">
            Потрібно ще {minPlayers - yesPlayers} гравців
          </div>
        )}
      </div>

    </div>
  );
}