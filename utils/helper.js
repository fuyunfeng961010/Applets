// 年份转换为中文显示
const yearConver = year => {
  if (!year) return null
  const dict = {
    '0': '零',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
    '7': '七',
    '8': '八',
    '9': '九'
  }
  return String(year).split('').map(item => dict[item]).join('')
}

module.exports = {
  yearConver
}