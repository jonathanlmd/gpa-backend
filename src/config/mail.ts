interface IMailConfig {
	driver: 'ethereal';
	defaults: {
		from: {
			email: string;
			name: string;
		};
	};
}

export default {
	driver: process.env.MAIL_DRIVER || 'ethereal',
	defaults: {
		from: {
			email: 'jonathan@exemplo.com',
			name: 'Jonathan',
		},
	},
} as IMailConfig;
