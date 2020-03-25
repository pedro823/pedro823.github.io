var x = window,
  d = document,
  e = d.documentElement,
  g = d.getElementsByTagName('body')[0],
  w = (x.innerWidth || e.clientWidth || g.clientWidth),
  h = (x.innerHeight || e.clientHeight || g.clientHeight);

var drag = .001;
var max_triangles = Math.floor(0.02 * w);
var telegrama;
var font_color;
var font_add;
var r;
var isMobile = window.mobilecheck();

function my_triangle(center_x, center_y, size, rotation) {
  noFill();
  strokeWeight(20);
  // 50% up the screen = faded
  // first point
  var fp = [center_x + cos(rotation) * size, center_y + sin(rotation) * size];
  // second point
  var sp = [center_x + cos(TWO_PI / 3 + rotation) * size, center_y + sin(TWO_PI / 3 + rotation) * size];
  // third point
  var tp = [center_x + cos(2 * TWO_PI / 3 + rotation) * size, center_y + sin(2 * TWO_PI / 3 + rotation) * size];
  // f(x) = 510/h * x - 255
  var strwgt = 510 / h * center_y - 50;
  noFill();
  strokeWeight(3);
  stroke(strwgt, strwgt, strwgt);
  line(fp[0], fp[1], sp[0], sp[1]);
  line(sp[0], sp[1], tp[0], tp[1]);
  line(tp[0], tp[1], fp[0], fp[1]);
}

function setup() {
  telegrama = loadFont("telegraw.ttf");
  font_color = isMobile * 255;
  font_add = isMobile * 255;
  s = millis() + 1000;
  draw_title = isMobile;
  finished_title = 'razgrizone';
  title = isMobile ? finished_title : '';
  index_title = 0;
  frameRate(60);
  var canvas = createCanvas(w, h);
  canvas.parent('background-triangles');
  triangles = [];
  // starts triangles
  while (triangles.length < max_triangles) {
    var center_y = isMobile ? floor(random(0, h)) : 21 * h / 20;
    triangles.push([floor(random(0, w)), // center_x
      center_y, // center_y
      floor(random(25, 50)), // size
      random(PI, 50 * PI), // rotation
      random(0, 1), // velocity of rotation
      random(0, 0.1), // acceleration of rotation
      floor(random(0, 2)), // side of rotation
      random(8, h / 30) // initial velocity
    ]);
  }
}

var draw;

if (isMobile) {
  draw = () => {
    background(0);

    for (triangle of triangles) {
      my_triangle(triangle[0], triangle[1], triangle[2], triangle[3])
    }

    if ((r = floor(random(0, 20))) == 18) {
      fill(0, font_color / 2.8, 0);
    } else if (r == 13) {
      fill(0, font_color / 1.3, 0);
    } else if (r == 2) {
      fill(font_color / 3, font_color, font_color / 3);
    } else if (r == 8) {
      fill(font_color, font_color, font_color);
    } else {
      fill(0, font_color, 0);
    }
    noStroke();
    textSize(70);
    textFont(telegrama);

    if (r == 1) {
      text(title, w / 2 - textWidth(finished_title) / 2 + random(-13, 16), h / 2 + random(-5, 5));
    } else {
      text(title, w / 2 - textWidth(finished_title) / 2, h / 2);
    }
  }
} else {
  draw = () => {
    background(0);

    // draw the triangles
    for (var i = 0; i < triangles.length; i++) {
      my_triangle(triangles[i][0], triangles[i][1], triangles[i][2], triangles[i][3]);
    }

    // make the triangles go up and twist
    for (var i = 0; i < triangles.length; i++) {
      triangles[i][1] -= triangles[i][7];
      triangles[i][7] *= 0.96;
      if (triangles[i][6]) {
        // spin right
        triangles[i][3] += triangles[i][5];
      } else {
        // spin left
        triangles[i][3] -= triangles[i][5];
      }
      // slows down spin
      triangles[i][5] *= 0.972;
      if (triangles[i][5] < pow(10, -10)) {
        triangles[i][5] = 0;
      }
    }

    // draws title
    if (draw_title) {
      if (index_title < finished_title.length) {
        title += finished_title[index_title];
        index_title += 1;
        draw_title = false;
        s = millis() + 100
      }
    } else if (millis() > s) {
      draw_title = true;
      font_add = 2;
    }
    font_color = min(font_color + font_add, 255);
    if ((r = floor(random(0, 40))) == 18) {
      fill(0, font_color / 2.8, 0);
    } else if (r == 13) {
      fill(0, font_color / 1.3, 0);
    } else if (r == 2) {
      fill(font_color / 3, font_color, font_color / 3);
    } else if (r == 8) {
      fill(font_color, font_color, font_color);
    } else {
      fill(0, font_color, 0);
    }
    noStroke();
    textSize(70);
    textFont(telegrama);
    if (r == 1) {
      text(title, w / 2 - textWidth(finished_title) / 2 + random(-13, 16), h / 2 + random(-5, 5));
    } else {
      text(title, w / 2 - textWidth(finished_title) / 2, h / 2);
    }
  }
}