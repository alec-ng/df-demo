/**
 * Created by Alec on 2018-09-03.
 */
({
    /**
     * Initiates the stopwatch to start counting beginning at whatever time it held beforehand
     */
    start: function(cmp, event, helper) {
        cmp.set("v.isStopwatchActive", true);

        setTotalMsCount();

        /**
         * Recursive method that continually updates the time elapsed via window.requestAnimationFrame, only
         * if the stopwatch is active
         */
        function setTotalMsCount(timestamp) {
            if (cmp.get("v.isStopwatchActive")) {
                if (!helper.resetTimestamp) {
                    helper.resetTimestamp = timestamp;
                }
                cmp.set("v.totalMsCount", timestamp - helper.resetTimestamp);
                window.requestAnimationFrame(setTotalMsCount); // recursive
            }
        }
    },

    /**
     * Stops v.totalMsCount from being incremented
     */
    stop: function(cmp, event, helper) {
        cmp.set("v.isStopwatchActive", false);
    },

    /**
     * Resets the total time elapsed to 0 and sets the stopwatch in a stopped state
     */
    reset: function(cmp, event, helper) {
        cmp.set("v.totalMsCount", 0);
        cmp.set("v.isStopwatchActive", false);
        helper.resetTimestamp = null;
    },

    /**
     * Returns the total ms elapsed on the stopwatch. If this is called when the stopwatch is active, this
     * returns a close approximation of the total ms elapsed at the time this was called
     */
    getTime: function(cmp, event, helper) {
        return cmp.get("v.totalMsCount");
    },

    /**
     * Fired on the change handler for v.totalMsCount. Converts the total ms elapsed to hours, min, seconds and ms
     * and updates the DOM with the converted values
     */
    handleTotalMsChanged: function(cmp, event, helper) {
        let currentMsCount = parseInt(event.getParam("value")); // msCount is a double
        let hCount = Math.floor(currentMsCount / helper.constants.MS_HOUR_CONVERSION);
        if (hCount > 0) {
            currentMsCount = currentMsCount - (hCount * helper.constants.MS_HOUR_CONVERSION);
        }
        let mCount = Math.floor(currentMsCount / helper.constants.MS_MINUTE_CONVERSION);
        if (mCount > 0) {
            currentMsCount = currentMsCount - (mCount * helper.constants.MS_MINUTE_CONVERSION);
        }
        let sCount = Math.floor(currentMsCount / helper.constants.MS_SECOND_CONVERSION);
        if (sCount > 0) {
            currentMsCount = currentMsCount - (sCount * helper.constants.MS_SECOND_CONVERSION);
        }

        document.getElementById('hours').innerText = formatNumToStr(hCount, 2);
        document.getElementById('minutes').innerText = formatNumToStr(mCount, 2);
        document.getElementById('seconds').innerText = formatNumToStr(sCount, 2);
        document.getElementById('milliseconds').innerText = formatNumToStr(currentMsCount, 3);

        /**
         * Converts a number to a string in the length specified. If the number is shorter than the length, it is
         * left padded with 0s
         */
        function formatNumToStr(num, length) {
            num = num.toString();
            while (num.length < length) {
                num = '0' + num;
            }
            return num;
        }

    }

})