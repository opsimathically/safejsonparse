/* eslint-disable @typescript-eslint/no-explicit-any */
// valid types
type safe_json_val_t =
  | string
  | number
  | boolean
  | null
  | safe_json_val_t[]
  | { [key: string]: safe_json_val_t };

// dangerous keys for prototype pollutions
const dangerous_keys = ['__proto__', 'constructor', 'prototype'];

// recursively santize json object after parse
function sanitize(input: any, depth = 0, max_depth = 20): safe_json_val_t {
  if (depth > max_depth) throw new Error('too_deeply_nested');

  if (Array.isArray(input)) {
    return input.map((item) => sanitize(item, depth + 1, max_depth));
  } else if (input !== null && typeof input === 'object') {
    const output: { [key: string]: safe_json_val_t } = {};
    for (const key of Object.keys(input)) {
      if (dangerous_keys.includes(key)) {
        throw new Error('unsafe_key');
      }

      const value = input[key];
      output[key] = sanitize(value, depth + 1, max_depth);
    }
    return output;
  } else if (
    typeof input === 'string' ||
    typeof input === 'number' ||
    typeof input === 'boolean' ||
    input === null
  ) {
    return input;
  } else {
    throw new Error('invalid_value_type');
  }
}

// attempt to parse json string and sanitize it
function safejsonparse(json_string: string, max_depth = 20): any | null {
  const parsed = JSON.parse(json_string);
  return sanitize(parsed, 0, max_depth);
}

export { safejsonparse, safe_json_val_t };
