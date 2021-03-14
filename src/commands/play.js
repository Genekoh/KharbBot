const Youtube = require("../apis/youtube.js");
const ffmpeg = require("ffmpeg-static");

module.exports = {
  name: "play",
  description: "Play audio from any youtube link",
  errorMessage: {
    noArgs: "You haven't entered a youtube link",
    invalidArg: "The link you entered was invalid",
    notInVC: "You have to be in a voice channel before running this command",
  },
  async run(message, args) {
    if (!message.member.voice.channel)
      return message.channel.send(this.errorMessage.notInVC);

    const url = Array.isArray(args) ? args[0] : args;

    const videoTitle = await Youtube.getTitle(url);
    const connection = await message.member.voice.channel.join();

    const dispatcher = connection.play(url, { volume: 0.5 });

    console.log(dispatcher.on);
    dispatcher.on("start", () => {
      message.channel.send(`Playing ${videoTitle}`);
    });

    dispatcher.on("end", () => {
      message.channel.send("Video ended");
    });
  //   const connection = await message.member.voice.channel.join();
  //   const dispatcher = connection.play(
  //     "https://www.youtube.com/watch?v=O2S-Vm-fNrw"
  //   );
  //
  //   dispatcher.on("start", () => {
  //     console.log("audio.mp3 is now playing!");
  //   });
  //
  //   dispatcher.on("finish", () => {
  //     console.log("audio.mp3 has finished playing!");
  //   });
  //
  //   dispatcher.on("error", console.error);
  // },
};
