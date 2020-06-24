/*-----load-----*/
window.addEventListener("load",function(){
    console.log("loaded")
    
    /*---fn::horize banner---*/
    var iphoneBanner = document.querySelector('#pd-iphone'),
        bannerCount = document.querySelectorAll('#pd-iphone li').length,
        bannerBtn = document.querySelectorAll('.pointer-btn'),
        slideNum = 0;
    console.log(bannerCount);
    
    var pdHorizeBanner = function (dirValue) {
        if (dirValue === 1) {
            slideNum++
            if (slideNum === bannerCount){
                slideNum = bannerCount-1
            }
        } else if (dirValue === 0) {
            slideNum--
            if (slideNum === -1){
                slideNum = 0
            }
        }
        iphoneBanner.style.left = (-100 * slideNum) + "%"
        iphoneBanner.style.transition = "left .5s ease-out"
        
        if (slideNum === 0){
            bannerBtn[0].classList.add("non")
        } else if (slideNum === bannerCount-1){
            bannerBtn[1].classList.add("non")
        } else {
            bannerBtn[0].classList.remove("non")
            bannerBtn[1].classList.remove("non")
        }
        console.log(slideNum);
    }
    
    bannerBtn[0].addEventListener("click",function() {
        pdHorizeBanner(0)
    })
    bannerBtn[1].addEventListener("click",function() {
        pdHorizeBanner(1)
    })
    /*---fn::horize banner---*/
})/*-----load-----*/