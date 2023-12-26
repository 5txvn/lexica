$(document).ready(() => {
    $(".description").hide();
    setTimeout(() => {
        $(".description").slideDown(1000)
    }, 3500)
    setTimeout(() => {
        $(".description").text("A project by Steven.")
    }, 4750)
    setTimeout(() => {
        $(".description").text("A project by Steven..")
    }, 5000)
    setTimeout(() => {
        $(".description").text("A project by Steven...")
    }, 5250)
    const characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    l = e = x = i = c = a = 0;
    setTimeout(() => {
        const interval_l = setInterval(() => {
            l++;
            if (l == 15) {
                $(".letter-l").text("L")
                $(".letter-l").css("color", "black");
                $(".letter-l").css("font-weight", "bold");
                clearInterval(interval_l);
            } else {
                $(".letter-l").text(characters[Math.floor(Math.random() * characters.length)])
            }
        }, 25)
        const interval_e = setInterval(() => {
            e++;
            if (e == 30) {
                $(".letter-e").text("e");
                $(".letter-e").css("color", "black");
                $(".letter-e").css("font-weight", "bold");
                clearInterval(interval_e);
            } else {
                $(".letter-e").text(characters[Math.floor(Math.random() * characters.length)])
            }
        }, 25)
        //set up animation for the letter x
        const interval_x = setInterval(() => {
            x++;
            if (x == 45) {
                $(".letter-x").text("x");
                $(".letter-x").css("color", "black");
                $(".letter-x").css("font-weight", "bold");
                clearInterval(interval_x);
            } else {
                $(".letter-x").text(characters[Math.floor(Math.random() * characters.length)])
            }
        }, 25)
        //set up animation for the letter i
        const interval_i = setInterval(() => {
            i++;
            if (i == 60) {
                $(".letter-i").text("i");
                $(".letter-i").css("color", "black");
                $(".letter-i").css("font-weight", "bold");
                clearInterval(interval_i);
            } else {
                $(".letter-i").text(characters[Math.floor(Math.random() * characters.length)])
            }
        }, 25)
        //set up animation for the letter c
        const interval_c = setInterval(() => {
            c++;
            if (c == 75) {
                $(".letter-c").text("c");
                $(".letter-c").css("color", "black");
                $(".letter-c").css("font-weight", "bold");
                clearInterval(interval_c);
            } else {
                $(".letter-c").text(characters[Math.floor(Math.random() * characters.length)])
            }
        }, 25)
        //set up animation for the letter a
        const interval_a = setInterval(() => {
            a++;
            if (a == 90) {
                $(".letter-a").text("a");
                $(".letter-a").css("color", "black");
                $(".letter-a").css("font-weight", "bold");
                clearInterval(interval_a);
            } else {
                $(".letter-a").text(characters[Math.floor(Math.random() * characters.length)])
            }
        }, 25)
    }, 500)
})