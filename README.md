<p>
  <a href="https://www.opencord.xyz/">
    <img width="200" src="https://www.opencord.xyz/imgs/opencord/opencord_blue.svg">
  </a>
</p>

<br />

[![NPM version][image-version]][version]
[![NPM downloads][image-downloads]][downloads]
[![License][image-license]][license]

<br />

# Introduction

### The SDK is open-source and maintained by the Opencord community, offering rich documentation and sample code to help developers quickly get started and understand its core functionality. Using the SDK, developers can create various types of plugins.<br /><br />

# 📚 Documentation

Documentation can be found on the [opencord website](https://developers.opencord.xyz/).

<br />

# 📦 Install

```bash
$ npm install --save @opencord/client
# or
$ yarn add @opencord/client
```

<br />

# ⚙️ Initialization

```typescript
import { getClient } from '@opencord/client';

const oc = getClient();
```

<br />

# 💡 Usage

## The `OpencordClient` provides a set of methods for accessing the SDK's features.

<br />

## [`async getCode()`](https://developers.opencord.xyz/sdk/client-methods)

```typescript
const { code, message, data } = await oc.getCode();

if (code === 200) {
  console.log('✅ Get authorization code successed', data);
} else {
  console.log('❌ Get authorization code failed.', code, message);
}
```

[version]: https://www.npmjs.com/package/@opencord/client
[downloads]: https://npmjs.org/package/@opencord/client
[license]: https://www.npmjs.com/package/@opencord/client
[image-version]: https://img.shields.io/npm/v/@opencord/client.svg?style=flat
[image-downloads]: https://img.shields.io/npm/dw/@opencord/client.svg?style=flat
[image-license]: https://img.shields.io/npm/l/@tiptap/core.svg?style=flat
