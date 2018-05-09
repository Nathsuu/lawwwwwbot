const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setPresence({ game: { name: '/commande ', type: 0} });

});


bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`);

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#0000FF")
  .addField("💸", `${coinAmt} coins added!`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor(purple)
    .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });

  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  
  if (message.content === prefix + "help"){
      var help_embed = new Discord.RichEmbed()
          .setColor('#FFD69D')
          .addField("Commande de Respect des règles - ", "  -/commande : Affiche les commandes du bot !\n-**/ban Utilise: /ban <pseudo> <raison>**\n-/tempban Utilise: **/tempban <pseudo> <raison>** (SOON)\n-**/kick Utilise: /kick <pseudo> <raison>**\n-/mute @pseudo SOON * \n-/tempmute @pseudo SOON *")
          .addField("Interaction - ", "  -/ping le bot te repond pong !\n-/salut le bot te repond ça va ?")
          .addField("Information - ", "  -/discord\n-/support\n-/version\n-/language")
          .setFooter("Bot Programmé par Lawzenn")
      message.channel.sendEmbed(help_embed);
      //message.channel.sendMessage("Voici les commandes du bot :\n -/help pour afficher les commandes");
      console.log("Commande Help demandé !");
    }
  
  if (message.content === prefix + "commande"){
    var help_embed = new Discord.RichEmbed()
        .setColor('#FFD69D')
        .addField("Commande", " `/ban\n/kick\n/report\n/clear (message) (max 100)\n/serverinfo`")
        .addField("Economie", " `/coins\n/level\n/pay (nombre de coins)\n/say (message)`")
        .setFooter("Bot Programmé par Lawzenn")
    message.channel.sendEmbed(help_embed);
    //message.channel.sendMessage("Voici les commandes du bot :\n -/help pour afficher les commandes");
    console.log("Commande demandé !");
    
  }
  
if (message.content === prefix + "discord"){
    var help_embed = new Discord.RichEmbed()
        .setColor('#FFD69D')
        .addField("Discord", "https://discord.gg/jcKySm5")
        .setFooter("Bot Programmé par Lawzenn")
    message.channel.sendEmbed(help_embed);
    //message.channel.sendMessage("Voici les commandes du bot :\n -/help pour afficher les commandes");
    console.log("Commande demandé !");
    
  }
  
         
});

bot.login(process.env.BOTLAWZENN_TOKEN);
