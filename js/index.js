//**-----------variables------------------------**//
//---------------audio vars--------------//
var ad0 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var ad1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var ad2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var ad3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
//---------normal vars-------------------//
var on = false,
    str = false,
    cnt = 0,
    ucnt = 0,
    won = false;
var onc = "#ff6666",
    ofc = "#660000";
var rd = $("#rt1"),
    gr = $("#lt1"),
    bl = $("#rt2"),
    yl = $("#lt2");
var pt = [[0, gr, ad0], [1, rd, ad1], [2, bl, ad2], [3, yl, ad3]];
var ptc = true,
    ptca = [],
    uptca = [],
    done = false,
    uactive = false;var time, time1, time2, time3;
var pdisable = false,
    pdstr = false,
    absdis = true; //repeat
//**-----------variables end----------------**//

//*****-----------functions----------------*****//
function initerror() {
  console.log("errinti");
  var context = new (window.AudioContext || window.webkitAudioContext)();
  var oscillator = context.createOscillator();
  var gain = context.createGain();
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.frequency.value = 110;
  oscillator.type = 'triangle';
  var now = context.currentTime;
  gain.gain.setValueAtTime(0.5, now);
  oscillator.start();
  oscillator.stop(now + 1);
}

//-------------------disable fn-------------//
function disable() {
  if (absdis === true) {
    cnt = 0;ptca = [];won = false;pdisable = false;pdstr = false;
    str = false;
    clearTimeout(time);
    clearTimeout(time1);
    clearTimeout(time2);
    clearTimeout(time3);
  } else if (pdisable === false) {
    cnt = 0;ptca = [];
  }
  done = false;ucnt = 0;uptca = [];
  $("#s-cnt").css("color", ofc);
  $("#s-cnt").html("--");
  ptc = true;uactive = false;
  for (var i = 0; i < 4; i++) {
    dark(pt[i][1]);
  }
}
//-------------------enable fn-------------//
function enable() {
  $("#s-cnt").css("color", onc);
  if (won === true) $('#s-cnt').html("<span style='color:cyan;'>&#9786;</span>");else if (pdisable === false && pdstr === false) $("#s-cnt").html("--");else if (pdisable === true || pdstr === true || uactive === false && ptc === false) $("#s-cnt").html("<span style='color:#80ffff;'>&#9760;</span>");
}
//---------------jquery ready fn--------------------//
$(document).ready(function () {
  //-----------on-off click--------------//
  $('#onf-i').on('click', function () {
    if (on === false) {
      absdis = false;
      $(this).css("float", "right");
      on = true;
      $("#s-cnt").css("color", onc);
    } else {
      absdis = true;
      $(this).css("float", "left");
      $("#s-cnt").css("color", ofc);
      $("#s-cnt").html("--");
      on = false;
      disable();
      str = false;
      $('#s-str-i').css("background-color", ofc);
    }
  });
  //------------strict click-------------//
  $('#s-str').on("click", function () {
    if (on === true) {
      if (str === false) {
        str = true;
        $('#s-str-i').css("background-color", onc);
      } else {
        str = false;
        $('#s-str-i').css("background-color", ofc);
      }
    }
  });
  //--------------start click--------------//
  $("#s-st").on("click", function () {
    absdis = true;disable();enable();
    if (on === true) start();
  });
  //-----------end of start click----------------------// 
  //**-------user pattern capture clicks--------------**//
  $('#lt1').on("click", function () {
    if (on === true && ptc === false) {
      uprocess(pt[0]);
      uactive = true;
    }
  });
  $('#rt1').on("click", function () {
    if (on === true && ptc === false) {
      uprocess(pt[1]);
      uactive = true;
    }
  });
  $('#rt2').on("click", function () {
    if (on === true && ptc === false) {
      uprocess(pt[2]);
      uactive = true;
    }
  });
  $('#lt2').on("click", function () {
    if (on === true && ptc === false) {
      uprocess(pt[3]);
      uactive = true;
    }
  });
  /* $('#lt1').on("mousedown",function(){    
     if(on===true&&ptc===false){
     pt[0][2].play();
     light(pt[0][1]); 
     uprocess(pt[0]);
     uactive=true;   
     }
   });
   */
  //**-------end of user pattern capture clicks---------**// 
});
//**-----------------jquery ready fn end-------------**//

//------------randomize fn------------------//
function randomize() {
  var k = Math.floor(Math.random() * 4);
  ptca.push(k);
  path();
}
function path() {
  ptc = true;uactive = false;absdis = false;
  var i = 0;
  (function runpath() {
    time = setTimeout(function () {
      for (var j = 0; j < 4; j++) {
        console.log("path..." + pt[j][0] + "---" + ptca[i] + ".." + ptca);
        if (ptca[i] === pt[j][0]) {
          light(pt[j][1]);sound(pt[j]);
          s_check(pt[j][2], pt[j][1]);
        }
      } //for
      i++;
      if (i < ptca.length) runpath();else {
        ptc = false;
      } //only release lock when count reached
    }, 600); //timeout     
  })(); //runpath
}
//------------light fn------------------//
function light(n) {
  n.css("opacity", 1);
}
function dark(n) {
  n.css("opacity", 0.6);
}
function sound(n) {
  for (var i = 0; i < 4; i++) {
    if (n[0] === pt[i][0]) pt[i][2].play();
  }
}
//------------sound end check fn------------------//
function s_check(aud, n) {
  aud.addEventListener("ended", function () {
    aud.currentTime = 0;
    dark(n);
  });
}

//------------check fn------------------//
function check() {
  (function change(n) {
    time1 = setTimeout(function () {
      if (done === true) {
        if (cnt < 20) {
          cnt++;ucnt = 0;done = false;ptc = true;
          cnt < 10 ? $("#s-cnt").html("0" + cnt) : $("#s-cnt").html("" + cnt);
          randomize();
        } else {
          disable();
          won = true;
          repeat();
        }
      }
    }, 1500);
  })(0);
}
//------------start fn------------------//
function start() {
  disable();enable(); //a stray press
  if (on === true) {
    //250d 500e 750d 1000e e
    var t = 250;
    //------self calling function for blinking -----/
    (function blink(n) {
      time2 = setTimeout(function () {
        if (n < 4) {
          n % 2 === 0 ? disable() : enable();
          n++;if (n === 4) t = 1000;
          blink(n); //call recursively only after n++!
        } else {
          cnt++;
          cnt < 10 ? $("#s-cnt").html("0" + cnt) : $("#s-cnt").html("" + cnt);
          randomize();
          // ptc = false;                            
        }
      }, t);
    })(0);
    //--------end of blink fn---------------//
  }
}
//------------user pattern process fn------------------//
function uprocess(n) {
  pdisable = false;pdstr = false;won = false;console.log("uprocess");
  if (on === true && ptc === false && ucnt <= cnt) {
    console.log("uprocess");
    light(n[1]);
    if (ptca[ucnt++] === n[0]) {
      sound(n);
      s_check(n[2], n[1]);
      uptca.push(n[0]);
      if (ucnt === cnt) {
        done = true;check();
      }
    } else {
      initerror();
      ptc = true; //process false
      repeat();
    } //outer else
  } //main if
}

function repeat() {
  if (on === true) {
    //250d 500e 750d 1000e e
    var t = 250,
        temp = cnt;
    //------self calling function for blinking -----/
    (function blinky(n) {
      time3 = setTimeout(function () {
        if (n < 6) {
          if (str === false) pdisable = true;else pdstr = true;console.log("err: " + ptca);
          n % 2 === 0 ? disable() : enable();
          console.log("err: " + ptca);
          n++;if (n === 6) t = 1000;
          blinky(n); //call recursively only after n++!
        } else {
          if (str === true || won === true) {
            cnt = 0;
            cnt++;
            cnt < 10 ? $("#s-cnt").html("0" + cnt) : $("#s-cnt").html("" + cnt);
            randomize();
          } else {
            cnt = temp;
            cnt < 10 ? $("#s-cnt").html("0" + cnt) : $("#s-cnt").html("" + cnt);
            path();
          }
        } //outer else         
      }, t);
    })(0);
    //--------end of blink fn---------------//
  }
}