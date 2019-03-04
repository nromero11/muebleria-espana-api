function _sendResponse(out, status, response) {

  console.log('\n--------------------------------------');
  console.log('ApiResponse:');
  console.log({
    status,
    response
  });
  console.log('--------------------------------------\n');

  out.json({
    status,
    response
  });
}

module.exports = {

  ok(out, message) {
    _sendResponse(out, 'OK', {
      data: message
    });
  },

  error(out, message) {
    _sendResponse(out, 'ERR', {
      errmsg: message
    });
  },

  missingParam(out, parameter) {
    _sendResponse(out, 'ERR', {
      errmsg: `Missing parameter: ${parameter}`
    });
  }
};
