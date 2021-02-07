import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeUserTokensRepository = new FakeUserTokensRepository();
		fakeHashProvider = new FakeHashProvider();

		resetPassword = new ResetPasswordService(
			fakeUsersRepository,
			fakeUserTokensRepository,
			fakeHashProvider
		);
	});

	it('should be able to reset the password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Joao',
			email: 'joao@gmail.com',
			password: '123123',
		});

		const { token } = await fakeUserTokensRepository.generate(user.id);
		const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
		await resetPassword.execute({
			password: '321312',
			token,
		});

		const updateUser = await fakeUsersRepository.findById(user.id);

		expect(updateUser?.password).toBe('321312');

		expect(generateHash).toHaveBeenCalledWith('321312');
	});

	it('should not be able to reset the password with non-existing token', async () => {
		await expect(
			resetPassword.execute({
				token: '11111',
				password: '123123',
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to reset the password with non-existing user', async () => {
		const { token } = await fakeUserTokensRepository.generate('joao');
		await expect(
			resetPassword.execute({
				token,
				password: '123123',
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to reset the password after more than 2 hours', async () => {
		const user = await fakeUsersRepository.create({
			name: 'Joao',
			email: 'joao@gmail.com',
			password: '123123',
		});

		const { token } = await fakeUserTokensRepository.generate(user.id);

		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			const customDate = new Date();
			return customDate.setHours(customDate.getHours() + 3);
		});

		await expect(
			resetPassword.execute({
				password: '321312',
				token,
			})
		).rejects.toBeInstanceOf(AppError);
	});
});
