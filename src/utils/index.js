module.exports = {
  createOptionHandler(name, options) {
    if (typeof options === "undefined") {
      throw new Error(`The options of ${name} is required`);
    }

    return {
      optional(name, defaultValue) {
        const value = options[name];

        return typeof value === "undefined" ? defaultValue : value;
      },

      required(name) {
        const value = options[name];

        if (typeof value === "undefined") {
          throw new Error(`The option ${name} is required`);
        }
        return value;
      },
    };
  },
};
