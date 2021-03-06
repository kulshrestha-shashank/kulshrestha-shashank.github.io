﻿(function ($) {

    scroller = {
        topScrollOffset: -84,
        scrollTiming: 1000,
        pageLoadScrollDelay: 1000,
        hashLinkClicked: function (e) {

            // current path
            var temp = window.location.pathname.split('#');
            var curPath = scroller.addTrailingSlash(temp[0]);

            // target path
            var link = $(this).attr('href');
            var linkArray = link.split('#');
            var navId = (typeof linkArray[1] !== 'undefined') ? linkArray[1] : null;
            var targetPath = scroller.addTrailingSlash(linkArray[0]);

            // scrollTo the hash id if the target is on the same page
            if (targetPath == curPath && navId) {
                e.preventDefault();
                scroller.scrollToElement('#' + navId);
                window.location.hash = scroller.generateTempNavId(navId);

                // otherwise add '_' to hash
            } else if (navId) {
                e.preventDefault();
                navId = scroller.generateTempNavId(navId);
                window.location = targetPath + '#' + navId;
            }
        },
        addTrailingSlash: function (str) {
            lastChar = str.substring(str.length - 1, str.length);
            if (lastChar != '/')
                str = str + '/';
            return str;
        },
        scrollToElement: function (whereTo) {
            $.scrollTo(whereTo, scroller.scrollTiming, { offset: { top: scroller.topScrollOffset }, easing: 'easeInOutQuart' });
        },
        generateTempNavId: function (navId) {
            return '_' + navId;
        },
        getNavIdFromHash: function () {
            var hash = window.location.hash;

            if (scroller.hashIsTempNavId()) {
                hash = hash.substring(2);
            }

            return hash;
        },
        hashIsTempNavId: function () {
            var hash = window.location.hash;

            return hash.substring(0, 2) === '#_';
        },

        loaded: function () {

            if (scroller.hashIsTempNavId()) {
                setTimeout(function () { scroller.scrollToElement('#' + scroller.getNavIdFromHash()); }, scroller.pageLoadScrollDelay);
            }
        }
    };

})(jQuery);