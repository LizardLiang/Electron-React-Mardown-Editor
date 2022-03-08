import process from 'process'

if (typeof global === 'undefined') {
  // global window
  window.global = window
  window.process = process
} else {
  if (typeof global.process === 'undefined') {
    window.global = window
    window.process = process
  }
}
