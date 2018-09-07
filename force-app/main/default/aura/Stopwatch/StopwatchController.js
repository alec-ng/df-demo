/**
 * Created by Alec on 2018-09-03.
 */
({
    /**
     *
     */
    start: function(cmp, event, helper) {
        cmp.set("v.isStopwatchActive", true);

        setTotalMsCount();

        function setTotalMsCount(timestamp) {
            if (cmp.get("v.isStopwatchActive")) {
                if (!helper.resetTimestamp) {
                    helper.resetTimestamp = timestamp;
                }
                cmp.set("v.totalMsCount", timestamp - helper.resetTimestamp);
                window.requestAnimationFrame(setTotalMsCount);
            }
        }
    },

    /**
     *
     */
    stop: function(cmp, event, helper) {
        cmp.set("v.isStopwatchActive", false);
    },

    /**
     *
     */
    reset: function(cmp, event, helper) {
        cmp.set("v.totalMsCount", 0);
        cmp.set("v.isStopwatchActive", false);
        helper.resetTimestamp = null;
    },

    getTime: function(cmp, event, helper) {
        return cmp.get("v.totalMsCount");
    },

    /**
     *
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

        function formatNumToStr(num, length) {
            num = num.toString();
            while (num.length < length) {
                num = '0' + num;
            }
            return num;
        }

    }

})