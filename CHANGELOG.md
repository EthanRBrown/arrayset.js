# v1.0.14

- Switched from yarn to pnpm
- Switched from jest to vitest
- Switched to emitting ESM modules (note that prior to this, exports were broken altogether! not sure when or where this happened).

# v1.0.13

- Added improved generic types (courtesy @pc-erin)

# v1.0.12

- Converted source files to TypeScript, added minimal typing

# v1.0.11

- Switches to `tsc` for build output; now TypeScript declaration files are emitted
- Tests now include source code and built output

# v1.0.10

- Adds `fromArray` method to create arrayset instance from JavaScript array (removing duplicates). Thanks to @alspdx for the work!
- Update to dependencies to pass `yarn audit`

# v1.0.9

Erroneous release that was intended to included the `fromArray` method, but I botched the merge & didn't end up
pushing the changes as intended.

# Older Versions

Added this file as part of v1.0.9 release...older release history is undocumented.
