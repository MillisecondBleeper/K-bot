const Discord = require("discord.js");

const OWNER_ID = "508632222245322793";
const ADMIN_PRM = [
    'MANAGE_ROLES', 
    'MANAGE_CHANNELS', 
    'BAN_MEMBERS', 
    'KICK_MEMBERS',
    'MANAGE_GUILD',
    'VIEW_AUDIT_LOG',
    'MANAGE_MESSAGES'
];
const MODERATOR_PRM = [
    'KICK_MEMBERS',
    'VIEW_AUDIT_LOG',
    'MANAGE_MESSAGES'
];
const kServer_ID = "777175140647174154";
const kBot_log_channel_id = "782340321383940147";

const client = new Discord.Client();

let BasementKeys;
let inBasement;
let shutup;
client.on("ready", () => {
    console.log("beep boop fuck you i'm already alive \r\n michael reeves style");
    console.log("the server is ready to be overtaken");
    client.user.setActivity("with kRandom | k-help");
     
    
    client.guilds.fetch(kServer_ID).then((KGuild) => {
        BasementKeys = KGuild.roles.cache.find(BasementKeys => BasementKeys === "782340321383940147");
        inBasement = KGuild.roles.cache.find(inBasement => inBasement === "777177250789326880");
        shutup = KGuild.roles.cache.find(shutup => shutup === "782456562953879592");
    });
})

const get_krandom_guild = client.guilds.cache.get(kServer_ID);

prefix = "k-";

client.on('message', async(message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix)) {
        const args = message.content.toLowerCase().split(' ');
        const command = args.shift().slice(prefix.length);
        if(command === "ban") {
            const banned_user = message.mentions.members.first();
            if(isMod(message.member) && banned_user !== undefined) {
                message.reply(`Are you sure you want to ban this user?`).then((approve) => { 
                    approve.react(`✅`).then( () => approve.react(`❌`) );
                    console.log(`[INF] Sent approval message`);
                    const filter = (reaction, reactor) => { return (reaction.emoji.name === `✅` || reaction.emoji.name === `❌`)&& reactor.id === member.id };
                    let collector = approve.createReactionCollector(filter, { max: 1, time: 120000 });
                    collector.on('collect', (reaction) => {
                        if(reaction.emoji.name === `✅`) {
                            console.log(`[INFO ${new Date()}] User banned`);
                            const ban_embed = new Discord.MessageEmbed()
                                .setTitle(`${banned_user} has been banned`)
                                .setDescription(`Banned user id: ${banned_user.id}`);
                            client.channels.cache.get(kBot_log_channel_id).send(ban_embed);
                            banned_user.ban();
                        }
                    });
                    collector.on('end', (collected) => {
                        if(collected.size == 0) {
                            
                        }
                    });
                });
            }
        }
        if(command === "unban") {
            if(isMod(message.member)) {
                const unban_id = args[0];
                message.guild.members.unban(unban_id);
            }
        }
        if(command === "basement") {
            if(hasBasementKeys(message.member)) {
                const goToBasement = message.mentions.members.first();
                if(!goToBasement.roles.cache.has(inBasement)) {
                    goToBasement.roles.add(inBasement);
                } else {
                    goToBasement.removeRole(inBasement);
                }
            }
        }
        if(command === "givekeys") {
            if(isStaff(message.member) || hasBasementKeys(message.member)) {
                message.mentions.members.first().roles.add(BasementKeys);
            }
        }
        if(command == "darkuss") {
            message.channel.send("Look on my works, ye Mighty, and despair!");
        }
        if(command === "mute") {
            message.mentions.user.first().roles.add(shutup);
        }
    }
});

function isMod(member) {
    return member.hasPermission(MODERATOR_PRM) || member.id === OWNER_ID;
}
function hasBasementKeys(member) {
    return member.roles.cache.has(BasementKeys);
}

<<<<<<< HEAD
// huge thanks to IGunner222#9497 for contributing to this bot!
client.login(process.env.token)
=======

client.login(process.env.token);
>>>>>>> fc7b0d694b4a48463c0aab03f4cb1ef9874b0031
