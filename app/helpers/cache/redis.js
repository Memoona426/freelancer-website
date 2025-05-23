const { client } = require("../../config/redis");

const setCache = async (key, value, expireInSec = null) => {
  const stringValue = typeof value === "string" ? value : JSON.stringify(value);
  if (expireInSec) {
    await client.setEx(key, expireInSec, stringValue);
  } else {
    await client.set(key, stringValue);
  }
};


const getCache = async (key) => {
  const value = await client.get(key);
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const updateCache = async (key, newValue) => {
  await setCache(key, newValue);
};

const deleteCache = async (key) => {
  await client.del(key);
};

module.exports = {
  setCache,
  getCache,
  updateCache,
  deleteCache,
};
