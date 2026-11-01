# safejsonparse

This utility will attempt to parse json, and then run a secondary sanitizer to
detect and throw an error on encountering keys with potential prototype polluion, or invalid
value types.

## Install

```bash
npm install @opsimathically/safejsonparse
```

## Building from source

This package is intended to be run via npm, but if you'd like to build from source,
clone this repo, enter directory, and run `npm install` for dev dependencies, then run
`npm run build`.

## Usage

```typescript
import { safejsonparse } from '@opsimathically/safejsonparse;';

(async function () {
  // some json with a potentially insecure __proto__ pollution.
  const malicious_with_proto_json = `{
      "__proto__": {
        "polluted": true
      }
    }`;

  // this try/catch will throw any regular json parse error, but additionally will throw
  // if it detects constructor/prototype/__proto__ keys.
  try {
    safejsonparse(malicious_with_proto_json);
  } catch (err) {
    console.log('Detected invalid __proto__ key.');
  }
})();
```
