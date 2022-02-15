import moment from 'moment';

export const getToDayTime = function (
	format: string | undefined = 'DD/MM/YYYY'
): string {
	return moment().format(format);
};
