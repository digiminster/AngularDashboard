/**
 * @file The main JavaScript functions for the {MainProject} system.
 * @author Rapid Apps
 */

/*jslint browser: true, sloppy: false, white: true, plusplus: true, maxerr: 50, indent: 4, nomen: true */
/*global JSNAMESPACE:true, HOP:false, $:false, Handlebars:false, XDate:false, FastClick:false */

var JSNAMESPACE = JSNAMESPACE || {};

/**
 * View handler for {MainProject}. Looks after building and updating HTML in the application.
 * @namespace JSNAMESPACE.view
 */
JSNAMESPACE.view = (function () {
    "use strict";

    /** @private */
    var activeClass = "active";


    /**
        Shows the data loading overlay
        @public
        @memberOf JSNAMESPACE.view
    */
    function showLoadingOverlay() {
        var overlayHTML = '<div id="loading" class="overlay"><p class="well well-small">Loading data...</p></div>',
            $loader = $("#loading"),
            $message,
            top;

        if (!$loader.length) {
            // overlay markup not in DOM, so add
            $loader = $(overlayHTML);
            $("body").append($loader);
        }

        $message = $loader.find('p.well');

        // calculate top margin (position) for success message to position it in the centre of the viewport regardless of scroll position
        top = $(window).scrollTop() + $(window).height() / 2 - $message.height() / 2;
        $message.css('margin-top', (top - 68) + 'px');

        $loader.addClass(activeClass);
    }


    /**
        Hides the data loading overlay
        @public
        @memberOf JSNAMESPACE.view
    */
    function hideLoadingOverlay() {
        var $loader = $("#loading");
        $loader.removeClass(activeClass);
    }


    /**
        Compiles and renders the view template as HTML, and adds it to the appropriate place in the DOM.
        @private
        @memberOf JSNAMESPACE.view
        @param {String} source The template source
        @param {String} view String identifier for the view
        @param {Object} data JSON data to pass to the template renderer
        @param {Function} callback Optional callback function to run once rendering is complete
    */
    function onTemplateReady(source, view, data, callback) {
        var template,
            output;

        // compile template and render with data
        template = Handlebars.compile(source);
        output = template(data);

        HOP.common.logger.info("Rendering template data for " + view);

        // insert rendered markup into the page
        switch (view) {
            case 'settingsPopup':
                
                break;
        }

        if (typeof callback === "function") {
            // execute optional callback
            callback();
        }
    }


    /**
        Gets the appropriate template file for the view that's being rendered and calls onTemplateReady to render the HTML.
        @public
        @memberOf JSNAMESPACE.view
        @param {String} view String identifier for the view
        @param {Object} data JSON data to pass to the template renderer
    */
    function render(view, data, callback) {
        // fetch template and pass it and data through to onTemplateReady when loaded
        HOP.common.templateManager.loadTemplate(view, function (source) {
            onTemplateReady(source, view, data, callback);
        });
    }


    /** @scope JSNAMESPACE.view */
    return {
        showLoadingOverlay: showLoadingOverlay,
        hideLoadingOverlay: hideLoadingOverlay,
        render: render
    };
}());


/**
 * Controller for JSNAMESPACE. Application logic in here.
 * @namespace JSNAMESPACE.view
 */
JSNAMESPACE.controller = (function () {
    "use strict";

    /** @private */
    var activeClass = "active",
        highlightClass = "highlight";


    /**
        Returns a URL from the config url object
        @private
        @memberOf JSNAMESPACE.controller
        @param {String} urlKey The key for the URL to return
    */
    function getUrlFromConfig(urlKey) {
        return JSNAMESPACE.config.urls[JSNAMESPACE.config.environment][urlKey];
    }


    /**
        Generic AJAX data loader
        @private
        @memberOf JSNAMESPACE.controller
        @param {Object} options jQuery.ajax() options object
    */
    function loadData(options) {
        var loadOptions = {
            dataType: "json",
            type: "GET",
            error: function (xhr, status, error) {
                HOP.common.logger.error("Unable to load data", xhr + ", " + status + ", " + error);
            }
        },
            cachedData;

        $.extend(loadOptions, options);

        if (navigator.onLine) {
            $.ajax(loadOptions);
        } else {
            if (HOP.common.dataManager) {
                cachedData = HOP.common.dataManager.getData(loadOptions.url);

                if (cachedData) {
                    loadOptions.success(cachedData);
                }
            }
        }
    }


    /**
        Registers all custom Handlebars helper functions
        @private
        @memberOf JSNAMESPACE.controller
    */
    function registerHandlebarsHelpers() {
        
    }


    /**
        Binds event handlers
        @private
        @memberOf JSNAMESPACE.controller
    */
    function bindEvents() {
        var $body = $("body");

        FastClick.attach(document.body);

        // prevent tap event from firing on a taphold
        $.event.special.tap.emitTapOnTaphold = false;

        $(document).ajaxError(function () {
            HOP.common.logger.error("AJAX error - unable to load content");
        });
    }


    /**
        Initialises application functionality.
        @private
        @memberOf JSNAMESPACE.controller
    */
    function init() {

        HOP.common.logger.init(JSNAMESPACE.config.environment);

        registerHandlebarsHelpers();
        bindEvents();
    }


    /** @scope JSNAMESPACE.controller */
    return {
        init: init
    };
}());


$(document).on("pageinit", "#page", function () {
    "use strict";

    JSNAMESPACE.controller.init();
});

$(document).bind("mobileinit", function () {
    "use strict";

    $.mobile.ajaxEnabled = false;
    $.mobile.hashListeningEnabled = false;
});

//This function will clear local storage of the templates specified if appcache has an update ready
$(window.applicationCache).bind("updateready",
            function (event) {
                //localStorage.removeItem('template-name');
            }
);