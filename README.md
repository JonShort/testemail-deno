# Testemail - 🦕 Deno edition

![CI Tests](https://github.com/JonShort/testemail-deno/workflows/CI%20Tests/badge.svg)

Provide an email, receive a version aliased with UTC epoch time

e.g.
```
example@example.com > example+1589713579655@example.com
```

## Usage

_With prompt_

```bash
deno run ./testemail.ts
```

_With email as arg_

```bash
deno run ./testemail.ts "example@example.com"
```

## Running unit tests

_Run entire test suite_

```bash
deno test --allow-run --allow-write=./tests --allow-read=./tests ./tests
```
