# radiobot
A discord bot for sitting in a discord channel and playing a radio station 24/7.
## Setup Process
1. Clone the repository
2. `cd` into the directory, and run `npm install`
3. Add a `.env` file containing the following properties:
```env
DISCORD_TOKEN="" // The token of the discord bot user
LIVE_CHANNEL="" // The channel the bot should join
RADIO_CHANNEL_LINK="" // The api link the bot should listen to
```
4. Run `npx pm2 start index.js --name radiobot`
