require("@testing-library/jest-dom");

/**
 * Polyfill pour TextEncoder et TextDecoder
 */
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

/**
 * Polyfill pour fetch
 */
global.fetch = require("node-fetch");
