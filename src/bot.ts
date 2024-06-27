import { Bot, Context,  } from 'grammy'
import * as dotenv from 'dotenv';
import * as fs from "fs";
import * as dotenvExpand from 'dotenv-expand';
dotenv.config()
import Logger from "./config/winston/index"

const env = process.env.NODE_ENV || 'development'
const envFilePath = `.env.${env}`
if (fs.existsSync(envFilePath)) {
    const envConfig = dotenv.config({ path: envFilePath });
    dotenvExpand.expand(envConfig);
} else {
    throw new Error(`Environment file ${envFilePath} not found`);
}
const botToken = process.env.BOT_TOKEN;





export type MyContext = Context
const bot = new Bot<MyContext>(<string>botToken)

bot.on("message", (ctx)=>{
    ctx.reply("Worning botq 54")
})


bot.start(
    {
        allowed_updates: ["my_chat_member", "chat_member", "message", "callback_query", "inline_query"],
        onStart: (bot) => {
            Logger.info(`https://t.me/${bot.username} has been started`)
        }
    }
).then( r =>r)