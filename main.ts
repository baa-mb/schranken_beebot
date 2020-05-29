function schranken (flag: boolean) {
    if (flag != schranken_offen) {
        basic.showNumber(-1)
        if (flag) {
            strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
            strip.show()
            basic.pause(1000)
            strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
            strip.show()
            basic.pause(1000)
            strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
            strip.show()
            basic.pause(500)
            pins.servoWritePin(AnalogPin.P12, offen)
        } else {
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
            strip.show()
            basic.pause(2000)
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            strip.show()
            basic.pause(2000)
            pins.servoWritePin(AnalogPin.P12, zu)
        }
        schranken_offen = flag
    }
    basic.pause(1000)
}
let distanz = 0
let strip: neopixel.Strip = null
let schranken_offen = false
let offen = 0
let zu = 0
zu = 180
offen = 80
schranken_offen = false
pins.servoWritePin(AnalogPin.P12, zu)
let fehler = 0
strip = neopixel.create(DigitalPin.P1, 3, NeoPixelMode.RGB)
strip.clear()
strip.show()
basic.pause(500)
basic.forever(function () {
    basic.clearScreen()
    basic.pause(500)
    distanz = sonar.ping(
    DigitalPin.P2,
    DigitalPin.P8,
    PingUnit.Centimeters
    )
    basic.showNumber(distanz)
    if (distanz < 10) {
        if (distanz < 5) {
            schranken(true)
        } else {
            schranken(false)
        }
    } else {
        if (schranken_offen) {
            schranken(false)
        }
    }
})
