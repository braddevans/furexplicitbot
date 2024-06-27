const { Colors } = require('discord.js');

const Uwuifier = require('uwuifier');

// FIXME: uwuifier constructor issues
const uwuifier = new Uwuifier(config.functions.globalFuncs.uwuifier);

global.uwu = (text) => {
  // function leaves all words alone with a prefix of "ßß" That way markdown and links can be left untouched by the uwu
  const splitText = text.split(' ');
  const out = splitText.map((word) => {
    if (word.includes('ßß')) return word.replace('ßß', '');
    return uwuifier.uwuifySentence(word);
  });
  return out.join(' ');
};

global.messageFail = async (interaction, body, color, ephemeral) => client.functions.get('richEmbedMessage')
  .run(interaction, body, '', color || Colors.Red, false, ephemeral || true);

global.messageSuccess = async (interaction, body, color, ephemeral) => client.functions.get('richEmbedMessage')
  .run(interaction, body, '', color || Colors.Green, false, ephemeral || false);

// raw reply to commands
global.reply = (interaction, payload, followUp = false) => {
  if (followUp) return interaction.followUp(payload);
  // check if message needs to be edited or if its a first reply
  if (interaction.deferred || interaction.replied) return interaction.editReply(payload);
  return interaction.reply(payload);
};

global.prettyCheck = (question) => {
  if (question) return '✅';
  return '❌';
};

global.buttonHandler = (message, interaction, orgContent) => {
  // start button collector
  const filter = (i) => interaction.user.id === i.user.id || !interaction.memberPermissions.has('ManageMessages');
  const buttonCollector = message.createMessageComponentCollector({
    filter,
    time: config.commands.buttonTimeout,
  });
  buttonCollector.on('collect', async (used) => {
    buttonCollector.stop();
    if (used.customId === 'delete') return message.delete();
  });
  buttonCollector.on('end', async (collected) => {
    if (collected.size === 0) {
      message.edit({
        embeds: [orgContent],
        components: [],
      });
    }
  });
};

module.exports.data = {
  name: 'globalFunc',
};
