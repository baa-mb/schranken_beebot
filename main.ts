let distanz = 0
let zu = 180
let offen = 0
pins.servoWritePin(AnalogPin.P0, zu)
let fehler = 0
let strip = neopixel.create(DigitalPin.P12, 3, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.Black))
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
        basic.pause(5000)
        pins.servoWritePin(AnalogPin.P0, zu)
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        basic.pause(5000)
        strip.show()
    } else {
        fehler += 1
        serial.writeValue(convertToText(control.millis()), distanz)
    }
})
