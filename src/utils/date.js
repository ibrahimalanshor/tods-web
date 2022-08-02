import dayjs from 'dayjs';

export default {
  format: (date, format = 'DD MMMM YY HH:mm:ss') => dayjs(date).format(format),
};
