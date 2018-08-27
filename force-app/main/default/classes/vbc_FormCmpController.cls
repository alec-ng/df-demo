/**  Created by alec@gscloudsolutions on 21.08.18  */

public with sharing class vbc_FormCmpController {
    
    private static final String DEFAULT_USER_ERR_MSG = 
        'Whoops, something went wrong! Please refresh the page and try again.';

    /**
     * Wrapper class as a workaround because Schema.PicklistEntry is not AuraEnabled
     */
    public class LtngSelect {
        public String label {get;set;}
        public String value {get;set;}
        
        public LtngSelect(Schema.PicklistEntry picklistEntry) {
            this.label = picklistEntry.getLabel();
            this.value = picklistEntry.getValue();
        }
    }

    /**
     * Inserts a customer review. Performs server side validation on the review to ensure all
     * required fields are populated. @throws an AuraHandledException otherwise
     */
    @AuraEnabled
    public static void submitReview(Customer_Review__c review) {

        // Perform server side validation
        Set<String> requiredFieldSet = new Set<String> {
            'Customer_Name__c', 'Customer_Email__c', 'Rating__c', 'Beer__c'
        };
        Boolean hasRequiredFields = true;
        if (review != null) {
            for (String field : requiredFieldSet) {
                hasRequiredFields = 
                    hasRequiredFields && String.isNotEmpty(String.valueOf(review.get(field)));
            }
        } 
        if (review == null || !hasRequiredFields) {
            System.debug(LoggingLevel.INFO, 'Customer tried to submit form without all required fields');
            throw new AuraHandledException(DEFAULT_USER_ERR_MSG);
        }

        // Insert the review
        try {
            insert review;
        } catch (Exception e) {
            System.debug(LoggingLevel.ERROR, e.getMessage());
            throw new AuraHandledException(DEFAULT_USER_ERR_MSG);
        }

    }

    /**
     * Retrieves all beer records that are marked as being on tap
     */
    @AuraEnabled
    public static List<Beer__c> getBeersOnTap() {
        return [SELECT Id, Name FROM Beer__c WHERE On_Tap__c = true];
    }

    /**
     * Gets all the active picklist values for Customer_Review__c.Review__c and returns them
     * in the LtngSelect wrapper class
     */
    @AuraEnabled
    public static List<LtngSelect> getRatingPicklistValues() {
        List<Schema.PicklistEntry> picklistEntryList = 
            Customer_Review__c.Rating__c.getDescribe().getPicklistValues();
        List<LtngSelect> ltngSelectList = new List<LtngSelect>();
        for (Schema.PicklistEntry picklistEntry : picklistEntryList) {
            if (picklistEntry.isActive()) {
                ltngSelectList.add(new LtngSelect(picklistEntry));
            }
        }
        return ltngSelectList;
    }

}
