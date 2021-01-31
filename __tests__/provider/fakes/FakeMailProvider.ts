import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

class FakeMailPRovider implements IMailProvider {
	private messages: ISendMailDTO[] = [];

	public async sendMail(message: ISendMailDTO): Promise<void> {
		this.messages.push(message);
	}
}

export default FakeMailPRovider;
