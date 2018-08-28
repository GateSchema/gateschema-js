[![Build Status](https://travis-ci.org/gateschema/gateschema-js.svg?branch=master)](https://travis-ci.org/gateschema/gateschema-js)  [![Coverage Status](https://coveralls.io/repos/github/gateschema/gateschema-js/badge.svg)](https://coveralls.io/github/gateschema/gateschema-js)

A small, simple and expressive [GateSchema](https://github.com/gateschema/GateSchema-Specification) implementation  

## What is GateSchema  
GateSchema specifies a list of keywords and a JSON-based format to define constraints of the data required by a given function, service or application. See [GateSchema-Specifation](https://github.com/gateschema/GateSchema-Specification) for more details.  

Ecosystem   
* Schema Creation and Serialization
  * [gateschema-js](https://github.com/gateschema/gateschema-js)   
* Data Validation  
  * [gateschema-js](https://github.com/gateschema/gateschema-js)   
* Form Generation  
  * [gateschema-form-vue](https://github.com/gateschema/gateschema-form-vue)
  * [gateschema-form-react](https://github.com/gateschema/gateschema-form-react)   
* RPC Definition
  * PartonAPI(WIP)  


## Quick Start  
```js  
import _ from 'gateschema' 
// Schema creation   
const schema = _
  .required
  .map({
    name: _
      .required
      .string
      .notEmpty,
    password: _
      .required
      .string
      .notEmpty,
    isRemember: _
      .optional
      .boolean
  })

const userInput = {
  // ....
} 

// Data Validation
// callback style
schema.validate(userInput, (err) => {
  if (err) {
    // ...
  }
  // ...
})

// or promise style 
schema
  .validate(userInput)
  .then(() => {
    // ...
  })
  .catch((err) => {
    // ...
  })


// Serialization
console.log(schema.toJSON()) // or JSON.stringify(schema)
```

## Install  
```
npm install gateschema --save  
```

## API  
see [api](docs/api.md)  

## Q&A  
### Custom messages and i18n  
see [`$msg`](docs/api.md#msg) and [`addMsgs`](docs/api.md#addmsgsmsgs-msgs-void)

### Require fields conditionally  
```js  
const schema = _
  .map({
    employed: _
      .optional
      .boolean
  })
  .switch('/employed', [
    {
      case: _
        .value(true), // if `employed` is true
      schema: _ // then the input shoud be a map containing `employee` key
        .map({
          employee: _
            .required
            .string
        })
    }
  ])
```
### One of a field is required  
```js
const schema = _
  .required
  .map({
    email: _
      .switch('/phone', [
        {
          case: _.required, // if `phone` satisfy `_.required`
          schema: _.optional // then `email` is optional
        },
        {
          case: _.any, // else 
          schema: _.required.$msg('Please input email or phone') // `email` is required
        }
      ])
      .string
      .format('email'),
    phone: _
      .switch('/email', [
        {
          case: _.required,
          schema: _.optional
        },
        {
          case: _.any,
          schema: _.required.$msg('Please input email or phone')
        }
      ])
      .string
  })
```
Another way  
```js
const schema = _
  .required
  .map({
    email: _
      .optional
      .string
      .format('email'),
    phone: _
      .optional
      .string
  })
  .oneOf([
    _.map({
      email: _.required
    }),
    _.map({
      phone: _.required
    })
  ])
  .$msg('Please input email or phone')
```

## Changelog  
See [CHANGELOG](./CHANGELOG.md)

## License  
MIT