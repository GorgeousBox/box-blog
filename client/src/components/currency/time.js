//  时间格式 月 + 日
export function formatDateTime(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return m + '月' + d + "日";
}

// js处理时间段
export function tiemFormat(time) {
  // 187076 变成 03：20

  var minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
  if(minutes<10){ //1  01
      minutes = "0"+minutes
  }
  var seconds =  parseInt((time % (1000 * 60)) / 1000);
  if(seconds<10){ //1  01
      seconds = "0"+seconds
  }
  return  minutes +':' +seconds
}

//  年月日 
export function formatDateTimeY(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y+'年'+ m + '月' + d + "日";
}
// 年月日时分秒
export function formatDateTimeYM(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y+'年'+ m + '月' + d + "日"+minute+'分'+second+"秒";
}
// 秒变成 00:00
export function fromDataTimeOne(m){
//   610
// 分钟
let minute =  m/60
let minutes = parseInt(minute)
//当大于10 的时候
if(minutes<10){
  minutes = "0"+minutes
}
//秒
let second = m%60
let seconds =  parseInt(second)
if(seconds<10){
  seconds = "0"+seconds
}
return  `${minutes}:${seconds}`
}