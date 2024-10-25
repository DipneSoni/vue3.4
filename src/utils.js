// src/utils.js
export function formatDate(date, options = { day: 'numeric', month: 'numeric', year: 'numeric' }) {
  return new Date(date).toLocaleDateString(undefined, options)
}
