const fs = require('fs');

function getKeysFromOptions(options) {
  const { settings, _locals, ...objectKeys} = options;
  return Object.keys(objectKeys);
}

function getRenderedContent(content, options) {
  const keys = getKeysFromOptions(options);
  let contentString = content.toString();

  for(let key of keys) {
    contentString = contentString.replace(
      new RegExp(`\{${key}\}`, 'gi'),
      options[key]
    );
  }

  return contentString;
}
function expressJsx (filepath, options, callback) {
  fs.readFile(filepath, function (err, content) {
    if (err) {
      callback(err);
    }
    const rendered = getRenderedContent(content, options)
    console.log(rendered);
    return callback(null, rendered)
  });
}

module.exports = expressJsx;
