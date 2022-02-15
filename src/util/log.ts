import {configure, getLogger,shutdown} from 'log4js';

configure({
	appenders: {
		// 定义输出到哪
		console: {
			type: 'stdout',
		},
		runtime: {
			type: 'dateFile',
			pattern: '-yyyy-MM-dd.log',
			daysToKeep: 10, // 删除5天前的日志
			filename: './logs/runtime.log',
			keepFileExt: false,
			compress: true,
		}
	},
	categories: {
		// 定义两个分类，外部实例化的时候可以任选其一
		default: {appenders: ['console', 'runtime'], level: 'debug'},
	},
});
const LOGGER = getLogger();

export {
    LOGGER,
    shutdown
};
