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
const BasementKeys = "782340321383940147"
const inBasement = "777177250789326880"


const client = new Discord.Client()

client.on("ready", () => {
    console.log("beep boop fuck you i'm already alive \r michael reeves style")
    console.log("the server is ready to be overtaken")
    client.user.setActivity("with kRandom | k-help")
})

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
                        client.channels.cache.get()
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
    message.guild.ban(banned_user)
}

client.login(process.env.token)
