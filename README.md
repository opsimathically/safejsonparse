# asyncsleep

While javascript does not actually provide "sleep" capabilities such as those found in C, there are times, such
as during debugging or unit testing, where waiting for an arbitrary timeout/doing nothing, could be useful. These
utility functions simply allow you to wait for a promise that resolves a after a timeout, effectively creating
a simulated sleep period.

## Install

```bash
npm install @opsimathically/asyncsleep
```

## Building from source

This package is intended to be run via npm, but if you'd like to build from source,
clone this repo, enter directory, and run `npm install` for dev dependencies, then run
`npm run build`.

## Usage

```typescript
import {
  asyncSleepMs,
  asyncSleepSec,
  asyncSleepMin,
  asyncSleepHour,
  asyncSleepDay,
  asyncSleepApproxMonth,
  asyncSleepApproxYear
} from '@opsimathically/asyncsleep;';

(async function () {
  // All of these will sleep for approximately 1 second each.  Running all of these will elapse
  // about 7 seconds of wait time total.
  await asyncSleepMs(1000);
  await asyncSleepSec(1);
  await asyncSleepMin(1 / 60);
  await asyncSleepHour(1 / 60 / 60);
  await asyncSleepDay(1 / 60 / 60 / 24);
  await asyncSleepApproxMonth(1 / 60 / 60 / 24 / 30);
  await asyncSleepApproxYear(1 / 60 / 60 / 24 / 30 / 365);
})();
```
