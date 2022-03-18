const TelegramApi = require('node-telegram-bot-api');

const token = '5270146474:AAGhGi7XPdl1ZOnWzGHO8RJ7nqh-wX8I5Hc';

const bot = new TelegramApi(token, {polling: true});

const chats = {};

const {gameOptions, againOptions} = require('./options')

const startGame = async (chatID) => {
    await bot.sendMessage(chatID, `Зараз я загадаю цифру від 0 до 9,
            а ти маєш її відгадати`)
    const randomnum = Math.floor(Math.random() * 10);
    chats[chatID] = randomnum;
    await bot.sendMessage(chatID, 'Відгадай число', gameOptions);
};

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Старт'},
        {command: '/info', description: 'Отримати інформацію про юзера'},
        {command: '/game', description: 'Ігра відгадай цифру'}
    ]);
    
    bot.on('message', async msg => {
        const txt = msg.text;
        const chatID = msg.chat.id;
    
        if (txt === '/start') {
            await bot.sendSticker(chatID, 
                'https://tlgrm.ru/_/stickers/d06/e20/d06e2057-5c13-324d-b94f-9b5a0e64f2da/4.webp')
            return bot.sendMessage(chatID, `Вітаємо ти підписався на нашого бота`);
        }

        if (txt === '/info') {
            return bot.sendMessage(chatID, `Тебе звати ${msg.from.first_name} ${msg.from.last_name}`);
        }

        if(txt === '/game'){
            return startGame(chatID);
        }
        return bot.sendMessage(chatID, 'Я тебе не розумію !')
        
    });

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatID = msg.message.chat.id;

        if(data === '/again') {
            return startGame(chatID);
        }

        if(data === chats[chatID]) {
            return bot.sendMessage(chatID,
                 `Вітаємо, ти відгадав цифру ${chats[chatID]}`,
                 againOptions)
        } else {
            return bot.sendMessage(chatID,
                 `Нажаль ти не вгадав, бот загадав цифру ${chats[chatID]}`,
                 againOptions)

        }
    });
};

start()