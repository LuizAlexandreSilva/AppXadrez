const showError = function (errors, field) {
  var mensagem;
  if (typeof errors != 'undefined') {
    errors.forEach(function (error) {
      if (error.path == field) {
        mensagem = error.message;
        return;
      }
    });
    return mensagem;
  }
}

const equals = function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
};

module.exports = { showError, equals };