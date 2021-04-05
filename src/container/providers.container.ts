import { container } from 'tsyringe';
import EtherealMailProvider from '../providers/MailProvider/implementations/EtherealMailProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';
import IMailProvider from '../providers/MailProvider/models/IMailProvider';
import mailConfig from '../config/mail';
import HandlebarsMailTemplateProvider from '../providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from '../providers/MailTemplateProvider/models/IMailTemplateProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

const providers = {
	handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
	'MailTemplateProvider',
	providers.handlebars,
);

const mailProviders = {
	ethereal: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
	'MailProvider',
	mailProviders[mailConfig.driver],
);
