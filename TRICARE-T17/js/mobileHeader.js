var DOMReady = function (callback) {
    (document.readyState === "complete") ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

DOMReady(function () {
    var headerUtils = document.querySelector(".headerUtils");
    var searchToggle = document.querySelector(".searchToggle");
    var menuToggle = document.querySelector(".mobileMenuTrigg");
    var mobileMenu = document.querySelector(".mainNav");
    var darken = document.querySelector("#darken");
   
    var mobileMenuTrigg = document.querySelector(".mobileMenuTrigg");

    //searchToggle.addEventListener("click", function () {
    //});

    //menuToggle.addEventListener("click", function () {  
    //});

    if (darken !== null) {
        darken.addEventListener("click", function () {
            if (mobileMenu.classList.contains("open")) { // closes menu if open
                toggleMobileMenu(true);
            }
            if (headerUtils.classList.contains("open")) { //closes headerUtils (search box) if already open
                    toggleSearchInput(true);
            }
            //document.body.removeEventListener("click", menuToggle, true);
        });
    }
})

function toggleNavMenu() {
  var headerUtils = document.querySelector(".headerUtils");
  var mobileMenu = document.querySelector(".mainNav");
  if (mobileMenu.classList.contains("open")) { // closes menu if open
    toggleMobileMenu(true);
  }
  else {

    if (headerUtils.classList.contains("open")) { //closes headerUtils (search box) if already open
      toggleSearchInput(true);
    }
    toggleMobileMenu(false);
  }
}

function toggleSearchMenu() {
  var headerUtils = document.querySelector(".headerUtils");
  var mobileMenu = document.querySelector(".mainNav");
  if (headerUtils.classList.contains("open")) { //closes headerUtils (search box) if already open
    toggleSearchInput(true);
  }
  else {

    if (mobileMenu.classList.contains("open")) { //closes mobile menu if already open
      toggleMobileMenu(true);
    }
    toggleSearchInput(false);
  }
}

//function closeSearchForm(blep) {
//    var headerUtils = document.querySelector(".headerUtils");
//    var searchInput = document.querySelector(".inputBTNcombo > input");
//    var searchWarning = document.querySelector("#spSearchInvalid");
//    var x = blep.target;
//    var isSearch = false;
//    while (x = x.parentNode) {
//        if (x == headerUtils) {
//            isSearch = true;
//        }
//    }
//    if (!isSearch) {
//        headerUtils.classList.remove("open");
//        headerUtils.classList.add("closed");
//        darken.classList.remove("modalDarken");
//        searchInput.removeAttribute("aria-invalid");
//        searchInput.removeAttribute("aria-describedby");
//        searchWarning.setAttribute("style", "display:none;");
//    }

//}

function toggleSearchInput(setting) {
    var headerUtils = document.querySelector(".headerUtils");
    var searchToggle = document.querySelector(".searchToggle");
    var searchInput = document.querySelector(".inputBTNcombo > input");
    var searchWarning = document.querySelector("#spSearchInvalid");
    var mobileMenu = document.querySelector(".mainNav");
    var darken = document.querySelector("#darken");
    var mobileMenuTrigg = document.querySelector(".mobileMenuTrigg");
    if (setting) {
        headerUtils.classList.remove("open");
        headerUtils.classList.add("closed");
        searchToggle.classList.remove("clicked");
        searchToggle.setAttribute("aria-expanded", "false");
        mobileMenuTrigg.setAttribute("aria-expanded", "false");
        darken.classList.remove("modalDarken");
        searchInput.removeAttribute("aria-invalid");
        searchInput.removeAttribute("aria-describedby");
        searchWarning.setAttribute("style", "display:none;");
    } else {
        headerUtils.classList.add("open");
        headerUtils.classList.remove("closed");
        searchToggle.classList.add("clicked");
        searchToggle.setAttribute("aria-expanded", "true");
        searchInput.focus();
        mobileMenuTrigg.setAttribute("aria-expanded", "true");
        darken.classList.add("modalDarken");
    }
}

var menuContents;

function toggleMobileMenu(setting) {
    var headerUtils = document.querySelector(".headerUtils");
    var searchToggle = document.querySelector(".searchToggle");
    var mobileMenu = document.querySelector(".mainNav");
    var darken = document.querySelector("#darken");
    var mobileMenuTrigg = document.querySelector(".mobileMenuTrigg");
    var mobileMenuUl = document.querySelector(".mainNav > ul");

    // save menu contents the first time it is opened; this is our reset point
    if (menuContents == null) {
        menuContents = mobileMenuUl.innerHTML;
    }

    if (setting) {
        mobileMenu.classList.remove("open")
        mobileMenu.classList.add("closed");
        mobileMenuTrigg.classList.remove("clicked");
        mobileMenuTrigg.setAttribute("aria-expanded", "false");
        darken.classList.remove("modalDarken");
    } else {
        mobileMenu.classList.add("open")
        mobileMenu.classList.remove("closed");
        mobileMenuTrigg.classList.add("clicked");
        mobileMenuTrigg.setAttribute("aria-expanded", "true");
        darken.classList.add("modalDarken");
        mobileMenuUl.innerHTML = menuContents; // reset the menu to the way it was on page load
    }
}

//function closeHeader(blep) {
//    var mainnav = document.querySelector(".mainNav");
//    var menuButton = document.querySelector(".mobileMenuTrigg");
//    var searchButton = document.querySelector(".searchToggle");
//    var mobileMenuUl = document.querySelector(".mainNav > ul");
//    var darken = document.querySelector("#darken");
//    var headerUtils = document.querySelector(".headerUtils");
//    var searchInput = document.querySelector(".inputBTNcombo > input");
//    var searchWarning = document.querySelector("#spSearchInvalid");
    
//    // see if the click was inside the mainNav element
//    var x = blep.target;
//    var ismenu = false;
//    var issearchbutton = false;
//    if (x == searchButton)
//        issearchbutton = true
//    if (x == menuButton) {
//        ismenu = true
//    } else {
//        while (x = x.parentNode) {
//            if (x == mainnav) {
//                ismenu = true;
//            }
//        }
//    }

//    // if it was not, cancel the click event and close the menu
//    if (!ismenu) {
//        mainnav.classList.remove("open");
//        mainnav.classList.add("closed");
//        if (!searchButton.classList.contains("clicked"))
//            darken.classList.remove("modalDarken");
        
//        menuButton.classList.remove("clicked");

//        // document.body.removeEventListener("click", closeMenu, true);

//        //make sure the search icon toggles the search input rather than just hiding the menu
//        if (issearchbutton) {
//            searchButton.classList.add("clicked");
//            headerUtils.classList.add("open");
//            headerUtils.classList.remove("closed");
//            darken.classList.add("modalDarken");
//        } else { // user clicked outside of menu and outside of search area so we need to close the search area
//            searchButton.classList.remove("clicked");
//            headerUtils.classList.remove("open");
//            headerUtils.classList.add("closed");
//            darken.classList.remove("modalDarken");
            
//        }


//        document.body.removeEventListener("click", closeHeader, true);
        
//        // close any open submenus
//        Array.prototype.slice.call(mobileMenuUl.children).forEach(function (element) { element.classList.remove('active') });

//        blep.preventDefault();
//        blep.stopPropagation();
//        return false;
//    }




//}

function openSubMenu(elem) {
    var liParent = elem.parentNode.parentNode;

    // check if menu is already open
    var doOpen = !liParent.classList.contains('active');

    // close any other open menus
    var ulParent = liParent.parentNode;
    Array.prototype.slice.call(ulParent.children).forEach(function (element) { element.classList.remove('active') });

    // open this submenu
    if (doOpen) {
        liParent.classList.add('active');
        liParent.scrollIntoView();
    }

    return false;
}