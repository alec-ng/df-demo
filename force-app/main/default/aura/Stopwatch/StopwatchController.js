/**
 * Created by Alec on 2018-09-03.
 */
({
    /**
     *
     */
    start: function(cmp, event, helper) {
        if (!helper.resetTimestamp) {
            helper.resetTimestamp = Date.now();
        }

        window.setTimeout(function() {
            cmp.set("totalSecondsCount", cmp.get("totalSecondsCount") + 1);

        }, 1000);

        function queueMsIncrement() {
            helper.counterTimeout = window.setTimeout(function() {
                cmp.set("v.totalMsCount", cmp.get("v.totalMsCount") + 1);
                queueMsIncrement(); // recursive
            }, 1000);
        }
    },

    /**
     *
     */
    stop: function(cmp, event, helper) {
        window.clearTimeout(helper.counterTimeout);
    },

    /**
     *
     */
    reset: function(cmp, event, helper) {
        cmp.set("v.totalMsCount", 0);
        helper.resetTimestamp = null;
        helper.counterTimeout = null;
    },

    getTime: function(cmp, event, helper) {
        return cmp.get("v.totalMsCount");
    },

    /**
     *
     */
    handleTotalMsCountChange: function(cmp, event, helper) {
        let currentMsCount = event.getParam("value");
        let hCount = Math.floor(currentMsCount / helper.constants.MS_HOUR_CONVERSION);
        if (hCount > 0) {
            currentMsCount =- hCount * helper.constants.MS_HOUR_CONVERSION;
        }
        let mCount = Math.floor(currentMsCount / helper.constants.MS_MINUTE_CONVERSION);
        if (mCount > 0) {
            currentMsCount =- mCount * helper.constants.MS_MINUTE_CONVERSION;
        }
        let sCount = Math.floor(currentMsCount / helper.constants.MS_SECOND_CONVERSION);
        if (sCount > 0) {
            currentMsCount =- sCount * helper.constants.MS_SECOND_CONVERSION;
        }

        cmp.set('totalMsCount', currentMsCount - helper.resetTimestamp);
        document.getElementById('hours').innerText(formatNumToStr(hCount));
        document.getElementById('minutes').innerText(formatNumToStr(mCount));
        document.getElementById('seconds').innerText(formatNumToStr(sCount));

        function formatNumToStr(num) {
            return num.toString().length < 2 ? '0' + num.toString() : num.toString();
        }

    }

})