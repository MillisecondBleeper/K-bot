const Discord = require("discord.js")

const OWNER_ID = "508632222245322793"
const ADMIN_PERMISSIONS = [
    'MANAGE_ROLES', 
    'MANAGE_CHANNELS', 
    'BAN_MEMBERS', 
    'KICK_MEMBERS',
    'MANAGE_GUILD',
    'VIEW_AUDIT_LOG',
    'MANAGE_MESSAGES',
];
const kServer_ID = "777175140647174154"
const kBot_log_channel_id = "782340321383940147"

const client = new Discord.Client()

let BasementKeys
let inBasement
client.on("ready", () => {
    console.log("beep boop fuck you i'm already alive \r michael reeves style")
    console.log("the server is ready to be overtaken")
    client.user.setActivity("with kRandom | k-help")
     
    
    client.guilds.fetch(kServer_ID).then((KGuild) => {
        BasementKeys = KGuild.roles.cache.find(BasementKeys => BasementKeys === "782340321383940147");
        inBasement = KGuild.roles.cache.find(inBasement => inBasement === "777177250789326880")
    });
})

const get_krandom_guild = client.guilds.cache.get(kServer_ID)

prefix = "k-"

client.on('message', async(message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix)) {
        const args = message.content.toLowerCase().split(' ');
        const command = args.shift().slice(prefix.length);
        if(command === "ban") {
            if(isStaff(message.member)) {
                const banned_user = message.mentions.users.first()
                message.reply(`Are you sure you want to ban this user?`).then((approve) => { 
                    approve.react(`✅`);
                    console.log(`[INF] Sent approval message`);
                    const filter = (reaction, reactor) => { return reaction.emoji.name === `✅` && reactor.id !== client.user.id };
                    let collector = approve.createReactionCollector(filter, { time: 120000 });
                    collector.on('collect', (reaction) => {
                        // reaction.name doesn't exist, problem #1
                        console.log(`User banned`);
                        const ban_embed = new Discord.MessageEmbed()
                        .setTitle(`${banned_user} has been banned`)
                        .setDescription(`Banned user id: ${banned_user.id}`)
                        client.channels.cache.get(kBot_log_channel_id).send(ban_embed)
                        setTimeout((banuser()), 10000)
                    })
                })
            }
        }
        if(command === "unban") {
            if(isStaff(message.member)) {
                
            }
        }
        if(command === "basement") {
            if(hasBasementKeys(message.member)) {
                const goToBasement = message.mentions.users.first()
                if(!goToBasement.roles.cache.has(inBasement)) {
                    goToBasement.roles.add(inBasement)
                } else {
                    goToBasement.removeRole(inBasement)
                }
            }
        }
        if(command === "givekeys") {
            if(isStaff(message.member) || hasBasementKeys(message.member)) {
                const givekeys = message.mentions.users.first()
                givekeys.roles.add(BasementKeys)
            }
        }
        if(command == "darkuss") {
            message.channel.send("Look on my works, ye Mighty, and despair!")
        }
    }
});

function isStaff(member) {
    return member.hasPermission(ADMIN_PERMISSIONS) || member.id === OWNER_ID;
}
function hasBasementKeys(member) {
    return member.roles.cache.has(BasementKeys)
}
function banuser() {
    get_krandom_guild.members.ban(banned_user)
}

client.login(process.env.token)
