export const hour = 3600
export const day = hour * 24
export const month = day * 30
export const year = month * 12

export default function displayTime(time) {
  const seconds = Math.floor(time % 60)
  const minutes = Math.floor(time / 60) % 60
  const hours = Math.floor(time / hour) % 24
  const days = Math.floor(time / day) % 30
  const months = Math.floor(time / month) % 12
  const years = Math.floor(time / year)

  if (years > 0) {
    return `${years}y ${months}m`;
  }

  if (months > 0) {
    return `${months}m ${days}d`;
  }

  if (days > 0) {
    return `${days}d ${hours}h`;
  }

  return `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
