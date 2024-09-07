const debugLog = (message) => {
    if (process.env.DEBUG === 'development:*') {
      console.log(message);
    }
  }


module.exports = debugLog;  