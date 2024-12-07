/* eslint-disable no-useless-escape */
export const isImage = function (body) {
  const pattern = /[\-\w]+\r\nContent-Disposition:\sform-data;\sname=.*\r\n/;
  return pattern.test(body);
};
