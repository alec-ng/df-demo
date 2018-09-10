@IsTest
private class SampleTestClass {

    /**
     * Setup: this function is run before every test
     */
    @TestSetup
    static void beforeEach() {

    }

    @IsTest
    static void myTest() {
        // System library assertion methods
        System.assert(true);
        System.assertEquals(true, true);
        System.assertNotEquals(true, false);
    }

}