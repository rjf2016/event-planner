type CalendarDayProps = {
  date: string;
};

export default function CalendarDay({ date }: CalendarDayProps) {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('default', { month: 'long' });
  const day = dateObj.getDate();

  return (
    <div className="w-full h-full flex flex-col justify-center text-center">
      <h4 className="text-lg">{month}</h4>

      <h3 className="text-xl font-semibold">{day}</h3>
    </div>
  );
}
