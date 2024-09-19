import chalk from 'chalk';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { generateJWT } from '../misc/jwt.js';

export const POST_ascend = async (req, res, next) => {
	// Find user in database and set isAuthor to true
	try {
		const user = await prisma.user.update({
			where: { id: req.user.id },
			data: { isAuthor: true },
		});

		console.log(
			'*------------------------',
			'\nUser ascended:\n-username:',
			chalk.yellow(user.username),
			'\n-isAuthor:',
			chalk.magenta(user.isAuthor)
		);

		const jwt = generateJWT(user);

		res.json({ message: `User ascended: ${user.username}`, jwt });
	} catch (error) {
		console.error(chalk.red('Error handling POST /ascend request: ', error));
		next(error);
	}
};
