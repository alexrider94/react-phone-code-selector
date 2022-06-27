# react-phone-selector

![NPM License](https://img.shields.io/npm/l/react-phone-selector)
![npm package](https://img.shields.io/npm/v/react-phone-selector)

## About

this library provides React components to display phone country selector.

You can pick the country with coutry number included and put your phone number with it.

Note that the dataset can also be imported individually.

## Installation

Using npm or yarn:

```javascript
npm i react-phone-selector
yarn add react-hpone-selector
```

<a name="features"></a>

## Usage

It's very easy to use

```javascript
import React, { useState } from 'react';
import { PhoneSelector } from 'react-phone-selector';

type Props = {};

const CustomPhoneSelector = () => {
  const [phone, setPhone] = useState < string > '';

  return (
    <PhoneSelector
      width={300}
      defaultValue={phone}
      onChange={(value) => {
        setPhone(value);
      }}
    />
  );
};
```
