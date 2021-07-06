const start = Date.UTC(2900)

export default function GameDate({time}) {
  const date = new Date(start + time * 1000)
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = date.getUTCDate().toString().padStart(2, '0')
  const hour = date.getUTCHours().toString().padStart(2, '0')
  const minute = date.getUTCMinutes().toString().padStart(2, '0')
  const second = date.getUTCSeconds().toString().padStart(2, '0')
  return (<div>{date.getUTCFullYear()}-{month}-{day} {hour}:{minute}:{second}</div>)
}
