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
        if (message.author.bot) return;
        if(!message.guild) return;

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
                    return message.reply("Lütfen Servis Seç (Spotify,LoL,Steam,Zula,Pubgm,Origin,Nitro,Valorant,Blutv,Exxen,Fortnite,NordVPN,Roblox)");
                var fs = require("fs");
                const filePath = __dirname + "/" + args[0] + ".txt";
                //if(args[0] != __dirname + "txt") return message.reply("Couldnt found: " + args[0] + " in our Database!")

                const embed = {
                    title: "Stok Yok!",
                    description: "Malesef stoklarımız bitti :(",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://media.discordapp.net/attachments/838377389569998898/871995656691138600/giphy.gif",
                        text: "Developed by Sasquatch#0666"
                    },
                    thumbnail: {
                        url:
                            "https://media.discordapp.net/attachments/838377389569998898/871995656691138600/giphy.gif"
                    },
                    author: {
                        name: "Sasquatch Generator",
                        url: "https://discord.gg/nJVBYybR9q",
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
                                    description: "Hesabını oluşturup dm kutuna yolladım hemen bak!",
                                    color: 0xff033d,
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url:
                                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1",
                                        text: "Developed by Sasquatch#0666"
                                    },
                                    thumbnail: {
                                        url:
                                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1"
                                    },
                                    author: {
                                        name: "Sasquatch Account Generator Bot",
                                        url: "https://discord.gg/nfPMBN52Xb",
                                        icon_url: bot.displayAvatarURL
                                    },
                                    fields: []
                                };
                                message.channel.send({ embed });
                                generated.add(message.author.id);
                                setTimeout(() => {
                                    generated.delete(message.author.id);
                                }, 0); // 86400000 = 24 H , 150000 = 15 Min
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            message.channel.send("Stok Yok!");
                        }
                    } else {
                        const embed = {
                            title: "Servis Bulunamadı!",
                            description: "Böyle bir servis bulunamadı",
                            color: 0xff033d,
                            timestamp: new Date(),
                            footer: {
                                icon_url:
                                    "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1",
                                text: "Developed by Sasquatch#0666"
                            },
                            thumbnail: {
                                url:
                                    "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1"
                            },
                            author: {
                                name: "Sasquatch Account Generator Bot",
                                url: "https://discord.gg/nfPMBN52Xb",
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
                        text: "Developed by Sasquatch#0666"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1"
                    },
                    author: {
                        name: "Sasquatch Account Generator Bot",
                        url: "https://discord.gg/6dpeGGC6Ra",
                        icon_url: bot.displayAvatarURL
                    },
                    fields: []
                };
                message.channel.send({ embed });
            }
        
            if (command === "help") {

                const embed = {
                    color: 0xff033d,
                    title: 'Sasquatch Account Generator Bot',
                    url: 'https://discord.gg/6dpeGGC6Ra',
                    author: {
                        name: 'Komut Listesi',
                        //icon_url: 'https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1',
                        url: 'https://discord.gg/6dpeGGC6Ra',
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
                        text: 'Developed by Sasquatch#0666',
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
                        text: "Developed by Sasquatch#0666"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1"
                    },
                    author: {
                        name: "Sasquatch Account Generator Bot",
                        url: "https://discord.gg/nfPMBN52Xb",
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
            fs.writeFile(filePath, 'Sasquatch:Sasquatch', function (err) {
                if (err) throw err;
                const embed = {
                    title: "Servis Oluşturuldu!",
                    description: "Başarıyla Servis Oluşturuldu " + args[0] + "!",
                    color: 0xff033d,
                    timestamp: new Date(),
                    footer: {
                        icon_url:
                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1",
                        text: "Developed by Sasquatch#0666"
                    },
                    thumbnail: {
                        url:
                            "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1"
                    },
                    author: {
                        name: "Sasquatch Account Generator Bot",
                        url: "https://discord.gg/nfPMBN52Xb",
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
                    text: "Developed by Sasquatch#0666"
                },
                thumbnail: {
                    url:
                        "https://cdn.discordapp.com/emojis/830745640643330048.gif?v=1"
                },
                author: {
                    name: "Sasquatch Account Generator Bot",
                    url: "https://discord.gg/nfPMBN52Xb",
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
);

bot.login(process.env.TOKEN);
