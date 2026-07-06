type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <>
      <h1 className="text-3xl font-bold text-center">
        🏀 {title}
      </h1>

      <p className="text-center text-zinc-400 mt-2">
        Наступна гра
      </p>
    </>
  );
}