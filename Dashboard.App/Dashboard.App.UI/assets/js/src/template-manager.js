/**
 * @file Template loading and caching functionality.
 * @author Martin Spain
 */

/*jslint browser: true, sloppy: false, white: true, plusplus: true, maxerr: 50, indent: 4, nomen: true */
/*global $, jQuery, calorie */

var HOP = HOP || {};
HOP.common = HOP.common || {};

/**
 * Template loading functionality.
 * @namespace HOP.common.templateManager
 */
HOP.common.templateManager = (function () {
    "use strict";

    var templateBaseUrl = "/assets/templates",
        templates = {};


    /**
       Fetches template data. If a dataManager is available, fetches the template data via that. If not, fetches from local variable.
       @private
       @memberOf HOP.common.templateManager
       @param {String} templateName The name of the template (minus its extension) to retrieve.
       @returns {String}
       @see HOP.common.dataManager
    */
    function getTemplate(templateName) {
        var template;

        if (HOP.common.dataManager) {
            template = HOP.common.dataManager.getData(templateName);
        } else {
            template = templates[templateName];
        }

        return template;
    }


    /**
       Saves template data. If a dataManager is available, uses this to store templates. If not, uses a local variable.
       @private
       @memberOf HOP.common.templateManager
       @param {String} templateName The name of the template (minus its extension) to store.
       @param {String} template The template data to store
       @see HOP.common.dataManager
    */
    function setTemplate(templateName, template) {
        if (HOP.common.dataManager) {
            HOP.common.dataManager.setData(templateName, template, true);
        } else {
            templates[templateName] = template;
        }
    }


    /**
        Loads a template file. If the file hasn't previously been loaded, it'll be fetched via AJAX and stored. If the file has already been loaded, it'll be retrieved from the cache.
        @public
        @memberOf HOP.common.templateManager
        @param {String} templateName The name of the template (minus its extension) to retrieve.
        @param {Object} callback The function to callback when the template is loaded.
    */
    function loadTemplate(templateName, callback) {
        var template = getTemplate(templateName);

        if (!template) {
            $.ajax({
                url: templateBaseUrl + '/' + templateName + '.html',
                dataType: 'text',
                cache: false,
                success: function (data) {
                    // add to cache and callback
                    setTemplate(templateName, data);
                    callback(getTemplate(templateName));
                },
                failure: function () {
                    // callback empty on error
                    callback();
                }
            });
        } else {
            callback(template);
        }
    }

    /** @scope HOP.common.templateManager */
    return {
        loadTemplate: loadTemplate
    };

}());
