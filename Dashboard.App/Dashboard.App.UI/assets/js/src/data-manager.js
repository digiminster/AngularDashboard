/**
 * @file Data loading and caching functionality.
 * @author Martin Spain
 */

/*jslint browser: true, sloppy: false, white: true, plusplus: true, maxerr: 50, indent: 4, nomen: true */
/*global $, jQuery, HOP, Modernizr */

var HOP = HOP || {};
HOP.common = HOP.common || {};

/**
 * Data loading and caching functionality.
 * @namespace HOP.common.dataManager
 */
HOP.common.dataManager = (function () {
    "use strict";

    /** @private */
	var dataStore = {},
		hoursToCache = 1;


    /**
        Clears localStorage/local cache of all values that are allowed to expire.
        @public
        @memberOf HOP.common.dataManager
	*/
	function clearData() {
	    var i,
            len,
            key,
            item;

	    if (Modernizr.localstorage) {
	        for (i = 0, len = localStorage.length; i < len; i++) {
	            item = JSON.parse(localStorage.getItem(localStorage.key(i)));

	            if (item.timestamp) {
	                // item is allowed to expire, so is safe to delete
	                localStorage.removeItem(localStorage.key(i));

                    // reset length
	                len -= 1;
	            }
	        }
	    } else {
	        for (key in dataStore) {
	            if (dataStore.hasOwnProperty(key)) {
	                item = dataStore[key];

	                if (item.expires) {
	                    delete dataStore[key];
	                }
	            }
	        }
	    }
	}
	
	
    /**
		Saves data to either localStorage (if available) or to a local variable. Because localStorage stores everything as a string, data is saved as an object with type and value parameters. This allows data to be returned as the same type that it was saved, rather than as a string.
		@public
        @memberOf HOP.common.dataManager
        @param {String} key The key to save the data against
		@param {String|Number|Object} value The data to save
        @param {Boolean} expires Optional value to indicate data that is allowed to expire after a certain time
	*/
	function setData(key, value, expires) {
		var saveObject = {};

		if (expires) {
		    // timestamp when the data was saved
		    saveObject.timestamp = new Date();
		} else {
		    saveObject.timestamp = false;
		}
				
		// save data type
		switch (typeof value) {
			case "object":
				saveObject.type = "object";
				// ensure object is converted to string before saving
				saveObject.value = JSON.stringify(value);
				break;
			case "number":
				// check for decimal point
				if (value.toString().split(".").length > 1) {
					// has decimal, so type is float
					saveObject.type = "float";
				} else {
					saveObject.type = "number";
				}
				saveObject.value = value;
				break;
		    case "boolean":
		        saveObject.value = value.toString();
		        break;
			default:
				saveObject.type = "string";
				saveObject.value = value;
				break;	
		}
		
		saveObject = JSON.stringify(saveObject);
				
		if (Modernizr.localstorage) {
			localStorage.setItem(key, saveObject);
		} else {
			// fallback to local var
			dataStore[key] = saveObject;
		}
	}
	
	
    /**
		Loads data from either localStorage (if available) or from a local variable.
        @public
        @memberOf HOP.common.dataManager
		@param {String} key The key to use to retrieve the data
	 	@param {Boolean} getAsObject Optional parameter to retrieve the stored object with its metadata, rather than just the stored value
	*/
	function getData(key, getAsObject) {
		var dataObject;

		if (Modernizr.localstorage) {
			dataObject = localStorage.getItem(key);
		} else {
			// fallback to local var
			dataObject = dataStore[key];
		}
		
		// check that the object exists before continuing
		if (!dataObject) {
			return;
		}
		
		// convert back to an object
		dataObject = JSON.parse(dataObject);
		
		// format the saved data according to type to ensure we return data as it was saved
		switch (dataObject.type) {
			case "object":
				// return an object
				dataObject.value = JSON.parse(dataObject.value);
				break;
			case "float":
				// return a decimal
			    dataObject.value = parseFloat(dataObject.value);
				break;
			case "number":
				// return a number (assumes base 10)
			    dataObject.value = parseInt(dataObject.value, 10);
			    break;
		    case "boolean":
                // use JSON.parse to convert string to boolean
		        dataObject.value = JSON.parse(dataObject.value);
		        break;
		}

		if (getAsObject) {
			return dataObject;
		}

		return dataObject.value; 
	}


    /**
		Deletes a data item
        @memberOf HOP.common.dataManager
        @param {String} key The key of the data item to delete
	*/
	function deleteData(key) {
	    var i, len;

	    // if item exists
	    if (getData(key)) {
	        if (Modernizr.localstorage) {
	            localStorage.removeItem(key);
	        } else {
	            // remove from local data array
	            for (i = 0, len = dataStore.length; i < len; i++) {
	                // if current item matches the key to delete
	                if (dataStore[i][key] === key) {
	                    dataStore.splice(i, 1);
	                    break;
	                }
	            }
	        }
	    }
	}
	

    /**
		Loads data asynchronously from a remote source and caches it so the next time it's requested, the data will be served from the cached copy (providing the data has not expired).
        @public
        @memberOf HOP.common.dataManager
		@param {String} url The URL to fetch the data from
		@param {Object} callback The function to callback when the data is loaded.
	*/
	function loadData(url, async, callback) {
		var data = getData(url, true),
			dataExpiry,
			currentDate;

		// a valid callback must be specified
		if (typeof callback !== "function") {
			return;
		}
		
		// check to see if the data is older than our configured expiry time since saving
		if (data) {
			dataExpiry = new Date(data.timestamp);
			dataExpiry.setHours(dataExpiry.getHours() + hoursToCache);
			currentDate = new Date();
			
			if (currentDate > dataExpiry) {
				// data is too old, so needs to be refreshed
				data = false;
				HOP.common.logger.info("Data has expired.");
			}
		}
		
		// if data not valid, try requesting data
		if (!data) {
		    $("body").trigger("HOP.loading");

			$.ajax({
			    url: url,
			    async: async,
			    dataType: "json",
				success: function(data) {
					setData(url, data, true);
					HOP.common.logger.info("Loaded data from server", url);
					$("body").trigger("HOP.loaded");
					callback(getData(url));
				},
				error: function(xhr, status, error) {
				    var localData;

				    HOP.common.logger.error("Failed to load data from server");
					
				    // try requesting data locally
				    HOP.common.logger.info("Attempting to retrieve previously-stored data from localStorage", url);

				    localData = getData(url);

				    if (localData) {
                        // successful load of data, so execute callback, passing in the data
				        HOP.common.logger.info("Loaded previously-stored data from localStorage", url);
				        callback(localData);
				    } else {
                        // no stored data found, so callback with no params
				        HOP.common.logger.error("Failed to retrieve previously-stored data from localStorage", url);
				        callback();
				    }
				}
			});
		} else {
			HOP.common.logger.info("Loaded data from localStorage", url);
			callback(getData(url));
		}
	}

    /** scope HOP.common.dataManager */
    return {
        loadData: loadData,
		setData: setData,
		getData: getData,
        deleteData: deleteData,
        clearData: clearData
    };

}());
