const {
  EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,
} = require('discord.js');

const IBconfig = config.engine.inkbunny;

const buttons = new ActionRowBuilder()
  .addComponents([
    new ButtonBuilder()
      .setCustomId('delete')
      .setEmoji('✖️')
      .setLabel('Delete')
      .setStyle(ButtonStyle.Danger),
  ]);

function prepareMessage(submission, orgMessage, poolData) {
  const embed = new EmbedBuilder()
    .setColor(orgMessage.embeds[0].color)
    .setTitle(`${submission.title}`)
    .setURL(`https://inkbunny.net/s/${submission.submission_id}`)
    .setAuthor({ name: `Artist: ${submission.username}`, url: `https://inkbunny.net/${submission.username}` })
    .addFields([
      { name: 'Type', value: `${submission.type_name}`, inline: true },
      { name: 'Rating', value: `:regional_indicator_${submission.rating_name.toLowerCase().slice(0, 1)}:`, inline: true },
      { name: 'ID', value: `${submission.submission_id}`, inline: true },
      { name: 'Full picture link', value: submission.file_url_full },
    ])
    .setImage(submission.file_url_full)
    .setFooter({ text: 'Picture from inkbunny.net', iconURL: IBconfig.logo });
  return embed;
}

module.exports.run = async (interaction, orgMessage, submission) => {
  // const poolData = await requestPool(submission.pools[0], interaction.channel.nsfw);
  const poolData = null;
  const embed = prepareMessage(submission, orgMessage, poolData);
  const message = await orgMessage.edit({ embeds: [embed], components: [buttons], fetchReply: true });
  buttonHandler(message, interaction, embed);
};

module.exports.data = { subcommand: true };
