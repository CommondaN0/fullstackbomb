// const { Telegraf } = require('telegraf');

// const bot = new Telegraf('8566475238:AAEZav7fwiG0uH3PmFhcasJn82U2EfyW16Y');

// bot.use(async (ctx) => {
//     await ctx.reply(JSON.stringify(ctx.update, null, 2));
// });

// bot.launch().then(() => console.log('Started'));

// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

//////////

// const { Telegraf } = require('telegraf');

// const bot = new Telegraf('8566475238:AAEZav7fwiG0uH3PmFhcasJn82U2EfyW16Y');

// const middleware1 = (ctx, next) => {
//     console.log('middleware1');
//     next();
// };
// const middleware2 = (ctx, next) => {
//     console.log('middleware2');
// };
// const middleware3 = (ctx, next) => {
//     console.log('middleware3');
// };

// bot.use(middleware1);
// bot.use(middleware2);
// bot.use(middleware3);

// bot.launch().then(() => console.log('Started'));

// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

//////////

// const {Telegraf, Markup} = require('telegraf');

// const bot = new Telegraf('8566475238:AAEZav7fwiG0uH3PmFhcasJn82U2EfyW16Y');

// bot.command('help', (ctx) => {
//     ctx.reply(`
// Бот имеет список всех лиц 321 учбеной группы.
// Для того, чтобы узнать, кто шлюха, необходимо написать имя или кликуху человека.
//     `)
// });

// bot.command('start', (ctx) => {
//     ctx.reply(`
//         Самая грязная шлюха 32 курса это Серёжа Петрухин.
//         Для того, чтобы узнать о функционале бота напшиете
//         команду /help
//     `)
// });

// bot.hears('Гусь', (ctx) => ctx.reply('Гусь - шлюха'));
// bot.hears('Черников', (ctx) => ctx.reply('Черничка - шлюха'));
// bot.hears('Ляха', (ctx) => ctx.reply('Ляха - шлюха'));

// bot.on('text', (ctx) => ctx.reply(`"${ctx.update.message.text}" не шлюха.`))

// bot.launch().then(() => console.log('Started'));

// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

/////////

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const getCoinSide = () => getRandomInt(0, 1) === 0 ? 'Орёл' : 'Решка';
// const coinInlineKeyboard = Markup.inlineKeyboard([
//     Markup.button.callback('Подбросить ещё раз', 'flip_a_coin'),
// ]);
// bot.hears('Подбросить монетку', ctx => ctx.reply(getCoinSide(), coinInlineKeyboard));
// bot.action('flip_a_coin', async(ctx) => {
//     await ctx.editMessageText(`${getCoinSide()}\nОтредактировано: ${new Date().toISOString()}`, coinInlineKeyboard);
// });

// const getRandomNumber = () => getRandomInt(0, 100);
// const numberInlineKeyboard = Markup.inlineKeyboard([
//     Markup.button.callback('Сгенерировать новое', 'random_number'),
// ]);
// bot.hears('Случайное число', ctx => ctx.reply(getRandomNumber().toString(), numberInlineKeyboard));
// bot.action('random_number', async(ctx) => {
//     await ctx.editMessageText(`${getRandomNumber()}\nОтредактировано: ${new Date().toISOString()}`, numberInlineKeyboard);
// });

// bot.use(async (ctx) => {
//     await ctx.reply('Что нужно сделать?', Markup
//         .keyboard([
//             ['Подбросить монетку', 'Случайное число'],
//         ]).resize()
//     )
// });

// bot.launch().then(() => console.log('Started'));

// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

/////

// const {Telegraf} = require('telegraf');

// const bot = new Telegraf('8566475238:AAEZav7fwiG0uH3PmFhcasJn82U2EfyW16Y');

// const chatId = 421721685;
// const intervalMs = 1000;
// const getCatUrl = () => `https://cataas.com/cat?t=${new Date().getTime()}`;

// const sendCat = () => {
//     bot.telegram.sendPhoto(chatId, getCatUrl()).then(() => setTimeout(sendCat, intervalMs));
// }

// sendCat();