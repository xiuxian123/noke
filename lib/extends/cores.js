exports.isArray = isArray;
exports.getObjectType = getObjectType;

function getObjectType(value) {
  return Object.prototype.toString.call(value).match(/^\[object\s(.*)\]$/)[1]
}

function isArray(value) {
  return getObjectType(value) == 'Array';
}

