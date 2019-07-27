export const formatingMixin = {
  filters: {
    reverse(value) {
      return value.split("").reverse().join("");
    }
  }
};
