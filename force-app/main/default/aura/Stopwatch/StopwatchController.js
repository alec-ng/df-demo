/**
 * Created by Alec on 2018-09-03.
 */
({
    /**
     *
     */
    start: function(cmp, event, helper) {
        queueMsIncrement();

        function queueMsIncrement() {
            helper.counterTimeout = window.setTimeout(function() {
                cmp.set("v.totalMsCount", cmp.get("v.totalMsCount") + 1);
                queueMsIncrement(); // recursive
            }, 1);
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
        window.clearTimeout(helper.counterTimeout);
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

        cmp.set("v.hCount", hCount);
        cmp.set("v.mCount", mCount);
        cmp.set("v.sCount", sCount);
        cmp.set("v.msCount", currentMsCount);
    }

})