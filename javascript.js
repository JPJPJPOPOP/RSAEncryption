//Main slideshow controller
var slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = slides.length}
  if (n < 1) {slideIndex = 1}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
} 

document.addEventListener("keydown", function(event) {
    if(event.target.tagName == "INPUT")
        return;
    
    if (event.keyCode == 37 || event.keyCode == 65) {
        plusSlides(-1);
    }
    if(event.keyCode == 39 || event.keyCode == 68) {
        plusSlides(1);
    }
})




//Public key encryption animation

var animIndex = 0;
var paused = 1;

function pause() {
    paused = 1;
}

function play() {
    if(paused == 1) {
        paused = 0;
        showAnimSlides();
    }
}

function reset() {
    animIndex = 0;
    if(paused == 1) {
        paused = 0;
        showAnimSlides();
    }
}

function showAnimSlides() {
    if(paused == 1) {
        return;
    }
    var slide = document.getElementsByClassName("animSlide");
    animIndex++;
    if (animIndex > 80) {
        animIndex = 1;
    }
    slide[0].src = "images/animation-"+ animIndex +".png";
    var waitarray = [
        [77, 10],
        [78, 10],
        [79, 20],
        [80, 40]
    ];
    var waittime = 100;
    for(var i = 0; i < waitarray.length; i++) {
        if(animIndex == waitarray[i][0]) {
            waittime *= waitarray[i][1];
            break;
        }
    }
    setTimeout(showAnimSlides, waittime);
} 



//time animation

var timeIndex = -1;
var paused2 = 1;

function pause2() {
    paused2 = 1;
}

function play2() {
    if(paused2 == 1) {
        paused2 = 0;
        showTimeSlides();
    }
}

function reset2() {
    timeIndex = -1;
    if(paused2 == 1) {
        paused2 = 0;
        showTimeSlides();
    }
}

function showTimeSlides() {
    if(paused2 == 1) {
        return;
    }
    var slide = document.getElementsByClassName("timeSlide");
    timeIndex++;
    if (timeIndex > 16) {
        timeIndex = 0;
    }
    slide[0].src = "timeimages/time"+ timeIndex +".png";

    var waittime = 1000;

    setTimeout(showTimeSlides, waittime);
} 





//full RSA animation
var fullRSAIndex = -1;
var paused3 = 1;

function pause3() {
    paused3 = 1;
}

function play3() {
    if(paused3 == 1) {
        paused3 = 0;
        showfullRSASlides();
    }
}

function reset3() {
    fullRSAIndex = -1;
    if(paused3 == 1) {
        paused3 = 0;
        showfullRSASlides();
    }
}

function showfullRSASlides() {
    if(paused3 == 1) {
        return;
    }
    var slide = document.getElementsByClassName("fullRSASlide");
    fullRSAIndex++;
    if (fullRSAIndex > 70) {
        fullRSAIndex = 0;
    }
    slide[0].src = "fullrsa/FullRSA("+ fullRSAIndex +").png";

    var waittime = 100;
    
    var waitarray = [
        [0, 10],
        [1, 5],
        [2, 5],
        [3, 5],
        [4, 20],
        [5, 20],
        [6, 20],
        [7, 5],
        [8, 5],
        [40, 15],
        [41, 15],
        [42, 20],
        [62, 8],
        [63, 8],
        [64, 8],
        [65, 5],
        [66, 5],
        [67, 5],
        [68, 35],
        [69, 35],
        [70, 35]
    ];
    
    for(var i = 0; i < waitarray.length; i++) {
        if(fullRSAIndex == waitarray[i][0]) {
            waittime *= waitarray[i][1];
            break;
        }
    }
    
    setTimeout(showfullRSASlides, waittime);
} 



//everything else
var multiply = function() {
    var p = bigInt(document.getElementById("p").value);
    var q = bigInt(document.getElementById("q").value);
    document.getElementById("bothnotprime").style.display = "none";
    document.getElementById("qnotprime").style.display = "none";
    document.getElementById("pnotprime").style.display = "none";
    if(bigInt(p).isPrime() == false && bigInt(q).isPrime() == false) {
        document.getElementById("bothnotprime").style.display = "block";
        return;
    }
    else if (bigInt(p).isPrime() == false) {
        document.getElementById("pnotprime").style.display = "block";
        return;
    }
    else if (bigInt(q).isPrime() == false) {
        document.getElementById("qnotprime").style.display = "block";
        return;
    }
    document.getElementById("modulusn").innerHTML = p.multiply(q);
    document.getElementById("phivalue").innerHTML = bigInt(p.minus(1)).multiply(bigInt(q.minus(1)));
};

var randomize = function() {
    var p,q;
    document.getElementById("bothnotprime").style.display = "none";
    document.getElementById("qnotprime").style.display = "none";
    document.getElementById("pnotprime").style.display = "none";
    while(true) {
        var potentialprime = bigInt.randBetween(bigInt(2).pow(31), bigInt(2).pow(32));
        if (potentialprime.isPrime() == true) {
            document.getElementById("p").value = potentialprime;
            break;
        }
    }
    for (var i = 0; i < 1000; i++) {
        var potentialprime = bigInt.randBetween(bigInt(2).pow(31), bigInt(2).pow(32));
        if (potentialprime.isPrime() == true) {
            document.getElementById("q").value = potentialprime;
            break;
        }
    }
    multiply();
};

var checke = function () {
    var e = bigInt(document.getElementById("e").value);
    var phi = bigInt(document.getElementById("phivalue").innerHTML);
    if (bigInt(bigInt.gcd(e,phi)).equals(bigInt(1)) == false) {
        document.getElementById("eerror").style.display = "block";
    }
    else {
        document.getElementById("eerror").style.display = "none";
        document.getElementById("dvalue").innerHTML = bigInt(e).modInv(phi);
    }
};

var encrypt = function () {
    var message = document.getElementById("message").value;
    var numbermessage = "";
    for(var i = 0; i < message.length; i++) {
        var num = message.charAt(i).charCodeAt(0);
        var stringvalue = "";
        if(num < 100) {
            stringvalue = '0' + num.toString();
        }
        else {
            stringvalue = num.toString();
        }
        numbermessage += stringvalue + ' ';
    }
    document.getElementById("numbermessage").innerHTML = numbermessage;
    
    var encryptmessage = "";
    var e = bigInt(document.getElementById("e").value);
    var n = bigInt(document.getElementById("modulusn").innerHTML);
    var splitmessage = numbermessage.split(" ");
    
    console.log(splitmessage);
    
    for(var i  = 0; i < splitmessage.length-1; i++) {
        var indiv = splitmessage[i];
        console.log(indiv);
        var encryptednum = bigInt(indiv).modPow(bigInt(e),bigInt(n)).toString();
        encryptmessage += encryptednum + ' ';
    }
    
    document.getElementById("encrypt").innerHTML = encryptmessage;
};

var decrypt = function () {
    var encryptmessage = document.getElementById("encrypt").innerHTML;
    var splitmessage = encryptmessage.split(" ");
    
    var decryptmessage = "";
    var d = bigInt(document.getElementById("dvalue").innerHTML);
    var n = bigInt(document.getElementById("modulusn").innerHTML);
    
    for(var i  = 0; i < splitmessage.length-1; i++) {
        var indiv = splitmessage[i];
        var decryptednum = bigInt(indiv).modPow(bigInt(d),bigInt(n)).toString();
        decryptmessage += decryptednum + ' ';
    }
    
    var converted = "";
    var splitmessage2 = decryptmessage.split(" ");
    for(var i = 0; i < splitmessage2.length-1; i++) {
        var indiv2 = splitmessage2[i];
        converted += String.fromCharCode(indiv2);
    }
    
    document.getElementById("decrypt").innerHTML = decryptmessage;
    document.getElementById("decryptfull").innerHTML = converted;
};

var phimodal = function() {
    var dialog = document.querySelector('#phimodal');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
};

var phimodalclose = function() {
    var dialog = document.querySelector('#phimodal');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.close();
}

var modmodal = function() {
    var dialog = document.querySelector('#modarith');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
};

var modmodalclose = function() {
    var dialog = document.querySelector('#modarith');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.close();
}

// Preload images
var images = new Array()
var images2 = new Array()
var images3 = new Array()
function preload() {
    for (var i = 1; i <= 80; i++) {
        images[i] = new Image()
        images[i].src = "images/animation-"+ i +".png";
    }
    for(var j = 0; j <= 16; j++) {
        images2[j] = new Image()
        images2[j].src = "timeimages/time"+ j +".png";
    }
    for(var k = 0; k <= 70; k++) {
        images3[k] = new Image()
        images3[k].src = "fullrsa/FullRSA("+ k +").png";
    }
}
preload();
