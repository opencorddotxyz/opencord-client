<p align="center">
  <a href="https://www.opencord.xyz/" >
    <img width="200" src="https://www.opencord.xyz/imgs/opencord/opencord_blue.svg">
  </a>
</p>

<p align="center">
Official Opencord Plugin SDK for JavaScript
</p>

<div align="center">

[![NPM version][image-version]][version]
[![NPM downloads][image-downloads]][downloads]
[![License][image-license]][license]

</div>

# 📦 Installation

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

The OpencordClient provides a set of methods for accessing the SDK's features.

For example, you can use the [`getCode()`](https://developers.opencord.xyz/sdk/client-methods/#async-getcode) method to retrieve the authorization code.

```typescript
const { code, message, data } = await oc.getCode();

if (code === 200) {
  console.log('✅ Get authorization code successed', data);
} else {
  console.log('❌ Get authorization code failed.', code, message);
}
```

<br />

# 📚 Documentation

See: [https://developers.opencord.xyz/](https://developers.opencord.xyz/)

[version]: https://www.npmjs.com/package/@opencord/client
[downloads]: https://npmjs.org/package/@opencord/client
[license]: https://www.npmjs.com/package/@opencord/client
[image-version]: https://img.shields.io/npm/v/@opencord/client.svg?style=flat
[image-downloads]: https://img.shields.io/npm/dw/@opencord/client.svg?style=flat
[image-license]: https://img.shields.io/npm/l/@tiptap/core.svg?style=flat
