import dotenv from "dotenv";
dotenv.config();
import { ApplicationCommandOptionType, REST, Routes } from 'discord.js';

const commands = [
	{
		name: 'ruthere',
		description: '봇이 잘 작동하고 있는지 확인합니다.',
	},
	{
		name: 'current-meeting',
		description: '이번 주의 화상회의 일정을 확인해요.',
	},
	{
		name: 'schedule-meeting',
		description: '화상회의 일정을 조정합니다.',
		options: [
			{
				name: '요일',
				description: "'월', '화', '수', '목', '금', '토', '일'",
				type: ApplicationCommandOptionType.String,
				required: true
			},
			{
				name: '시',
				description: '0 ~ 24로 입력해 주세요.',
				type: ApplicationCommandOptionType.Number,
				required: true
			},
			{
				name: '분',
				description: '0 ~ 59로 입력해 주세요.',
				type: ApplicationCommandOptionType.Number,
				required: true
			}
		]
	},
];

const rest = new REST({version: '10'}).setToken(process.env.DISCORD_BOT_ID);

export const setSlashCommands = async () => {
	try {
		console.log('Registering slash commands... ');

		await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{
				body: commands
			}
		)
		console.log('Registered slash commands successfully');
		
	} catch (error) {
		console.log(error);
	}
};