import * as dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config()

const BOT_TOKEN : string = process.env.BOT_TOKEN ?? ""
const SPACE_MINER_IDLE_GAME_SHORT_NAME : string = "SpaceMinerIdle"
const bot = new TelegramBot(BOT_TOKEN, { polling: true } );
bot.onText(/help/, (msg) => bot.sendMessage(msg.from?.id ?? "", "This bot serves up a space mining idle game! Say /game if you want to play."));
bot.onText(/start|game/, (msg) => bot.sendGame(msg.from?.id ?? "", SPACE_MINER_IDLE_GAME_SHORT_NAME));


bot.on("callback_query", function (query) {
    if (query.game_short_name !== SPACE_MINER_IDLE_GAME_SHORT_NAME) {
      bot.answerCallbackQuery(query.id, { text: "Sorry, '" + query.game_short_name + "' is not available." });
    } else {
      let gameurl = "https://idle-phaser-telegram-ed97a33da30d.herokuapp.com/";
      bot.answerCallbackQuery(query.id, {
        url: gameurl
      });
    }
  });
