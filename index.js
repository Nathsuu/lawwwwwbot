const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
bot.commands = new Discord.Collection();

bot.on('ready', () => {
  setInterval(function(){
    guilds =  ["99 | by Naiiden#2547", `s!help | ${bot.guilds.size} Serveurs`, "99| s!help", `s!help | ${bot.users.size} Utilisateurs`]
    lecture = Math.floor((Math.random() * guilds.length));
    bot.user.setPresence({
      game:{
        name: `${guilds[lecture]}`, 
        type: 3
      }
    });
  }, 20000);  
	
});

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

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  
  if (message.content === prefix + "help"){	    
        var help_embed = new Discord.RichEmbed()
        .setColor('c7f3ff')
	.addField("Suu", ":notepad_spiral: Voici la liste de mes commandes :")
	.addBlankField()	
        .addField(":hammer_pick: Espaces Modérations", "```s!clear \ns!ban \ns!kick \ns!mute SOON* \ns!unmute SOON* \ns!tempmute SOON * \ns!warn```", true)	
        .addField(":space_invader: Espaces Fun", "```\nDes commandes son a venir !```", true)	
        .addField("💋 Espaces Nsfw", "```s!e-girl \ns!ass \ns!boobs```", true)
	.addBlankField()	
	.addField(":frame_photo: Espaces Images", "```s!Suu```", true)	
        .addField(":clipboard: Espaces Utiles", "```s!help \ns!stats \ns!bot \ns!invite \ns!serverlist \ns!ping```", true)
        .addField(":gear: Espaces Créateurs", "```\ns!say```", true)
	.addBlankField()
	.addField(":sparkles: News", "```SOON *```", true)	
	.addBlankField()	
        .addField(":postbox: Support", "[[Support]](https://discord.gg/sRNPDjU)", true)
        .addField(":package: Invitation du Bot", "[[Invitation]](https://discordapp.com/oauth2/authorize?client_id=452873410373222401&permissions=2146958583&scope=bot)", true)
	.addBlankField()	
        .setFooter("Bot programmé par Naiiden ✔️ | Demandé par" + message.author.tag, message.author.displayAvatarURL)
	.setTimestamp() 
    message.channel.sendEmbed(help_embed)
        console.log("Commande s!help demandé !");
  }
	
  if (message.content === prefix + "SOON"){
        message.channel.send("**" + bot.guilds.array().map( g => g.name + " | " + g.id +  "| " + g.members.size ).join(" membres\n") + "**")   
  }

  if (message.content === prefix + "commande"){
    var help_embed = new Discord.RichEmbed()
        .setColor('#FFD69D')
        .addField("Commande Staff", " `/ban\n/kick\n/report\n/clear (message) (max 100)\n/serverinfo`")
        .addField("Economie", " `/coins\n/level\n/pay (nombre de coins)\n/say (message)`")
        .setFooter("Bot Programmé par Naiiden.")
    message.channel.sendEmbed(help_embed);
    //message.channel.sendMessage("Voici les commandes du bot :\n -/help pour afficher les commandes");
    console.log("Commande demandé !");
    
  }
  
if (message.content.startsWith(prefix + "stophack")) {	
	if(!message.member.hasPermission("ADMINISTRATOR")) {	
            return message.reply("Vous n'avez pas la permission ``ADMINISTRATOR`` pour faire cette commande.").catch(console.error);
        }
	message.channel.send('**:x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning:**')
        message.channel.send('**:x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning:**')  
  	message.channel.send("LE DISCORD VIENS DE SE FAIRE HACKé !", {
        tts: true
        })    		    
	message.channel.send('**__[HACKING]__** **LANCEMENT DU PROCESSEUR**')
	message.channel.send('**__[HACKING]__** **486846868486464868468464864846846846868468448468686864846864846846446665765476547657465476547657**')
	message.channel.send('**__[HACKING]__** **PIRATAGE EN COURS......**') 
	message.channel.send('**__[HACKING]__** **SUPPRESSION DES DONNEES**') 
	message.channel.send('**__[HACKING]__** **10%**')
	message.channel.send('**__[HACKING]__** **20%**')
	message.channel.send('**__[HACKING]__** **30%**')
	message.channel.send('**__[HACKING]__** **40%**')
	message.channel.send('**__[HACKING]__** **50%**')
	message.channel.send("50 % RESTANTS", {    
        tts: true
        }) 	    
	message.channel.send('**__[HACKING]__** **MODIFICATION DU DISCORD.....**')
	message.channel.send('**__[HACKING]__** **.........................**')
	message.channel.send('**__[HACKING]__** **LANCEMENT DE SUU.EXE**')
	message.channel.send('**__[HACKING]__** **60%**')
	message.channel.send('**__[HACKING]__** **70%**')
	message.channel.send('**__[HACKING]__** **80%**')
	message.channel.send('**__[HACKING]__** **90%**')
	message.channel.send('**__[HACKING]__** **100%**')
	message.channel.send('**__[HACKING]__** **LE PIRATAGE EST UN SUCCES !**')
	message.channel.send("LE DISCORD A BIEN ETE HACKé !", {
        tts: true
        })
        message.channel.send('**:x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning:**')
        message.channel.send('**:x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning: :x: :warning:**')   
        message.delete()	  
        console.log("Commande s!hack demandé !");	  	  	  

  return;
}
  
if (message.content === prefix + "discord"){
    var help_embed = new Discord.RichEmbed()
        .setColor('#FFD69D')
        .addField("Discord", "https://discord.gg/jcKySm5")
        .setFooter("Bot Programmé par Naiiden")
    message.channel.sendEmbed(help_embed);
    //message.channel.sendMessage("Voici les commandes du bot :\n -/help pour afficher les commandes");
    console.log("Commande demandé !");
 }
 
});
 
bot.login(process.env.BOTLAWZENN_TOKEN);
