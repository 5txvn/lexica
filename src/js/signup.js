toastr.options.showMethod = 'slideDown';
$(function() {
    //socketio stuff
    const socket = io();
    socket.on("username_fail", () => {
        toastr.error('Username already in user, please choose a different username!', "Uername Error");
    })
    //loading in animations
    $(".title").hide();
    $(".username").hide();
    $(".email").hide();
    $(".name").hide();
    $(".password").hide();
    $(".submit").hide();
    $(".title").slideDown(500);
    setTimeout(() => {$(".username").slideDown(500)}, 500)
    setTimeout(() => {$(".email").slideDown(500)}, 1000)
    setTimeout(() => {$(".name").slideDown(500)}, 1500)
    setTimeout(() => {$(".password").slideDown(500)}, 2000)
    setTimeout(() => {$(".submit").slideDown(500)}, 2500)
})