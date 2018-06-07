module.exports = ({ type, title }) => `---
title: ${title}${type === 'post' ? `
date: ${new Date()}` : ''}
---

Write something here..
`
