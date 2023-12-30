toastr.options.showMethod = 'slideDown';
$(function() {
    if (window.location.search == "?1") {
        toastr.warning("Password needs to be 8 characters or longer, please re-enter", "Password Error")
    } else if (window.location.search == "?2") {
        toastr.warning("Password needs to include a number, please re-enter", "Password Error")
    } else if (window.location.search == "?3") {
        toastr.warning("Password needs to include a capital letter, please re-enter", "Password Error")
    } else if (window.location.search == "?4") {
        toastr.warning("Username already in use, please use a different username", "Username Error")
    }
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