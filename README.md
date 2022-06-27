# react-phone-code-selector

![NPM License](https://img.shields.io/npm/l/react-phone-code-selector)
![npm package](https://img.shields.io/npm/v/react-phone-code-selector)

## About

this library provides React components to display phone country selector.

You can pick the country with country number included and put your phone number with it.

Plus, the dataset can also be imported individually.

## Installation

Using npm or yarn:

```javascript
npm i react-phone-code-selector
yarn add react-phone-code-selector
```

## Usage

It's very easy to use like below code.

```typescript
import React, { useState } from 'react';
import { PhoneCodeSelector } from 'react-phone-code-selector';

type Props = {};

const CustomPhoneCodeSelector = () => {
  const [phone, setPhone] = useState<string>('');

  return (
    <PhoneCodeSelector
      width={300}
      defaultValue={phone}
      onChange={(value) => {
        setPhone(value);
      }}
    />
  );
};
```
