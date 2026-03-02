"use strict"
import Perplexity from '@perplexity-ai/perplexity_ai';
import { Telegraf } from 'telegraf';

const client = new Perplexity({
  apiKey: "",
});

const bot = new Telegraf('');

bot.use(async (ctx) => {
    try{
        const search = await client.search.create({
            query: ctx.update.message.text,
        });
        
        const sentMsg = await ctx.reply('🔍 Ищу...');
        const firstResult = search.results[0];    
        let fullText = firstResult.snippet.slice(0, 1000);

        await new Promise((resolve, reject) => {
            setTimeout(resolve, 1000);
        })

        let acc = "";

        for(let i = 0; i < fullText.length; i += 15){
            acc += fullText.slice(i, i + 15);
            await new Promise(r => {setTimeout(r, 80)});
            await ctx.telegram.editMessageText(ctx.chat.id, sentMsg.message_id, undefined, acc);
        }
    } catch(err) {
        console.log("Ошибка отправки: ", err.message);
        await ctx.reply(`Ошибка отправки запроса: ${err.message}`);
    }
});

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

console.log("Запущен бот");


        // await ctx.reply(JSON.stringify(ctx.update.message.text, null, 2));
        // await ctx.reply(JSON.stringify(search.results[0], null, 2));
        // for await (const res of search.results) {
        //     await ctx.reply(JSON.stringify(res, 0, 2));
        // }
        // const resultsText = JSON.stringify(search.results, null, 2);
        // const chunkSize = 4000;
        // for (let i = 0; i < resultsText.length; i += chunkSize) {
        // await ctx.reply(resultsText.slice(i, i + chunkSize));
        // }

let a = Array.from({length: 9}, (_, j) => j);
console.log(a);