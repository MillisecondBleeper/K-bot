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

const client = new Discord.Client()

client.on("ready", () => {
    console.log("beep boop fuck you i'm already alive \r michael reeves style")
    console.log("\r \r \rthe server is ready to be overtaken")
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
                        message.guild.ban(banned_user)
                    })
                })
            }
        }
    }
});

function isStaff(member) {
    return member.hasPermission(ADMIN_PERMISSIONS) || member.id === OWNER_ID;
}
