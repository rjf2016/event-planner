type CalendarDayProps = {
  date: string;
};

export default function CalendarDay({ date }: CalendarDayProps) {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const day = dateObj.getDate();

  return (
    <div className="flex flex-1 flex-col justify-center text-center">
      <h4 className="uppercase text-xs">{month}</h4>

      <h3 className="font-semibold">{day}</h3>
    </div>
  );
}
