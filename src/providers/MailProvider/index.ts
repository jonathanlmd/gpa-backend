import { container } from 'tsyringe';
import mailConfig from '../../config/mail';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';
import IMailProvider from './models/IMailProvider';

const mailProviders = {
	ethereal: container.resolve(EtherealMailProvider),
	ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
	'MailProvider',
	mailProviders[mailConfig.driver],
);
