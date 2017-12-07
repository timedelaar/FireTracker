import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Grid, Row, Col } from "react-flexbox-grid";
import room from "./arch_wr.png";
import onfire from "./onfire.png";
import Sensors from "./Sensors";
import * as Konva from 'konva';
import $ from "jquery";
import TextField from "material-ui/TextField";
import { grey900, amber900 } from "material-ui/styles/colors";
import PF from "pathfinding";

const host = "192.168.0.15";

const styles = {
  errorStyle: {
    color: grey900
  },
  underlineStyle: {
    borderColor: amber900
  },
  floatingLabelStyle: {
    color: grey900
  },
  floatingLabelFocusStyle: {
    color: grey900
  }
};

var data_floor = [
  [0, 0, true],
  [0, 1, true],
  [0, 2, true],
  [0, 3, true],
  [0, 4, true],
  [0, 5, true],
  [0, 6, true],
  [0, 7, true],
  [0, 8, true],
  [0, 9, true],
  [0, 10, true],
  [0, 11, true],
  [0, 12, true],
  [0, 13, true],
  [0, 14, true],
  [0, 15, true],
  [0, 16, true],
  [0, 17, true],
  [0, 18, true],
  [0, 19, true],
  [0, 20, true],
  [0, 21, true],
  [0, 22, true],
  [0, 23, true],
  [0, 24, true],
  [1, 0, true],
  [1, 1, false],
  [1, 2, false],
  [1, 3, false],
  [1, 4, false],
  [1, 5, false],
  [1, 6, false],
  [1, 7, true],
  [1, 8, false],
  [1, 9, false],
  [1, 10, true],
  [1, 11, false],
  [1, 12, false],
  [1, 13, false],
  [1, 14, true],
  [1, 15, false],
  [1, 16, false],
  [1, 17, false],
  [1, 18, false],
  [1, 19, true],
  [1, 20, false],
  [1, 21, false],
  [1, 22, false],
  [1, 23, false],
  [1, 24, true],
  [2, 0, false],
  [2, 1, false],
  [2, 2, false],
  [2, 3, false],
  [2, 4, false],
  [2, 5, false],
  [2, 6, false],
  [2, 7, false],
  [2, 8, false],
  [2, 9, false],
  [2, 10, true],
  [2, 11, false],
  [2, 12, false],
  [2, 13, false],
  [2, 14, true],
  [2, 15, false],
  [2, 16, false],
  [2, 17, false],
  [2, 18, false],
  [2, 19, true],
  [2, 20, false],
  [2, 21, false],
  [2, 22, false],
  [2, 23, false],
  [2, 24, true],
  [3, 0, true],
  [3, 1, false],
  [3, 2, false],
  [3, 3, false],
  [3, 4, false],
  [3, 5, false],
  [3, 6, false],
  [3, 7, true],
  [3, 8, false],
  [3, 9, false],
  [3, 10, true],
  [3, 11, false],
  [3, 12, false],
  [3, 13, false],
  [3, 14, true],
  [3, 15, false],
  [3, 16, false],
  [3, 17, false],
  [3, 18, false],
  [3, 19, true],
  [3, 20, false],
  [3, 21, false],
  [3, 22, false],
  [3, 23, false],
  [3, 24, true],
  [4, 0, true],
  [4, 1, false],
  [4, 2, false],
  [4, 3, false],
  [4, 4, false],
  [4, 5, false],
  [4, 6, false],
  [4, 7, true],
  [4, 8, true],
  [4, 9, false],
  [4, 10, true],
  [4, 11, false],
  [4, 12, false],
  [4, 13, false],
  [4, 14, true],
  [4, 15, false],
  [4, 16, false],
  [4, 17, false],
  [4, 18, false],
  [4, 19, true],
  [4, 20, false],
  [4, 21, false],
  [4, 22, false],
  [4, 23, false],
  [4, 24, true],
  [5, 0, true],
  [5, 1, false],
  [5, 2, false],
  [5, 3, false],
  [5, 4, false],
  [5, 5, false],
  [5, 6, false],
  [5, 7, false],
  [5, 8, true],
  [5, 9, false],
  [5, 10, true],
  [5, 11, false],
  [5, 12, false],
  [5, 13, false],
  [5, 14, true],
  [5, 15, false],
  [5, 16, false],
  [5, 17, false],
  [5, 18, false],
  [5, 19, true],
  [5, 20, false],
  [5, 21, false],
  [5, 22, false],
  [5, 23, false],
  [5, 24, true],
  [6, 0, true],
  [6, 1, false],
  [6, 2, false],
  [6, 3, false],
  [6, 4, false],
  [6, 5, false],
  [6, 6, false],
  [6, 7, false],
  [6, 8, true],
  [6, 9, true],
  [6, 10, true],
  [6, 11, true],
  [6, 12, true],
  [6, 13, false],
  [6, 14, true],
  [6, 15, true],
  [6, 16, true],
  [6, 17, true],
  [6, 18, false],
  [6, 19, true],
  [6, 20, true],
  [6, 21, true],
  [6, 22, true],
  [6, 23, false],
  [6, 24, true],
  [7, 0, true],
  [7, 1, false],
  [7, 2, false],
  [7, 3, false],
  [7, 4, false],
  [7, 5, false],
  [7, 6, false],
  [7, 7, false],
  [7, 8, false],
  [7, 9, false],
  [7, 10, false],
  [7, 11, false],
  [7, 12, false],
  [7, 13, false],
  [7, 14, false],
  [7, 15, false],
  [7, 16, false],
  [7, 17, false],
  [7, 18, false],
  [7, 19, false],
  [7, 20, false],
  [7, 21, false],
  [7, 22, false],
  [7, 23, false],
  [7, 24, true],
  [8, 0, true],
  [8, 1, true],
  [8, 2, true],
  [8, 3, true],
  [8, 4, true],
  [8, 5, true],
  [8, 6, false],
  [8, 7, false],
  [8, 8, false],
  [8, 9, false],
  [8, 10, false],
  [8, 11, false],
  [8, 12, false],
  [8, 13, false],
  [8, 14, false],
  [8, 15, false],
  [8, 16, false],
  [8, 17, false],
  [8, 18, false],
  [8, 19, false],
  [8, 20, false],
  [8, 21, false],
  [8, 22, false],
  [8, 23, false],
  [8, 24, true],
  [9, 0, true],
  [9, 1, false],
  [9, 2, false],
  [9, 3, false],
  [9, 4, false],
  [9, 5, true],
  [9, 6, false],
  [9, 7, false],
  [9, 8, false],
  [9, 9, false],
  [9, 10, false],
  [9, 11, false],
  [9, 12, false],
  [9, 13, false],
  [9, 14, false],
  [9, 15, false],
  [9, 16, false],
  [9, 17, false],
  [9, 18, false],
  [9, 19, false],
  [9, 20, false],
  [9, 21, false],
  [9, 22, false],
  [9, 23, false],
  [9, 24, true],
  [10, 0, true],
  [10, 1, false],
  [10, 2, false],
  [10, 3, false],
  [10, 4, false],
  [10, 5, true],
  [10, 6, false],
  [10, 7, false],
  [10, 8, false],
  [10, 9, false],
  [10, 10, false],
  [10, 11, false],
  [10, 12, false],
  [10, 13, false],
  [10, 14, false],
  [10, 15, false],
  [10, 16, false],
  [10, 17, false],
  [10, 18, false],
  [10, 19, false],
  [10, 20, false],
  [10, 21, false],
  [10, 22, false],
  [10, 23, false],
  [10, 24, true],
  [11, 0, true],
  [11, 1, false],
  [11, 2, false],
  [11, 3, false],
  [11, 4, false],
  [11, 5, false],
  [11, 6, false],
  [11, 7, false],
  [11, 8, false],
  [11, 9, false],
  [11, 10, true],
  [11, 11, true],
  [11, 12, true],
  [11, 13, true],
  [11, 14, true],
  [11, 15, true],
  [11, 16, true],
  [11, 17, true],
  [11, 18, true],
  [11, 19, true],
  [11, 20, false],
  [11, 21, true],
  [11, 22, true],
  [11, 23, true],
  [11, 24, true],
  [12, 0, true],
  [12, 1, false],
  [12, 2, false],
  [12, 3, false],
  [12, 4, false],
  [12, 5, true],
  [12, 6, false],
  [12, 7, false],
  [12, 8, false],
  [12, 9, false],
  [12, 10, true],
  [12, 11, false],
  [12, 12, false],
  [12, 13, false],
  [12, 14, false],
  [12, 15, false],
  [12, 16, false],
  [12, 17, false],
  [12, 18, false],
  [12, 19, false],
  [12, 20, false],
  [12, 21, false],
  [12, 22, false],
  [12, 23, false],
  [12, 24, false],
  [13, 0, true],
  [13, 1, true],
  [13, 2, true],
  [13, 3, true],
  [13, 4, true],
  [13, 5, true],
  [13, 6, false],
  [13, 7, false],
  [13, 8, false],
  [13, 9, false],
  [13, 10, true],
  [13, 11, false],
  [13, 12, false],
  [13, 13, false],
  [13, 14, false],
  [13, 15, false],
  [13, 16, false],
  [13, 17, false],
  [13, 18, false],
  [13, 19, false],
  [13, 20, false],
  [13, 21, false],
  [13, 22, false],
  [13, 23, false],
  [13, 24, false],
  [14, 0, true],
  [14, 1, false],
  [14, 2, false],
  [14, 3, false],
  [14, 4, false],
  [14, 5, true],
  [14, 6, false],
  [14, 7, false],
  [14, 8, false],
  [14, 9, false],
  [14, 10, true],
  [14, 11, false],
  [14, 12, false],
  [14, 13, false],
  [14, 14, false],
  [14, 15, false],
  [14, 16, false],
  [14, 17, false],
  [14, 18, false],
  [14, 19, false],
  [14, 20, false],
  [14, 21, false],
  [14, 22, false],
  [14, 23, false],
  [14, 24, false],
  [15, 0, true],
  [15, 1, false],
  [15, 2, false],
  [15, 3, false],
  [15, 4, false],
  [15, 5, true],
  [15, 6, false],
  [15, 7, false],
  [15, 8, false],
  [15, 9, false],
  [15, 10, true],
  [15, 11, false],
  [15, 12, false],
  [15, 13, false],
  [15, 14, false],
  [15, 15, false],
  [15, 16, false],
  [15, 17, false],
  [15, 18, false],
  [15, 19, false],
  [15, 20, false],
  [15, 21, false],
  [15, 22, false],
  [15, 23, false],
  [15, 24, false],
  [16, 0, true],
  [16, 1, false],
  [16, 2, false],
  [16, 3, false],
  [16, 4, false],
  [16, 5, false],
  [16, 6, false],
  [16, 7, false],
  [16, 8, false],
  [16, 9, false],
  [16, 10, true],
  [16, 11, false],
  [16, 12, false],
  [16, 13, false],
  [16, 14, false],
  [16, 15, false],
  [16, 16, false],
  [16, 17, false],
  [16, 18, false],
  [16, 19, false],
  [16, 20, false],
  [16, 21, false],
  [16, 22, false],
  [16, 23, false],
  [16, 24, false],
  [17, 0, true],
  [17, 1, false],
  [17, 2, false],
  [17, 3, false],
  [17, 4, false],
  [17, 5, true],
  [17, 6, false],
  [17, 7, false],
  [17, 8, false],
  [17, 9, false],
  [17, 10, true],
  [17, 11, false],
  [17, 12, false],
  [17, 13, false],
  [17, 14, false],
  [17, 15, false],
  [17, 16, false],
  [17, 17, false],
  [17, 18, false],
  [17, 19, false],
  [17, 20, false],
  [17, 21, false],
  [17, 22, false],
  [17, 23, false],
  [17, 24, false],
  [18, 0, true],
  [18, 1, true],
  [18, 2, true],
  [18, 3, true],
  [18, 4, true],
  [18, 5, true],
  [18, 6, false],
  [18, 7, false],
  [18, 8, false],
  [18, 9, false],
  [18, 10, true],
  [18, 11, false],
  [18, 12, false],
  [18, 13, false],
  [18, 14, false],
  [18, 15, false],
  [18, 16, false],
  [18, 17, false],
  [18, 18, false],
  [18, 19, false],
  [18, 20, false],
  [18, 21, false],
  [18, 22, false],
  [18, 23, false],
  [18, 24, false],
  [19, 0, true],
  [19, 1, false],
  [19, 2, false],
  [19, 3, false],
  [19, 4, false],
  [19, 5, true],
  [19, 6, false],
  [19, 7, false],
  [19, 8, false],
  [19, 9, false],
  [19, 10, true],
  [19, 11, false],
  [19, 12, false],
  [19, 13, false],
  [19, 14, false],
  [19, 15, false],
  [19, 16, false],
  [19, 17, false],
  [19, 18, false],
  [19, 19, false],
  [19, 20, false],
  [19, 21, false],
  [19, 22, false],
  [19, 23, false],
  [19, 24, false],
  [20, 0, true],
  [20, 1, false],
  [20, 2, false],
  [20, 3, false],
  [20, 4, false],
  [20, 5, true],
  [20, 6, false],
  [20, 7, false],
  [20, 8, false],
  [20, 9, false],
  [20, 10, true],
  [20, 11, false],
  [20, 12, false],
  [20, 13, false],
  [20, 14, false],
  [20, 15, false],
  [20, 16, false],
  [20, 17, false],
  [20, 18, false],
  [20, 19, false],
  [20, 20, false],
  [20, 21, false],
  [20, 22, false],
  [20, 23, false],
  [20, 24, false],
  [21, 0, true],
  [21, 1, false],
  [21, 2, false],
  [21, 3, false],
  [21, 4, false],
  [21, 5, true],
  [21, 6, false],
  [21, 7, false],
  [21, 8, false],
  [21, 9, false],
  [21, 10, false],
  [21, 11, false],
  [21, 12, false],
  [21, 13, false],
  [21, 14, false],
  [21, 15, false],
  [21, 16, false],
  [21, 17, false],
  [21, 18, false],
  [21, 19, false],
  [21, 20, false],
  [21, 21, false],
  [21, 22, false],
  [21, 23, false],
  [21, 24, false],
  [22, 0, true],
  [22, 1, false],
  [22, 2, false],
  [22, 3, false],
  [22, 4, false],
  [22, 5, false],
  [22, 6, false],
  [22, 7, false],
  [22, 8, false],
  [22, 9, false],
  [22, 10, true],
  [22, 11, false],
  [22, 12, false],
  [22, 13, false],
  [22, 14, false],
  [22, 15, false],
  [22, 16, false],
  [22, 17, false],
  [22, 18, false],
  [22, 19, false],
  [22, 20, false],
  [22, 21, false],
  [22, 22, false],
  [22, 23, false],
  [22, 24, false],
  [23, 0, true],
  [23, 1, false],
  [23, 2, false],
  [23, 3, false],
  [23, 4, false],
  [23, 5, true],
  [23, 6, false],
  [23, 7, false],
  [23, 8, false],
  [23, 9, false],
  [23, 10, true],
  [23, 11, false],
  [23, 12, false],
  [23, 13, false],
  [23, 14, false],
  [23, 15, false],
  [23, 16, false],
  [23, 17, false],
  [23, 18, false],
  [23, 19, false],
  [23, 20, false],
  [23, 21, false],
  [23, 22, false],
  [23, 23, false],
  [23, 24, false],
  [24, 0, true],
  [24, 1, true],
  [24, 2, true],
  [24, 3, true],
  [24, 4, true],
  [24, 5, true],
  [24, 6, true],
  [24, 7, true],
  [24, 8, true],
  [24, 9, true],
  [24, 10, true],
  [24, 11, false],
  [24, 12, false],
  [24, 13, false],
  [24, 14, false],
  [24, 15, false],
  [24, 16, false],
  [24, 17, false],
  [24, 18, false],
  [24, 19, false],
  [24, 20, false],
  [24, 21, false],
  [24, 22, false],
  [24, 23, false],
  [24, 24, false]
];



var layer = null;
var stage = null;

var grid = []
var ft_box = []
var mouse_down = false;

function crate_box(i, j) {
  var sqrt = {
    active: false,
    x: i,
    y: j,
    rect: new Konva.Rect({
      width: 40,
      height: 40,
      x: 40 * i,
      y: 40 * j,
      fill: 'yellow',
      stroke: 'yellow',
      strokeWidth: '1'
    }),
    cnt_temperature: 0,
    cnt_smoke: 0,
    cnt_people: 0
  }

  sqrt.rect.on('mouseenter', function () {
    $('#sensor1').val(sqrt.cnt_temp);
    $('#sensor2').val(sqrt.cnt_smoke);
    $('#sensor3').val(sqrt.cnt_people);
    $('#coordinates').val('x:' + sqrt.x + '  y:' + sqrt.y);
  })

  sqrt.rect.on('mouseout', function () {
    $('#sensor1').val('NaN');
    $('#sensor2').val('NaN');
    $('#sensor3').val('NaN');
  })

  layer.add(sqrt.rect);
  grid[i][j] = sqrt;
}

function crate_sqrt(i, j) {
  var sqrt = {
    active: false,
    x: i,
    y: j,
    rect: new Konva.Rect({
      width: 40,
      height: 40,
      x: 40 * i,
      y: 40 * j,
      fill: 'white',
      stroke: 'grey',
      strokeWidth: '1'
    })
  }

  sqrt.rect.on('mousedown', function () {
    mouse_down = true
    if (sqrt.active) {
      sqrt.active = !sqrt.active;
      sqrt.rect.setFill('white');
    } else if (!sqrt.active) {
      sqrt.active = !sqrt.active;
      sqrt.rect.setFill('darkgrey');
    }
    layer.draw();
  });

  sqrt.rect.on('mouseup', function () {
    mouse_down = false
  });

  sqrt.rect.on('mouseenter', function () {
    if (mouse_down && sqrt.active) {
      sqrt.active = !sqrt.active;
      sqrt.rect.setFill('white');
    } else if (mouse_down && !sqrt.active) {
      sqrt.active = !sqrt.active;
      sqrt.rect.setFill('darkgrey');
    }
    $('#coordinates').val('x:' + sqrt.x + '  y:' + sqrt.y);
    layer.draw();
  });
  layer.add(sqrt.rect);
  grid[i][j] = sqrt;
}

function create_grid(x, y) {
  var boxe_size = x / 40;

  for (var i = 0; i < boxe_size; i++) {
    grid[i] = [];
    for (var j = 0; j < boxe_size; j++) {
      crate_sqrt(i, j)
    }
  }


  boxes_position.forEach(element => {
    crate_box(element[0], element[1])
  });


  layer.draw();
  console.log(grid);
}

function save_plane() {
  let csvContent = "data:text/txt;charset=utf-8,";
  grid.forEach(function (rowArray) {
    rowArray.forEach(function (column) {
      let row = "[" + [column.x, column.y, column.active].join(",") + "]";
      csvContent += row + "\r\n"; // add carriage return
    });
  });

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data.txt");
  document.body.appendChild(link); // Required for FF

  link.click(); // This will download the data file named "my_data.csv".
}

function load_sample_floor() {
  data_floor.forEach(element => {
    var sqrt = grid[element[0]][element[1]];
    var active = sqrt.active = element[2];
    if (active) {
      sqrt.rect.setFill('darkgrey');
    }
  });
}

var boxes_position = [
  [3, 3], [2, 5], [3, 12], [3, 16], [3, 21],
  [9, 5], [9, 12], [9, 16], [9, 21],
  [11, 2], [15, 2], [21, 2],
  [11, 7], [15, 7], [21, 7]
];

var interval = null;

function GetInfo() {
  getInformation();
  interval = setInterval(getInformation, 10000);
}

function getInformation() {
  get_data(1, 1)
}

function setBoxLed(box, led, value) {
  fetch("http://" + host + ":7579/Mobius/Firetracker/Gwanggaeto_gwan/F1/" + box + "/" + led,
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SOrigin",
        "Content-Type": "application/vnd.onem2m-res+json; ty=4"
      },
      body: "{ \"m2m:cin\": { \"con\": \"" + value + "\" } }"
    });
}

function get_data(n, type) {

  var sensor_type = 'na'
  switch (type) {
    case 1:
      var sensor_type = 'cnt_temp';
      break;
    case 2:
      var sensor_type = 'cnt_smoke';
      break;
    case 3:
      var sensor_type = 'cnt_people';
      break;
  }

  fetch(
    "http://" + host + ":7579/Mobius/Firetracker/Gwanggaeto_gwan/F1/ML_box_" + n + "/" + sensor_type + "/latest",
    {
      method: "GET",
      headers: {
        "X-M2M-RI": "12345",
        "X-M2M-Origin": "SOrigin",
        Accept: "application/json"
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .then(responseJson => {
      console.log(responseJson)
      if (responseJson["m2m:cin"]) {
        var box = grid[boxes_position[n - 1][0]][boxes_position[n - 1][1]]
        box[sensor_type] = responseJson["m2m:cin"].con
        if (parseFloat(responseJson["m2m:cin"].con) < 5 && type == 2) {
          box.rect.setFill("red");
          box.active = true;

          setBoxLed("ML_box_" + n, "cnt_led_red", 1);
          setBoxLed("ML_box_" + n, "cnt_led_green", 0);
          for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
              box = grid[boxes_position[n - 1][0] + i - 2][boxes_position[n - 1][1] + j - 2]
              if (box.active == false) {
                box.rect.setFill("pink");
              }
              box.active = true;
            }
          }

          layer.draw();
          calculate_paths();

        } else {
          if (!box.active){
            box.rect.setFill("lightgreen");
            setBoxLed("ML_box_" + n, "cnt_led_green", 1);
            setBoxLed("ML_box_" + n, "cnt_led_red", 0);
          }
        }
      }

      //We do not need to sense human presense yet
      if (type < 3) {
        if ((n + 1) > 15) {
          get_data(1, type + 1)
        } else {
          get_data(n + 1, type)
        }
      } else {
      }
    })
    .catch(error => {
      console.error("Error in informationservice", error);
    });
}

function set_exit(x, y) {
  var sqrt = grid[x][y];
  sqrt.active = false;
  sqrt.rect.setFill('lightgreen');
}


const div_style = {
  position: 'fixed',
  top: '40%',
  right: '0',
  width: '30%'
}

var sel = null;

//Find path in case of fire, work on fire trigger
function calculate_paths() {
  var grid_path = new PF.Grid(25, 25);

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      if (grid[i][j].active == true) {
        console.log(grid[i][j]);
        grid_path.setWalkableAt(grid[i][j].x, grid[i][j].y, false);
      }
    }
  }

  var finder = new PF.AStarFinder({
    allowDiagonal: true
  });

  var paths_ends = getEnds()[0];
  var paths_starts = getEnds()[1];

  for (var i = 0; i < paths_starts.length; i++) {
    var selected_path = data_floor;
    var grid_back = grid_path.clone();
    for (var j = 0; j < paths_ends.length; j++) {
      var path = finder.findPath(paths_starts[i][0], paths_starts[i][1], paths_ends[j][0], paths_ends[j][1], grid_back);
      if (path.length < selected_path.length) {
        selected_path = path;
      }
      var grid_back = grid_path.clone();
    }

    if (selected_path.length == 0) {
      var box_trapped = grid[paths_starts[i][0]][paths_starts[i][1]]

      var complexText = new Konva.Text({
        x: parseInt(box_trapped.x * 40),
        y: parseInt(box_trapped.y * 40),
        text: 'P',
        fontSize: 25,
        fontFamily: 'Calibri',
        fill: '#fff',
        width: 40,
        height: 40,
        padding: 0,
        align: 'center'
      });

      layer.add(complexText);

      if (box_trapped.active == false) {
        box_trapped.rect.setFill("yellow");
      }
    }

    var final_array = [];
    selected_path.forEach(element1 => {
      element1.forEach(element2 => {
        final_array.push((element2 * 40) + 20);
      });
    });

    var blueLine = new Konva.Line({
      points: final_array,
      stroke: 'blue',
      strokeWidth: 5,
      lineCap: 'round',
      lineJoin: 'round',
      /*
       * line segments with a length of 29px with a gap
       * of 20px followed by a line segment of 0.001px (a dot)
       * followed by a gap of 20px
       */
      dash: [29, 20, 0.001, 20]
    });

    layer.add(blueLine);
    layer.draw();

    console.log(selected_path)
  }
}

function getEnds() {
  var ends = [
    [2, 0],
    [21, 14],
    [16, 20]
  ]

  var starts = boxes_position;
  return [ends, starts]
}


class Demo extends Component {

  componentDidMount() {
    sel = this;
    var $this = $(ReactDOM.findDOMNode(this));
    stage = new Konva.Stage({
      container: 'container-js',
      width: 1000,
      height: 1000
    });

    layer = new Konva.Layer();
    stage.add(layer);

    create_grid(1000, 1000);
    load_sample_floor();

    set_exit(2, 0);
    set_exit(21, 14);
    set_exit(16, 20);
    GetInfo();
  }

  render() {
    return (
      <div>
        <Grid fluid>
          <br />
          <br />
          <br />
          <Row>
            <div style={div_style}>
              <Col xs={3}>
                <Row>
                  <TextField
                    id="sensor1"
                    label="Temperature Sensor"
                    hintText="Placeholder for value"
                    errorText="Temperature Sensor"
                    errorStyle={styles.errorStyle}
                    value="NaN"
                    onChange={event =>
                      this.setState({ sensor1: event.target.value })
                    }
                    margin="normal"
                  />
                  <br />
                  <br />
                  <br />
                </Row>
                <Row>
                  <TextField
                    id="sensor2"
                    label="Smoke Sensor"
                    hintText="Placeholder for value"
                    errorText="Smoke Sensor"
                    errorStyle={styles.errorStyle}
                    value="NaN"
                    onChange={event =>
                      this.setState({ smoke: event.target.value })
                    }
                    margin="normal"
                  />

                  <br />
                  <br />
                  <br />
                </Row>
                <Row>
                  <TextField
                    id="sensor3"
                    label="Infrared Sensor"
                    hintText="Placeholder for value"
                    errorText="Infrared Sensor"
                    errorStyle={styles.errorStyle}
                    value="NaN"
                    onChange={event =>
                      this.setState({ people: event.target.value })
                    }
                    margin="normal"
                  />
                  <br />
                  <br />
                  <br />
                </Row>
                <Row>
                  <TextField
                    id="coordinates"
                    label="Coordinates"
                    hintText="Placeholder for value"
                    errorText="Coordinates"
                    errorStyle={styles.errorStyle}
                    value="NaN"
                    onChange={event =>
                      this.setState({ people: event.target.value })
                    }
                    margin="normal"
                  />
                  <br />
                  <br />
                  <br />
                </Row>
              </Col>
            </div>
            <Col xs={7}>
              <div width={1000} height={1000} id="container-js"></div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Demo;