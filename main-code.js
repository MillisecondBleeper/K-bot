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
const BAN_PRM = [
    'BAN_MEMBERS'
]
const KICK_PRM = [
    'KICK_MEMBERS'
]
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
        if (command === "ban") {
            const banned_user = message.mentions.members.first();
            if (canBan(message.member) && banned_user !== undefined) {
                var e = message.content.split(' ', 3);
                const reason = (e.size === 3)?e[2]:'';
                const confirm_embed = new Discord.MessageEmbed()
                    .setColor('#1F8B4C')
                    .setTitle(`Are you sure you want to ban this user?`)
                    .setDescription(`User:  **${getName(banned_user.user)}**\nId:  **${banned_user.id}**`);
                message.reply(confirm_embed).then((approve) => { 
                    approve.react(`✅`).then( () => approve.react(`❌`) );
                    console.log(`[INFO ${new Date()}] Sent approval message`);
                    const filter = (reaction, reactor) => { return (reaction.emoji.name === `✅` || reaction.emoji.name === `❌`)&& reactor.id === message.member.id };
                    let collector = approve.createReactionCollector(filter, { max: 1, time: 120000 });
                    collector.on('collect', (reaction) => {
                        if (reaction.emoji.name === `✅`) {
                            console.log(`[INFO ${new Date()}] User banned`);
                            const ban_embed = new Discord.MessageEmbed()
                                .setColor('#1F8B4C')
                                .setTitle(`User **${getName(banned_user.user)}** was banned`)
                                .setTimestamp()
                                .setDescription(`Banned User Id: **${banned_user.id}**`)
                                .addFields(
                                    { name: 'Reason', value: "" + reason, inline: true },
                                    { name: 'Moderator', value: getName(message.member.user), inline: true }
                                );
                            client.channels.cache.get(kBot_log_channel_id).send(ban_embed);
                            banned_user.ban().catch((e) => { console.log(`[WARNING ${new Date()}] Ban failed for user ${getName(message.member.user)}`) });

                            const accept_embed = new Discord.MessageEmbed()
                                .setColor('#1F8B4C')
                                .setTitle(`✅ *User **${getName(banned_user.user)}** was banned*`);
                            approve.edit(accept_embed);
                        }
                        else {
                            const deny_embed = new Discord.MessageEmbed()
                                .setColor('#1F8B4C')
                                .setTitle(`❌ *User **${getName(banned_user.user)}** was not banned*`);
                            approve.edit(deny_embed);
                        }
                        approve.reactions.removeAll().catch((e) => (0));
                    });
                    collector.on('end', (collected) => {
                        if(collected.size == 0) {
                            const timeout_embed = new Discord.MessageEmbed()
                                .setColor('#1F8B4C')
                                .setTitle(`❌ *Request to ban user **${getName(banned_user.user)}** timed out*`);
                            approve.edit(deny_embed);
                        }
                    });
                });
            }
        }
        if(command === "unban") {
            if(canBan(message.member)) {
                const unban_id = args[0];
                if (unban_id) {
                    message.guild.members.unban(unban_id);
                }
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
            const muted_user = message.mentions.user.first()
            if (muted_user) {
                muted_user.roles.add(shutup);
            }
        }
    }
});

function isMod(member) {
    return member.hasPermission(MODERATOR_PRM) || member.id === OWNER_ID;
}
function canBan(member) {
    return member.hasPermission(BAN_PRM) || member.id === OWNER_ID;
}
function canKick(member) {
    return member.hasPermission(KICK_PRM) || member.id === OWNER_ID;
}
function hasBasementKeys(member) {
    return member.roles.cache.has(BasementKeys);
}
function getName(user) {
    return `@${user.username}#${user.discriminator}`;
}

// huge thanks to IGunner222#9497 for contributing to this bot!
client.login(process.env.token)
