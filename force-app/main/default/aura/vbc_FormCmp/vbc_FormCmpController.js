({
    /**
     * 
     */
    doInit: function(cmp, event, helper) {
        let action_beer = cmp.get("c.getBeersOnTap");
        action_beer.setCallback(this, function(response) {
            if (response.getStatus() === "OK") {
                
            } else {
                helper.fireErrorToast(response.getError()[0].message);
            }
        });
        $A.enqueueAction(action_beer);

        let action_rating = cmp.get("c.getRatingPicklistValues");
        action_rating.setCallback(this, function(response) {
            if (response.getStatus() === "OK") {

            } else {
                helper.fireErrorToast(response.getError()[0].message);
            }
        });
        $A.enqueueAction(action_rating);

    },

    submitForm: function(cmp, event, helper) {

    }

})
