import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		updateProfileService = new UpdateProfileService(
			fakeUsersRepository,
			fakeHashProvider
		);
	});

	it('should be able to update the profile', async () => {
		const user = await fakeUsersRepository.create({
			name: 'joao',
			email: 'joao@gmail.com',
			password: '123123',
		});

		const updateUser = await updateProfileService.execute({
			user_id: user.id,
			name: 'Luis',
			email: 'luis@gmail.com',
		});

		expect(updateUser.name).toBe('Luis');
		expect(updateUser.email).toBe('luis@gmail.com');
	});
	it('should not be able to update the profile from non-existing user', async () => {
		await expect(
			updateProfileService.execute({
				user_id: 'non-existing user',
				name: 'Luis',
				email: 'luis@gmail.com',
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to change to another user email', async () => {
		await fakeUsersRepository.create({
			name: 'joao',
			email: 'joao@gmail.com',
			password: '123123',
		});

		const user = await fakeUsersRepository.create({
			name: 'Luis',
			email: 'luis@gmail.com',
			password: '123123',
		});

		await expect(
			updateProfileService.execute({
				user_id: user.id,
				name: 'Fulano',
				email: 'joao@gmail.com',
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to update the password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'joao',
			email: 'joao@gmail.com',
			password: '123123',
		});

		const updateUser = await updateProfileService.execute({
			user_id: user.id,
			name: 'Luis',
			email: 'luis@gmail.com',
			password: '321321',
			old_password: '123123',
		});

		expect(updateUser.password).toBe('321321');
	});
	it('should not be able to update the password without old password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'joao',
			email: 'joao@gmail.com',
			password: '123123',
		});

		await expect(
			updateProfileService.execute({
				user_id: user.id,
				name: 'Luis',
				email: 'luis@gmail.com',
				password: '321321',
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to update the password with wrong old password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'joao',
			email: 'joao@gmail.com',
			password: '123123',
		});

		await expect(
			updateProfileService.execute({
				user_id: user.id,
				name: 'Luis',
				email: 'luis@gmail.com',
				password: '321321',
				old_password: '1111',
			})
		).rejects.toBeInstanceOf(AppError);
	});
});
