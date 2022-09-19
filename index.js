const Discord = require('discord.js');

//DISCORD CLIENT//

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "GUILD_INTEGRATIONS", "GUILD_MEMBERS","GUILD_BANS", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGES","GUILD_VOICE_STATES", "GUILD_PRESENCES"],  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE",   "REACTION"]});
        
      


client.login(process.env.TOKEN)

client.once('ready', () => {
	console.log(`Cotu i ve logged in as ${client.user.tag}`);

	client.guilds.cache.forEach(guild => {
		guild.commands.create({
			name: 'getrole',
			description: 'get one one of those roles',
		})

		guild.commands.create({
			name: 'suggest',
			description: 'suggest something',
			options: [
				{
					name: 'suggestion',
					description: 'Provide a suggestion',
					type: 'STRING',
					required: true
				}
			]
		})

		guild.commands.create({
			name: 'userinfo',
			description: 'Get user info of the mentioned',
			options: [
				{
					name: 'user',
					description: 'Mention a user to get his info',
					type: 'USER',
					required: true
				}
			]
		})
	})
})
client.on('interactionCreate', inte => {
	
	const ita = inte.guild.roles.cache.get('1020746357188866151')
	const annR = inte.guild.roles.cache.get('1020779073586344030')
	const devR = inte.guild.roles.cache.get('1020779185762992128')
	const emb1 = new Discord.MessageEmbed()
		.setDescription(`✅   **Added role <@&1020746357188866151>**`)
	  .setColor('GREEN')
	const emb2 = new Discord.MessageEmbed()
		.setDescription(`✅   **Added role <@&1020779073586344030>**`)
	  .setColor('GREEN')
	const emb3 = new Discord.MessageEmbed()
		.setDescription(`✅   **Added role <@&1020779185762992128>**`)
	  .setColor('GREEN')
	const bigemb = new Discord.MessageEmbed()
		.setColor('#303136')
	  .setDescription('🧑‍🔧 Pls, choose a role between those:\n\n<@&1020746357188866151>, <@&1020779073586344030>, <@&1020779185762992128>')
	const but1 = new Discord.MessageButton()
		.setLabel('Italian')
	  .setStyle('SUCCESS')
	  .setCustomId('but1')

	const but2 = new Discord.MessageButton()
		.setLabel('Development ping')
	  .setStyle('PRIMARY')
	  .setCustomId('but2')

	const but3 = new Discord.MessageButton()
		.setLabel('Announcement ping')
	  .setStyle('DANGER')
	  .setCustomId('but3')


	const row = new Discord.MessageActionRow()
		.addComponents(
			but1,
			but2,
			but3
		)



	
	if(!inte.isCommand) return

	if(inte.commandName === 'getrole'){
	
   inte.reply({embeds: [bigemb], ephemeral: true, components: [row]})

		client.on('interactionCreate', inter => {
			if(!inter.isButton) return
			if(inter.customId === 'but1'){
				inter.reply({embeds: [emb1], ephemeral: true})
				inter.member.roles.add(ita)
			} else if(inter.customId === 'but2'){
				inter.reply({embeds: [emb3], ephemeral: true})
				inter.member.roles.add(devR)
			} else if(inter.customId === 'but3'){
				inter.reply({embeds: [emb2], ephemeral: true})
				inter.member.roles.add(annR)
			}
		})
	} else if(inte.commandName === 'suggest'){
		const chan1 = inte.guild.channels.cache.get('1020641683764949012')
		const chan2 = inte.guild.channels.cache.get('1020607884301697074')
		const sugg = inte.options.getString('suggestion')
		const log = new Discord.MessageEmbed()
			.setColor('#303136')
			.setTitle('Suggestions log')
			.setDescription('**A suggestion has been sent**')
			.addFields(
				{
					name: `Suggested by - ${inte.user.tag}`,
					value: `${sugg}`
				}
			)
			.setTimestamp()
			.setThumbnail(inte.user.avatarURL({dynamic: true}))
		
		const string = new Discord.MessageEmbed()
			.setColor('#303136')
			.setTitle(`Suggested by - ${inte.user.tag}`)
			.setDescription(sugg)
			.setTimestamp()
			.setThumbnail(inte.user.avatarURL({dynamic: true}))

		chan1.send({embeds: [string]})
		chan2.send({embeds: [log]})
		inte.reply({content: '**✔️  Suggestion sent**', ephemeral: true})
	} else if(inte.commandName === 'userinfo'){
		const member = inte.options.getMember('user')
		const emb = new Discord.MessageEmbed()
			.setTitle(`${member.user.tag} - info`)
			.setColor('#303136')
			.addFields(
				{
					name: 'Member Tag:',
					value: `${member.user.tag}` ,
					inline: true,
				},
				{
					name: 'Member Id:',
					value: `${member.user.id}`,
					inline: false,
				},
				{
					name: 'Joined At:',
					value:  `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`,
					inline: false,
				},
				{
					name: 'Roles:',
					value: `${member.roles.cache.map(role => role).join('  ')}`
				}
				
			)
		.setThumbnail(member.displayAvatarURL({dynamic: true, size: 1024}))

		inte.reply({embeds: [emb]})
	}

})

client.on('message', message => {
  if (message.channel.id === '1020641683764949012') {
      message.react('🔼')
          .then(() => { 
              message.react('🔽')
          });
  }
});