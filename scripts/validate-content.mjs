import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { content } from '../src/data/content.js'

function assertSameShape(left, right, path = 'content') {
  assert.equal(Array.isArray(left), Array.isArray(right), `${path}: array mismatch`)
  if (Array.isArray(left)) {
    assert.equal(left.length, right.length, `${path}: array length mismatch`)
    left.forEach((value, index) => assertSameShape(value, right[index], `${path}[${index}]`))
    return
  }
  if (left && typeof left === 'object') {
    assert.deepEqual(Object.keys(left).sort(), Object.keys(right).sort(), `${path}: keys mismatch`)
    Object.keys(left).forEach(key => assertSameShape(left[key], right[key], `${path}.${key}`))
    return
  }
  assert.equal(typeof left, typeof right, `${path}: value type mismatch`)
  if (typeof left === 'string') {
    assert.ok(left.trim().length > 0, `${path}: empty Russian translation`)
    assert.ok(right.trim().length > 0, `${path}: empty English translation`)
  }
}

assertSameShape(content.ru, content.en)

for (const language of ['ru', 'en']) {
  const value = content[language]
  assert.equal(value.common.nav.length, 4, `${language}: navigation must contain four links`)
  assert.equal(value.projects.items.length, 2, `${language}: two project cards expected`)
  assert.equal(value.experience.layers.length, 4, `${language}: four architecture layers expected`)
  assert.equal(value.home.stacks.length, 4, `${language}: four skill groups expected`)
}

const jsxFiles = [
  'src/components/layout/Layout.jsx',
  'src/pages/HomePage.jsx',
  'src/pages/ProjectsPage.jsx',
  'src/pages/ExperiencePage.jsx',
  'src/pages/ContactPage.jsx',
]
for (const file of jsxFiles) {
  const source = await readFile(file, 'utf8')
  assert.ok(!/[А-Яа-яЁё]/.test(source), `${file}: hard-coded Cyrillic text bypasses translations`)
}

console.log('Translation and content validation passed.')
