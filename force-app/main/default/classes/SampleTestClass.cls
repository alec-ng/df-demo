/**
 * Created by Alec on 2018-09-08.
 */
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
        // System library  provides three assertion methods
        System.assert(true);
        System.assertEquals(true, true);
        System.assertNotEquals(true, false);
    }

}