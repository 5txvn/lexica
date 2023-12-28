$(function() {
    if (window.location.search == "?1") {
        toastr.warning('Username could not be found, please try again', "Username Error");
    } else if (window.location.search == "?2") {
        toastr.warning('Incorrect password, please try again', "Password Error");
    }
})