var pgNum = 0,
    pgTotal = 0,
    pgProt = 0,
    side_prot = 0,
    state = 0,
    timeout,
    $dom,
    $doc,
    $_page
/*-----load-----*/
window.addEventListener("load", function () {
    $_page = $('.page')
    $doc = $(document)
    $dom = $('html,body')
    pgTotal = $_page.length
    console.log(pgTotal);
    //scroll up
    setTimeout(function () {
        $("html,body").animate({
            scrollTop: "0px"
        }, 10)
    }, 100)

    var $gnbBtn = $('#gnb-ham a'),
        $menuBtn = $('#menu-ham a'),
        $bigMenu = $('.big-menu'),
        menuTouchControl = 0

    $gnbBtn.click(function () {
        menuTouchControl = 1
        $bigMenu.slideDown(500)
    })

    $menuBtn.click(function () {
        menuTouchControl = 0
        $bigMenu.slideUp(500)
    })

    /*터치 컨트롤*/
    var touchDir1, touchDir2
    $doc.on("touchstart", function (e) {
        touchDir1 = e.originalEvent.touches[0].screenY;
    })

    $doc.on("touchend", function (e) {
        if (menuTouchControl === 1) {
            return 0;
        }
        touchDir2 = e.originalEvent.changedTouches[0].screenY;
        if ($_page.eq(pgNum).hasClass('side-scroll') && side_prot === 0) {
            console.log("작동!");
            $_page.eq(pgNum).find('.vb-cont').filter(".on").removeClass("on")
                .siblings().addClass("on");
            side_prot = 1
            return 0;
        }
        var delta = -(touchDir1 - touchDir2)
        console.log(delta);
        AutoScroll(delta)
    })

    $dom.on("mousewheel DOMMouseScroll", function (e) { //wheel
        if (menuTouchControl === 1) {
            return true;
        }
        Throttle()
        if (pgProt === 1 || state === 1) {
            return true
        }
        pgProt = 1
        state = 1
        setTimeout(function () {
            pgProt = 0
        }, 800)

        if ($_page.eq(pgNum).hasClass('side-scroll') && side_prot === 0) {
            console.log("작동!");
            $_page.eq(pgNum).find('.vb-cont').filter(".on").removeClass("on")
                .siblings().addClass("on");
            side_prot = 1
            return true;
        }

        //휠 이벤트 방향
        e = window.event || e //유효성 검사
        var delta = e.detail ? e.detail : e.wheelDeltaY //유효성 검사 및 변수처리
        if (/Firefox/i.test(navigator.userAgent)) {
            delta = -delta
        }
        AutoScroll(delta)
    })

    var $bulitLink = $(".side-bulit a")
    $bulitLink.click(function (e) {
        e.preventDefault();
        var pgIndex = $(this).parent().index()
        console.log(pgIndex);
        pgNum = pgIndex
        SelectBulit()
        var pgPosi = $(window).height() * pgNum;
        //animation
        $dom.stop().animate({
            scrollTop: pgPosi + "px"
        }, 500, 'easeInOutSine', function (arguments) {
            pageAction($_page.eq(pgNum))
        })
    })

}) /*Loaded*/

function Throttle() {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        state = 0;
        //console.log("마지막상태:" + state);
    }, 100);
    //console.log("상태:" + state);
}

function SelectBulit() {
    var $bulitListSelect = $(".side-bulit li").eq(pgNum)
    $bulitListSelect.addClass('selected').siblings().removeClass('selected')
}

/*스크롤 동작*/
function AutoScroll(delta) {
    if (delta < 0) {
        pgNum++
        if (pgNum === pgTotal) {
            pgNum = pgTotal - 1
        }
    } else if (delta > 0) {
        pgNum--
        if (pgNum < 0) {
            pgNum = 0
        }
    }
    SelectBulit()
    var pgPosi = $(window).height() * pgNum;
    /*if (pgNum === pgTotal - 1) {
        pgPosi = ($(window).height() * (pgNum - 1)) + 119;
    }*/
    console.log(pgPosi);
    $dom.stop().animate({
        scrollTop: pgPosi + "px"
    }, 500, 'easeInOutSine', function (arguments) {
        pageAction($_page.eq(pgNum))
        side_prot = 0
    })
}

function pageAction(page) {
    console.log("액션");
    if (page.hasClass('side-act')) {
        page.find('.vb-cont').addClass('now')
    }
}

/*
function debounce(fn, delay) {
    var timer = null;
    return function () {
        var context = this,
            args = arguments;
        //console.log(args);
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}
*/
