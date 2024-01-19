import { Calendar, Header, Whisper, Popover, Badge } from "rsuite";

const CalendarUkr = {

  months: {
    1: 'Січень',
    2: 'Лютий',
    3: 'Березень',
    4: 'Квітень',
    5: 'Травень',
    6: 'Червень',
    7: 'Липень',
    8: 'Серпень',
    9: 'Вересень',
    10: 'Жовтень',
    11: 'Листопад',
    12: 'Грудень',
  },

  sunday: 'ВС',
  monday: 'ПН',
  tuesday: 'ВТ',
  wednesday: 'СР',
  thursday: 'ЧТ',
  friday: 'ПТ',
  saturday: 'СБ',
  ok: 'OK',
  today: 'Сьогодні',
  yesterday: 'Вчора',
  hours: 'Годин',
  minutes: 'Хвилин',
  seconds: 'Секунд',
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
  **/
 formattedMonthPattern: 'MMM yyyy',
 formattedDayPattern: 'dd MMM yyyy',
  
};

function getTodoList(date) {
  const day = date.getDate();

  switch (day) {
    case 13:
      return [
        { time: '08:30 am', title: 'ОКМ' },
        { time: '12:00 pm', title: 'ОПИ' }
      ];
    case 15:
      return [
        { time: '09:30 am', title: 'Архітектура' },
        { time: '11:30 am', title: 'Програмування' },
        { time: '5:30 pm', title: 'Музика' },
      ];
    default:
      return [];
  }
}

function renderCell(date) {
  const list = getTodoList(date);
  const displayList = list.filter((item, index) => index < 2);

  if (list.length) {
    const moreCount = list.length - displayList.length;
    const moreItem = (
      <li>
        <Whisper
          placement="top"
          trigger="click"
          speaker={
            <Popover style={{color:"white"}}>
              {list.map((item, index) => (
                <p key={index}>
                  <b>{item.time}</b> - {item.title}
                </p>
              ))}
            </Popover>
          }
        >
          <a>{moreCount} more</a>
        </Whisper>
      </li>
    );

    return (
      <ul className="calendar-todo-list">
        {displayList.map((item, index) => (
          <li key={index}>
            <Badge style={{color:"white"}}/> <b>{item.time}</b> - {item.title}
          </li>
        ))}
        {moreCount ? moreItem : null}
      </ul>
    );
  }

  return null;
}

const DeadLineCalendar = ({}) => {

    return (
    <>
      <Header>
        <h2 style={{color:'white', marginTop:"20px", marginLeft:"15px"}}>Календар виконання завдань</h2>
      </Header>
      <Calendar bordered isoWeek="true" locale={CalendarUkr}  style={{color:"white", marginTop:"20px"}} renderCell={renderCell}>

      </Calendar>
    </>
  );
};

export default DeadLineCalendar;
