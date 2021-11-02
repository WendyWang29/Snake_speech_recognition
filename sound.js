export function kick() {
    let cx = new AudioContext()
    let o = cx.createOscillator()
    let g = cx.createGain()
    let now = cx.currentTime
    //(frequency, start time)
    o.frequency.setValueAtTime(100, now)
    g.gain.setValueAtTime(0.5, now)
    o.frequency.exponentialRampToValueAtTime(0.001, now+0.5)
    g.gain.exponentialRampToValueAtTime(0.001, now+0.5)
    o.connect(g)
    g.connect(cx.destination)
    o.start(now)
    o.stop(now+0.5)
}

export function bump() {
    kick()
}

export function oops() {
    const audio = new Audio("./oops.wav")
    audio.play()
}