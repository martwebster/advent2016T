export interface Value {
    value: number;
    bot: boolean;
    destination: number;
}
export namespace Value {
    export const fromData = (lines: string[]): Value[] =>{
        return lines
            .filter(it => it.startsWith("value"))
            .map(it => ({
                value: Number(it.substringBetween("value ", " goes")),
                bot: true,
                destination: Number(it.substringAfter("bot "))
            }))
    }
}

export interface Bot {
    id: number;
    values: number[];
    high : {
        bot?: number;
        output?: number;
    }
    low : {
        bot?: number;
        output?: number;
    }
}
export namespace Bot {
    export const fromData = (lines: string[]): Bot[] =>{
        return lines.filter(it => it.startsWith("bot")).map(it => ({
            id: Number(it.substringBetween("bot ", " gives")),
            low: {
                bot: it.indexOf("low to bot")==-1?undefined:Number(it.substringBetween("low to bot ", " and")),
                output: it.indexOf("low to output")==-1?undefined:Number(it.substringBetween("low to output ", " and"))
            },
            high : {
                bot: it.indexOf("high to bot")==-1?undefined:Number(it.substringAfterLast("bot ")),
                output: it.indexOf("high to output")==-1?undefined:Number(it.substringAfterLast("output ")),
            },
            values: []
        }))
    }
}

export const apply = (value: Value, bots: Bot[]): Value[] =>{
    const bot = bots.find(it=> it.id == value.destination)!;
    bot.values.push(value.value)
    if (bot.values.length !=2) {
        return [];
    }

    const lowBot = bot.low.bot != undefined
    const highBot = bot.high.bot != undefined
    return [
        {
            value: bot.values[0],
            bot: lowBot,
            destination: lowBot? bot.low.bot!: bot.low.output!
        },
        {
            value: bot.values[1],
            bot: highBot,
            destination: highBot? bot.high.bot!: bot.high.output!
        }
    ]

}

export const applyValues = (bots: Bot[], values: Value[]): number[] => {
    const output = [0,0,0]
    while (values.length > 0) {
        values = values.flatMap( it => apply(it, bots))
        values.filter(it => !it.bot) // output
            .forEach( it=> output[it.destination] = it.value)
        values = values.filter( it => it.bot)
    }
    return output
}
