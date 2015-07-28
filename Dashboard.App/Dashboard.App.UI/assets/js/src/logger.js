/**
 * @file Application logging functionality.
 * @author Martin Spain
 */

/*jslint browser: true, sloppy: false, white: true, plusplus: true, maxerr: 50, indent: 4, nomen: true */
/*global $, jQuery, HOP, console */

var HOP = HOP || {};
HOP.common = HOP.common || {};

/**
 * Logging functionality.
 * @namespace HOP.logger
 */
HOP.common.logger = (function () {
    "use strict";
	
    /** @private */
	var useConsole = false,
		usePageLog = false,
		$pageLog;
	
    /**
        Logs a message to an element in the page.
        @private
        @memberOf HOP.common.logger
        @param {String} logMsg The message to log
        @param {String|Number} [data] Related data to the log message 
    */
	function logToPage(logMsg, data) {
		var logString;
		
		if (data) {
			logString = "<li>" + logMsg + ': <span>' + data + "<span></li>";
		} else {
		    logString = "<li>" + logMsg + "</li>";
		}
		
		$pageLog.append(logString);
	}


    /**
        Logs a message. This will use the browser console directly if usePageLog is false. If usePageLog is true, it will call {@link HOP.logger#logToPage} 
        @private
        @memberOf HOP.common.logger
        @param {String} level The log level - info, warn or error
        @param {String} message The message to log
        @param {String|Object|Number|Boolean} [data] Related data to the log message
    */
    function log(level, message, data) {
        var logMsg;
		
        logMsg = level + ': ' + message;

        if (useConsole) {
			if (data) {
			    console.log(logMsg, data);
			} else {
				console.log(logMsg);
			}
        } else if (usePageLog) {
            logToPage(logMsg, data);
        }
    }

	
    /**
        Logs a info message.
        @public
        @memberOf HOP.common.logger
        @param {String} message The message to log
        @param {String|Object|Number|Boolean} [data] Related data to the log message
    */
    function info(message, data) {
        log('INFO', message, data);
    }


    /**
        Logs a warning message.
        @public
        @memberOf HOP.common.logger
        @param {String} message The message to log
        @param {String|Object|Number|Boolean} [data] Related data to the log message
    */
    function warn(message, data) {
		log('WARN', message, data);
    }


    /**
        Logs an error message.
        @public
        @memberOf HOP.common.logger
        @param {String} message The message to log
        @param {String|Object|Number|Boolean} [data] Related data to the log message
    */
    function error(message, data) {
        log('ERROR', message, data);
    }
	
	
    /**
        Initialise the logger.
        @public
        @memberOf HOP.common.logger
        @param {String} mode The mode to use for logging. 'dev' will log to console, 'production' will log to page
    */
    function init(mode) {
        var initMsg = 'Logger created [' + mode + ']';

        if (window.console && mode !== "production") {
			// only use browser console if available and not in production mode
            useConsole = true;
            console.log(initMsg);
        } else {
            // insert hidden element into page to hold logging data
			$pageLog = $('<ul id="pageLog" class="hidden"></ul>');
			$("body").append($pageLog);
			
			usePageLog = true;
            logToPage(initMsg);
        }
    }
	
    /** @scope HOP.logger */
	return {
		init: init,
		log: log,
		info: info,
		warn: warn,
		error: error
	};
}());
    
