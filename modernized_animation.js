'use strict'

let x = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    w = (x.innerWidth || e.clientWidth || g.clientWidth),
    h = (x.innerHeight || e.clientHeight || g.clientHeight)

let drag = .001
let max_triangles = 36
let telegrama
let font_color
let font_add
let triangles = []
let s
let draw_title
let title
let index_title
let finished_title = 'razgrizone'   

function my_triangle(center_x, center_y, size, rotation) {
    noFill()
    strokeWeight(20)
    // 50% up the screen = faded
    // first point
    const fp = [center_x + cos(rotation) * size, center_y + sin(rotation) * size]
    // second point
    const sp = [center_x + cos(TWO_PI / 3 + rotation) * size, center_y + sin(TWO_PI / 3 + rotation) * size]
    // third point
    const tp = [center_x + cos(2 * TWO_PI / 3 + rotation) * size, center_y + sin(2 * TWO_PI / 3 + rotation) * size]
    // f(x) = 510/h * x - 255
    const strwgt = 510 / h * center_y - 50
    noFill()
    strokeWeight(3)
    stroke(strwgt, strwgt, strwgt)
    triangle(...fp, ...sp, ...tp)
}

function setup() {
    telegrama = loadFont("telegraw.ttf")
    font_color = 0
    font_add = 0
    s = millis() + 1000
    draw_title = false
    title = ''
    finished_title = 'razgrizone'
    index_title = 0
    frameRate(60)
    const canvas = createCanvas(w, h)
    canvas.parent('background-triangles')
    triangles = []
    // starts triangles
    while (triangles.length < max_triangles) {
        const size = random(25, 50)
        const center_x = floor(random(size, max(w - size, size)))
        const center_y = floor(random(h * 1.05))
        const rotation = random(PI, 50 * PI)
        const rotation_velocity = random(0, 1)
        const rotation_side = (floor(random(0, 2)) - 0.5) * 2
        const velocity = random(8, h / 30)
        triangles.push({
            center_x,
            center_y,
            size,
            rotation,
            rotation_velocity,
            rotation_side,
            velocity,
        })
    }
}

function draw() {
    background(0)

    // draw the triangles
    triangles.map(({
        center_x,
        center_y,
        size
    }) => my_triangle(center_x, center_y, size))

    const min_acceleration = pow(10, -10)
    // make the triangles go up and twist
    triangles = triangles.map((triangle) => {
        let {
            center_x,
            center_y,
            size,
            rotation,
            rotation_side,
            rotation_velocity,
            velocity,
        } = triangle
        center_y -= velocity
        rotation += rotation_velocity * rotation_side
        rotation_velocity *= 0.972
        if (rotation_velocity < min_acceleration) {
            rotation_velocity = 0
        }
        return {
            center_x,
            center_y,
            size,
            rotation,
            rotation_side,
            rotation_velocity,
            velocity,
        }
    })
    // draws title
    if (draw_title) {
        if (index_title < finished_title.length) {
            title += finished_title[index_title]
            index_title += 1
            draw_title = false
            s = millis() + 100
        }
    } else if (millis() > s) {
        draw_title = true
        font_add = 2
    }
    font_color = min(font_color + font_add, 255)
    const r = floor(random(0, 40))
    if (r == 18) {
        fill(0, font_color / 2.8, 0, font_color)
    } else if (r == 13) {
        fill(0, font_color / 1.3, 0, font_color)
    } else if (r == 2) {
        fill(font_color / 3, font_color, font_color / 3, font_color)
    } else if (r == 8) {
        fill(font_color, font_color, font_color, font_color)
    } else {
        fill(0, font_color, 0, font_color)
    }
    noStroke()
    textSize(70)
    textFont(telegrama)
    if (r == 1) {
        text(title, w / 2 - textWidth(finished_title) / 2 + random(-13, 16), h / 2 + random(-5, 5))
    } else {
        text(title, w / 2 - textWidth(finished_title) / 2, h / 2)
    }
}