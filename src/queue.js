let queue = [];
let currentDispatcher;

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
};
