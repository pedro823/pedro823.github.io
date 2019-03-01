'use strict'
Array.from(document.getElementsByClassName('title')).forEach(el => {
  el.addEventListener('click', function () {
    this.classList.toggle('open')
    let sibling = this.nextElementSibling
    while (sibling) {
      sibling.style.display = sibling.style.display === 'block' ? 'none' : 'block'
      sibling = sibling.nextElementSibling
    }
  })
})