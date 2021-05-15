let queue = [];
let currentDispatcher = null;
let playing = false;
const prefix = ".";

module.exports = {
    setQueue(q) {
        queue = q;
    },
    getQueue() {
        return queue;
    },
    getNextInQueue() {
        return queue[0];
    },
    removeNextInQueue() {
        queue.shift();
    },
    addToQueue(stream) {
        queue.push(stream);
    },
    setDispatcher(d) {
        currentDispatcher = d;
    },
    getDispatcher() {
        return currentDispatcher;
    },
    isPlaying() {
        return playing;
    },
    setPlaying(bool) {
        playing = bool;
    },
    getPrefix() {
        return p;
    },
    setPrefix(p) {
        prefix = p;
    },
};
