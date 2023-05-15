const socket = io()
const active = document.querySelector('.js-active')
const buzzList = document.querySelector('.js-buzzes')
const clear = document.querySelector('.js-clear')
const audio = new Audio('./buzzer.mp3'); // Replace 'path/to/sound.mp3' with the actual path to your sound file

socket.on('active', (numberActive) => {
  active.innerText = `${numberActive} joined`
})

socket.on('buzzes', (buzzesMap) => {
 const buzzes = Array.from(buzzesMap, ([ _key, values ]) => values);
  buzzList.innerHTML = buzzes
    .map(
      ({
        latence,
        user: { name, team }
      }) => `<li>${name} on Team ${team} ${latence ? `(+${latence}ms)` : ''}</li>`)
    .join('')
  
  audio.play();
})

clear.addEventListener('click', () => {
  socket.emit('clear')
})
