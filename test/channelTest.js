import { client } from "../src/clientSetup.js";
import { Events } from "discord.js";

client.once(Events.ClientReady, (x) => {
  console.log(`${x.user.tag} is ready`);
  client.user.setActivity("동작");

  global.channel = client.channels.cache.get(process.env.CHANNEL_ID);

  console.log(channel.members);
});

// node 커맨드로 실행시켰는데 왜 index.js는 되고 얜 안 되는가?