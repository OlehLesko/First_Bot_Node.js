module.exports = {
    gameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [   {text: '1', callback_data: '2'}, 
                    {text: '2', callback_data: '1'}, 
                    {text: '3', callback_data: '1'}],
                [   {text: '4', callback_data: '2'}, 
                    {text: '5', callback_data: '1'}, 
                    {text: '6', callback_data: '1'}],
                [   {text: '7', callback_data: '2'},
                    {text: '8', callback_data: '1'},
                    {text: '9', callback_data: '1'}],
                [   {text: '0', callback_data: '1'}],
               
            ]
        })
    },
    
    againOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Грати ще раз', callback_data: '/again'}],
               
            ]
        })
    }
}