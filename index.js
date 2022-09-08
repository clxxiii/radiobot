const { Client, IntentsBitField } = require("discord.js");
require("dotenv").config();
const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	NoSubscriberBehavior,
} = require("@discordjs/voice");

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildVoiceStates,
	],
});

async function init() {
	client.once("ready", () => {
		console.log("Connected!");
		connectToVoice();
	});

	client.once("reconnecting", () => {
		console.log("Reconnecting...");
	});

	client.once("disconnect", () => {
		console.log("Disconnected!");
	});

	client.login(process.env.DISCORD_TOKEN || "");
}

async function connectToVoice() {
	const player = createAudioPlayer({
		behaviors: {
			noSubscriber: NoSubscriberBehavior.Pause,
		},
	});

	const channel = client.channels.cache.get(process.env.LIVE_CHANNEL || "");

	const connection = joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator: channel.guild.voiceAdapterCreator,
	});

	connection.subscribe(player);

	const radio = createAudioResource(
		"https://radio.garden/api/ara/content/listen/tNdUJygS/channel.mp3",
		{
			metadata: {
				title: "Ya",
			},
		}
	);
	player.play(radio);
}

init();
