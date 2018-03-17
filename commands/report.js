const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const red = botconfig.red;
const green = botconfig.green;
const orange = botconfig.orange;

module.exports.run = async (bot, message, args) => {

    if(args[0] == "help"){
      message.reply("Utilise: /report <user> <raison>");
      return;
    }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Utilise: !report <user> <raison>");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor(orange)
    .addField("User Report", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported par", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Le", message.createdAt)
    .addField("Raison", rreason);

    let reportschannel = message.guild.channels.find(`name`, "plaintes");
    if(!reportschannel) return message.channel.send("Je ne vois pas le channel `plaintes`");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "report"
}
