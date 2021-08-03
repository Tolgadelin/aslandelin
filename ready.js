const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../.env');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[BOT] | Botun destekçileri ve komutları başarıyla yüklendi, işlemler tamamlandı !`);
  console.log(`[BOT] | (${client.user.username}) HAZIR KAPTAN!
  ‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒`);
  client.user.setStatus("online");
  client.user.setActivity("Valorant,Steam,BluTV,Netflix ACCOUNT GENERATOR", { type: "WATCHING"}); //// TYPE - WATCHING , PLAYING , LISTENING gibi değiştirilebilir.
};

