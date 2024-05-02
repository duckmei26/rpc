const { Client, RichPresence } = require('discord.js-selfbot-v13');
const client = new Client({
  checkUpdate: false,
});
const data = require("./config.js");
const { scheduleJob, RecurrenceRule } = require("node-schedule");
let channel = data.channel;
let owner = data.owner;
const huntBattleRule = new RecurrenceRule();
huntBattleRule.second = [0, 36];
const buyRule = new RecurrenceRule();
buyRule.second = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const owoRule = new RecurrenceRule();
owoRule.second = [0, 29, 52];
const prayRule = new RecurrenceRule();
prayRule.minute = [0, 6]

let huntJob;
let buyJob;
let owoJob;
let prayJob;

client.on('ready', async () => {
  if (!data.disable.hunt || !data.disable.battle)
    huntJob = scheduleJob(huntBattleRule, () => {
      setTimeout(() => {
        if (!data.disable.hunt) client.channels.cache.get(channel).send("oh");
      }, 1500);
      setTimeout(() => {
        if (!data.disable.battle)
          client.channels.cache.get(channel).send("ob");
      }, 1800);
    });

  buyJob = scheduleJob(buyRule, () => {
    if (!data.disable.buy) client.channels.cache.get(channel).send("owobuy 1");
  });
  owoJob = scheduleJob(owoRule, () => {
    if (!data.disable.owo) client.channels.cache.get(channel).send("owo");
  });
  prayJob = scheduleJob(prayRule, () => {
    if (!data.disable.pray) client.channels.cache.get(channel).send("opray");
  });
  
  buyJob.cancel();
  huntJob.cancel();
  owoJob.cancel();
  prayJob.cancel();
  
  const rpc = new RichPresence()
      .setType('STREAMING')
      .setURL('https://www.twitch.tv/lookinsomething')
      .setState('"Gặp May"')
      .setName('Kou')
      .setDetails('𝘿𝙪𝙘𝙠𝙈𝙚𝙞')
      .setStartTimestamp(Date.now())

      .setAssetsLargeImage('https://media.discordapp.net/attachments/1033356333094809600/1141655360000753784/e01a354a45f835fba2448f65a5c7a7f5.gif?ex=663353e8&is=66320268&hm=4fba974cc0212fd4df1772cab6be272a66a5e4eca42a370e971d79f03182cda5&')
  client.user.setActivity(rpc)
   client.user.setPresence({ status: 'online' })
  console.log(`${client.user.username} is ready!`);
})

client.on("messageCreate", async message => {
  if (message.channel.id !== channel && message.channel.type !== "dm") return;
  if (message.author.id !== "408785106942164992") return;

  if (
    [
      "Beep Boop. A",
      "real human?",
      "can check!",
      "Please DM me",
      "Wrong verification",
      " Please complete your captcha",
      "solving the captcha",
      "http://verify.owobot.com/",
      " Please use the link ",
    ].some((phrase) =>
      message.content.toLowerCase().includes(phrase.toLowerCase())
    )
  ) {
    buyJob.cancel();
    huntJob.cancel();
    owoJob.cancel();
    prayJob.cancel();
  }
  
  if (message.content.includes("Thank you! :3")) {
    buyJob.reschedule(buyRule);
    huntJob.reschedule(huntBattleRule);
    owoJob.reschedule(owoRule);
    prayJob.reschedule(prayRule);
  }
      
  if (
    ["spent 5", "and caught an"].some((phrase) =>
      message.content.toLowerCase().includes(phrase.toLowerCase())
    )
  ) {
    //stop
    huntJob.cancel();
    buyJob.cancel();
    owoJob.cancel();
    prayJob.cancel();

    let randomGem = getRandomInt(data.inv.length);
    setTimeout(() => {
      client.channels.cache
        .get(channel)
        .send(
          "owouse " +
            data.inv[randomGem].toString() +
            " " +
            (data.inv[randomGem] + 14).toString() +
            " " +
            (data.inv[randomGem] + 21).toString()
        );
    }, 1686);
    buyJob.reschedule(buyRule);
    huntJob.reschedule(huntBattleRule);
    owoJob.reschedule(owoRule);
    prayJob.reschedule(prayRule);
  }
})
client.on("messageCreate", async message => {
  if (message.channel.id === channel && message.author.id === owner) {
    if (message.content.toLowerCase() === "dmof") {
      huntJob.cancel();
      buyJob.cancel();
      owoJob.cancel();
      prayJob.cancel();
    }
    if (message.content.toLowerCase() === "dmon") {
      buyJob.reschedule(buyRule);
      huntJob.reschedule(huntBattleRule);
      owoJob.reschedule(owoRule);
      prayJob.reschedule(prayRule);
    }
  }
}) 

client.login(process.env.token);

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  return res.send('Hi World');
});

app.listen(8080);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
