function schranken (flag: boolean) {
    if (flag != schranken_offen) {
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
            pins.servoWritePin(AnalogPin.P0, offen)
        } else {
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            strip.show()
            basic.pause(1000)
            pins.servoWritePin(AnalogPin.P0, zu)
        }
        schranken_offen = flag
        basic.pause(1000)
    } else {
        basic.clearScreen()
        basic.showString("" + (schranken_offen))
    }
}
let distanz = 0
let strip: neopixel.Strip = null
let schranken_offen = false
let offen = 0
let zu = 0
zu = 180
offen = 0
schranken_offen = false
pins.servoWritePin(AnalogPin.P0, zu)
let fehler = 0
strip = neopixel.create(DigitalPin.P12, 3, NeoPixelMode.RGB)
strip.clear()
strip.show()
basic.pause(500)
basic.forever(function () {
    basic.clearScreen()
    distanz = sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
    )
    basic.showNumber(distanz)
    if (distanz < 5) {
        schranken(true)
    } else {
        schranken(false)
    }
})
