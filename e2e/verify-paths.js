#!/usr/bin/env node

/**
 * Path Verification Script
 * This script checks if all the required files exist for the E2E tests
 */

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = resolve(__dirname, '../../..')

console.log('🔍 Verifying E2E test file paths...')
console.log(`Project root: ${projectRoot}`)

// Check feature files
const featurePaths = [
  'e2e/main/src/features/todo-creation.feature',
  'e2e/main/src/features/todo-comprehensive.feature',
]

console.log('\n📁 Feature files:')
featurePaths.forEach((path) => {
  const fullPath = resolve(projectRoot, path)
  const exists = existsSync(fullPath)
  console.log(`${exists ? '✅' : '❌'} ${path} ${exists ? '' : '(NOT FOUND)'}`)
})

// Check step definition files
const stepPaths = [
  'e2e/main/src/steps/given.js',
  'e2e/main/src/steps/when.js',
  'e2e/main/src/steps/then.js',
]

console.log('\n📝 Step definition files:')
stepPaths.forEach((path) => {
  const fullPath = resolve(projectRoot, path)
  const exists = existsSync(fullPath)
  console.log(`${exists ? '✅' : '❌'} ${path} ${exists ? '' : '(NOT FOUND)'}`)
})

// Check page object files
const pageObjectPaths = ['e2e/main/src/pageObjects/todoPage.js']

console.log('\n📄 Page object files:')
pageObjectPaths.forEach((path) => {
  const fullPath = resolve(projectRoot, path)
  const exists = existsSync(fullPath)
  console.log(`${exists ? '✅' : '❌'} ${path} ${exists ? '' : '(NOT FOUND)'}`)
})

// Check config files
const configPaths = [
  'e2e/main/config/wdio.conf.js',
  'e2e/main/config/wdio.conf.local.js',
]

console.log('\n⚙️ Configuration files:')
configPaths.forEach((path) => {
  const fullPath = resolve(projectRoot, path)
  const exists = existsSync(fullPath)
  console.log(`${exists ? '✅' : '❌'} ${path} ${exists ? '' : '(NOT FOUND)'}`)
})

// Check results directory
const resultsPaths = ['e2e/_results_', 'e2e/_results_/screenshots']

console.log('\n📊 Results directories:')
resultsPaths.forEach((path) => {
  const fullPath = resolve(projectRoot, path)
  const exists = existsSync(fullPath)
  console.log(`${exists ? '✅' : '❌'} ${path} ${exists ? '' : '(NOT FOUND)'}`)
})

console.log('\n🎯 Next steps:')
console.log('1. Start the dev server: npm run dev')
console.log('2. Run the e2e tests: npm run e2e')
console.log('3. Or run visible tests: npm run e2e:local')
