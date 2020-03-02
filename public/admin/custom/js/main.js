/** Logout Logic Function */
function Logout() {
    $("#logoutBtn").click(function() {
        console.log("Log Out Btn Click");
        document.logoutForm.method = "POST";
        document.logoutForm.action = "/admin/user/logout";
        document.logoutForm.submit();
    });
}

/** Profile Page Function */
function ProfilePage() {
    $("#profileBtn").click(function() {
        console.log("Profile Page Btn Click");
        document.location.href = "/admin/user/profile";
    });
}


Logout();
ProfilePage();