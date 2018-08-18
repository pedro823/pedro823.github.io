'use strict'
Array.from(document.getElementsByClassName('title')).forEach(el => {
  el.addEventListener('click', function () {
    this.classList.toggle('open')
    this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block'
  })
})
