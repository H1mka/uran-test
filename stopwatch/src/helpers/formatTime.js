export const formatTime = (time) => {
  return Number(time) >= 10 ? time : '0' + time
}
