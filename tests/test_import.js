const rule = require('../lib/rules/import');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

ruleTester.run('import', rule, {
  valid: [
    {
      code: 'import React from "react"',
      parser: 'babel-eslint',
      options: [{ name: 'react-relay/classic', use: 'react-apollo' }]
    },
    'require()',
    'require(fn())',
    {
      code: 'import a from "Module"',
      parser: 'babel-eslint',
      options: ['Legacy']
    },
    {
      code: 'const a = require("Module")',
      parser: 'babel-eslint',
      options: ['Legacy']
    },
    {
      code: 'const a = require("Module")',
      parser: 'babel-eslint',
      options: ['path/to/Legacy']
    }
  ],
  invalid: [
    {
      code: 'import Relay from "react-relay/classic"',
      parser: 'babel-eslint',
      options: [{ name: 'react-relay', use: 'react-apollo' }],
      errors: [
        {
          message: 'Module react-relay is deprecated. Use react-apollo instead.'
        }
      ]
    },
    {
      code: 'import a from "Legacy"',
      parser: 'babel-eslint',
      options: ['Legacy'],
      errors: [
        {
          message: 'Module Legacy is deprecated.'
        }
      ]
    }
    {
      code: 'import a from "Legacy"',
      parser: 'babel-eslint',
      options: [{ name: 'Legacy', use: 'New' }],
      errors: [
        {
          message: 'Module Legacy is deprecated. Use New instead.'
        }
      ]
    },
    {
      code: 'import a from "Legacy"',
      parser: 'babel-eslint',
      options: [{ name: 'path/to/Legacy', use: 'New' }],
      errors: [
        {
          message: 'Module path/to/Legacy is deprecated. Use New instead.'
        }
      ]
    },
    {
      code: 'import a from "path/to/Legacy"',
      parser: 'babel-eslint',
      options: [{ name: 'path/to/Legacy', use: 'New' }],
      errors: [
        {
          message: 'Module path/to/Legacy is deprecated. Use New instead.'
        }
      ]
    },
    {
      code: 'import a from "../../Legacy"',
      parser: 'babel-eslint',
      options: [{ name: 'path/to/Legacy', use: 'New' }],
      errors: [
        {
          message: 'Module path/to/Legacy is deprecated. Use New instead.'
        }
      ]
    },
    {
      code: 'var a = require("Legacy")',
      options: ['Legacy'],
      errors: [
        {
          message: 'Module Legacy is deprecated.'
        }
      ]
    },
    {
      code: 'var a = require("Legacy")',
      options: [{ name: 'Legacy', use: 'New' }],
      errors: [
        {
          message: 'Module Legacy is deprecated. Use New instead.'
        }
      ]
    }
  ]
});
