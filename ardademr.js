const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
let cooldown = config['cooldown']
const prefix = config.prefix;
var fs = require("fs");
var lineReader = require("line-reader");
var async = require("async");
const firstline = require("firstline");
const generated = new Set();
var os = require("os");

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});
bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", message => {
    if (message.channel.id === config.botChannel) { 
        if (message.author.bot) return;
        var command = message.content
            .toLowerCase()
            .slice(prefix.length)
            .split(" ")[0];

        if (command === "gen") {
            if (generated.has(message.author.id)) {
                message.channel.send(
                    "You have a Cool Down of 24 Hours! - " +
                    message.author
                );
            } else {
                let messageArray = message.content.split(" ");
                let args = messageArray.slice(1);
                if (!args[0])
                    return message.reply("Lütfen Servis Seç (Netflix,Spotify,Steam,Nitro,Valorant)");
                var fs = require("fs");
                const filePath = __dirname + "/" + args[0] + ".txt";
                //if(args[0] != __dirname + "txt") return message.reply("Couldnt found: " + args[0] + " in our Database!")

                const embed = {
                    title: "Out of Stock!",
                    description: "The Service that you requested is currently Out of Stock!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1",
                        text: "Developed by BatuSyex#1974"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1"
                    },
                    author: {
                        name: "Syex Account Generator Bot",
                        url: "https://discord.gg/syex",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };

                fs.readFile(filePath, function (err, data) {
                    if (!err) {
                        data = data.toString();
                        var position = data.toString().indexOf("\n");
                        var firstLine = data.split("\n")[0];
                        if(position == -1)
                        return message.channel.send({ embed });
                        message.author.send(firstLine);
                        if (position != -1) {
                            data = data.substr(position + 1);
                            fs.writeFile(filePath, data, function (err) {
                                const embed = {
                                    title: "Hesap Oluşturuldu!",
                                    description: "Hesapını oluşturup dm kutuna yolladım hemen bak!",
                                    color: 0xff033d,
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url:
                                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1",
                                        text: "Developed by BatuSyex#1974"
                                    },
                                    thumbnail: {
                                        url:
                                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1"
                                    },
                                    author: {
                                        name: "Syex Account Generator Bot",
                                        url: "https://discord.gg/syex",
                                        icon_url: bot.displayAvatarURL
                                    },
                                    fields: []
                                };
                                message.channel.send({ embed });
                                generated.add(message.author.id);
                                setTimeout(() => {
                                    generated.delete(message.author.id);
                                }, 86400000); // 86400000 = 24 H , 150000 = 15 Min
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            message.channel.send("Out of Stock!");
                        }
                    } else {
                        const embed = {
                            title: "Service Not found!",
                            description: "The requested Service could not be found!",
                            color: 0xff033d,
                            timestamp: new Date(),
                            footer: {
                                icon_url:
                                    "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1",
                                text: "Developed by BatuSyex#1974"
                            },
                            thumbnail: {
                                url:
                                    "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1"
                            },
                            author: {
                                name: "Syex Account Generator Bot",
                                url: "https://discord.gg/syex",
                                icon_url: bot.displayAvatarURL
                            },
                            fields: []
                        };
                        message.channel.send({ embed });
                        return;
                    }
                });
            }
        }
        else
            if (command === "stats") {
                const embed = {
                    title: "Stats",
                    description: `Total Users: ${bot.users.size}`,
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1",
                        text: "Developed by BatuSyex#1974"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1"
                    },
                    author: {
                        name: "Syex Account Generator Bot",
                        url: "https://discord.gg/syex",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            }
        
            if (command === "help") {

                const embed = {
                    color: 0xff033d,
                    title: 'Syex Account Generator Bot',
                    url: 'https://discord.gg/syex',
                    author: {
                        name: 'Komut Listesi',
                        //icon_url: 'https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1',
                        url: 'https://discord.gg/syex',
                    },
                    description: '**Bütün Komutların Listesi**',
                    thumbnail: {
                        url: 'https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1',
                    },
                    fields: [
                        {
                            name: 'Hesap Üret',
                            value: 'Kullanım: /gen <Servis İsmi>',
                        },
                        {
                            name: 'Servis Üret',
                            value: 'Kullanım: /create <Servis İsmi>',
                        },
                        {
                            name: 'Stok Yenile',
                            value: 'Kullanım: /restock <Servis İsmi>',
                        },
                        {
                            name: 'Hesap Ekle',
                            value: 'Kullanım: /add <user:pass> <Servis İsmi>',
                        },
                        {
                            name: 'Botun statslarını gösterir',
                            value: 'Kullanım: /stats',
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: 'Developed by BatuSyex#1974',
                        icon_url: 'https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1',
                    },
                };
                message.channel.send({ embed });
            }

        if (command === "add") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Bunu yapmaya yetkin yok!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            var account = args[0]
            var service = args[1]
            if(!account) return message.reply("Provide a Formated Account String first!")
            if(!service) return message.reply("Provide a Service first!")
            const filePath = __dirname + "/" + args[1] + ".txt";
            fs.appendFile(filePath, os.EOL + args[0], function (err) {
                if (err) return console.log(err);
                const embed = {
                    title: "Hesap Eklendi!",
                    description: "Hesap başarıyla eklendi " + service + "!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1",
                        text: "Developed by BatuSyex#1974"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1"
                    },
                    author: {
                        name: "Syex Account Generator Bot",
                        url: "https://discord.gg/syex",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });


        }
        if (command === "create") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Bunu yapmaya yetkin yok!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            const filePath = __dirname + "/" + args[0] + ".txt";
            fs.writeFile(filePath, 'Syex:Syex', function (err) {
                if (err) throw err;
                const embed = {
                    title: "Servis Oluşturuldu!",
                    description: "Başarıyla Servis Oluşturuldu " + args[0] + "!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1",
                        text: "Developed by BatuSyex#1974"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1"
                    },
                    author: {
                        name: "Syex Account Generator Bot",
                        url: "https://discord.gg/syex",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            });
        }
        if (command === "restock") {
            const embed = {
                title: "Hizmet Sağlayın!",
                description: "Lütfen Yeniden Stoklanan Hizmetin Adını Belirtin!",
                color: 0xff033d,
                timestamp: new Date(),
                footer: {
                    icon_url:
                        "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1",
                    text: "Developed by BatuSyex#1974"
                },
                thumbnail: {
                    url:
                        "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1"
                },
                author: {
                    name: "Syex Account Generator Bot",
                    url: "https://discord.gg/syex",
                    icon_url: bot.displayAvatarURL
                },
                fields: []
            };
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Bunu yapmaya yetkin yok!");
            if (!args[0])
            {
                return message.channel.send({ embed });
            }
            else {
            message.channel.send(" " + args[0] + " Stokları Yenilendi Yenileyen :arrow_forward: " + "<@" + message.author.id +">");
            }
        }
    }
});

bot.login(process.env.TOKEN);