function getRandomTimeInRange(start: string, end: string) {
  const startParts = start.split(':').map(Number);
  const endParts = end.split(':').map(Number);

  const startMinutes = startParts[0] * 60 + startParts[1];
  let endMinutes = endParts[0] * 60 + endParts[1];

  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60;
  }

  const randomMinutes =
    Math.floor(Math.random() * (endMinutes - startMinutes + 1)) + startMinutes;

  const hours = Math.floor(randomMinutes / 60) % 24;
  const minutes = randomMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}`;
}

function generateCallTimes(start: string, end: string, interval: number) {
  const times = [];
  let current = start;

  while (isTimeLessOrEqual(current, end)) {
    const randomTime = getRandomTimeInRange(
      current,
      addMinutes(current, interval - 1)
    );
    times.push(randomTime);
    current = addMinutes(current, interval);
  }

  return times;
}

function generateCallTimesOvernight(start: string, end: string, interval: number) {
  const times = [];
  let current = start;

  while (isTimeLessOrEqual(current, '23:59')) {
    const randomTime = getRandomTimeInRange(
      current,
      addMinutes(current, interval - 1)
    );
    times.push(randomTime);
    current = addMinutes(current, interval);
    const startParts = current.split(':').map(Number);
    if (startParts[0] === 0 || !isTimeLessOrEqual(current, '23:59')) break;
  }

  current = '00:00';
  while (isTimeLessOrEqual(current, end)) {
    const randomTime = getRandomTimeInRange(
      current,
      addMinutes(current, interval - 1)
    );
    times.push(randomTime);
    current = addMinutes(current, interval);
  }

  return times;
}

function addMinutes(time: string, minutes: number) {
  const parts = time.split(':').map(Number);
  const totalMinutes = (parts[0] * 60 + parts[1] + minutes) % (24 * 60);

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

function isTimeLessOrEqual(time1: string, time2: string) {
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);

  if (hours1 < hours2) return true;
  if (hours1 > hours2) return false;
  return minutes1 <= minutes2;
}

function generateGroupCallTimes() {
  const periods = [
    { start: '10:01', end: '21:59', interval: 60 },
    { start: '22:01', end: '05:59', interval: 30 },
    { start: '06:01', end: '08:29', interval: 60 },
  ];

  const allTimes: string[] = [];

  periods.forEach((period) => {
    let times;

    if (period.start === '22:01' && period.end === '05:59') {
      times = generateCallTimesOvernight(
        period.start,
        period.end,
        period.interval
      );
    } else {
      times = generateCallTimes(period.start, period.end, period.interval);
    }
    allTimes.push(...times);
  });
  return allTimes;
}


export function assignTimesToGroups(groups: string[]) {
  const result: any  = {};

  groups.forEach((group) => {
    result[group] = generateGroupCallTimes();
  });

  return result;
}

// const groups = ['Иванов', 'Смирнов', 'Соболев'];
// export const groupCallTimes = assignTimesToGroups(groups);
// // module.exports = 
// console.log(groupCallTimes);
