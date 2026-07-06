type Props = {
  current: number;
  required: number;
};

export default function StatusCard({
  current,
  required,
}: Props) {
  const percent = Math.min((current / required) * 100, 100);

  return (
    <div className="space-y-3">

      <div className="bg-zinc-800 rounded-xl p-4">

        <div className="flex justify-between font-semibold">
          <span>🏀 Гравців</span>
          <span>
            {current}/{required}
          </span>
        </div>

        <div className="w-full h-3 rounded-full bg-zinc-700 mt-3 overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{
              width: `${percent}%`,
            }}
          />
        </div>

      </div>

      {current >= required ? (
        <div className="bg-green-600 rounded-xl p-3 text-center font-bold">
          ✅ Гра відбудеться
        </div>
      ) : (
        <div className="bg-yellow-500 text-black rounded-xl p-3 text-center font-bold">
          Потрібно ще {required - current} гравців
        </div>
      )}

    </div>
  );
}