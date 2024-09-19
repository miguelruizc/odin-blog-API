import chalk from 'chalk';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

		res.json({ message: `User ascended: ${user.username}` });
	} catch (error) {
		console.error(chalk.red('Error handling POST /ascend request: ', error));
		next(error);
	}
};
