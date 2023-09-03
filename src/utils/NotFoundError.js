class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 404;
    this.message = 'Ничего не найдено';
  }
}

module.exports = NotFoundError;
