export default class HandledError extends Error {
  constructor(msg, status = 400, errors = {}) {
    super(msg || 'error');

    this.status = status;
    this.errors = errors;
  }
}
