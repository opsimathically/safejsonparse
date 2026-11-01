/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import test from 'node:test';
import assert from 'node:assert';

import { safejsonparse } from '@src/safejsonparse';

(async function () {
  const json_with_undefined_type = `{
    "weird": undefined
    }`;

  const malicious_with_proto_json = `{
      "__proto__": {
        "polluted": true
      }
    }`;

  const malicious_with_constructor_json = `{
      "constructor": {
        "polluted": true
      }
    }`;

  const some_valid_json = JSON.stringify({ some: 'arbitrary', json: 'object' });

  test('Parse bad json with undefined.', async function () {
    try {
      safejsonparse(json_with_undefined_type);
    } catch (err: any) {
      return;
    }
    assert.fail(
      'Expected an exception when parsing json with undefined value.'
    );
  });

  test('Parse bad json with __proto__ pollutions.', async function () {
    try {
      safejsonparse(malicious_with_proto_json);
    } catch (err: any) {
      if (err?.message !== 'unsafe_key')
        assert.fail('Expected unsafe_key error');
      return;
    }
    assert.fail('Expected an exception.');
  });

  test('Parse bad json with constructor pollutions.', async function () {
    try {
      safejsonparse(malicious_with_constructor_json);
    } catch (err: any) {
      if (err?.message !== 'unsafe_key')
        assert.fail('Expected unsafe_key error');
      return;
    }
    assert.fail('Expected an exception.');
  });

  test('Parse valid json.', async function () {
    let result = null;
    try {
      result = safejsonparse(some_valid_json);
    } catch (err) {
      assert.fail('Expected no exception.');
    }

    if (!result) {
      assert.fail('Expected valid json object.');
      return;
    }

    if (result.some !== 'arbitrary' || result.json !== 'object')
      assert.fail('Expected valid json object.');
  });
})();
