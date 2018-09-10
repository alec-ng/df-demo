/**
* Created by Alec on 2018-09-03.
*/

/**
 * "describe": function for grouping related specs
 */
describe("Stopwatch.cmp", function() {

    /**
     * Setup: this anonymous function is run before every spec
     */
    beforeEach(function() {
        // Nothing needs to be done here.
    });

    /**
     * Teardown: this anonymous function is run after every spec
     * Each spec renders its components into the same div, so we need to clear that div out when finished
     */
    afterEach(function() {
        $T.clearRenderedTestComponents();
    });

    /**
     * "it": a "spec", or a test that contains one or more "expectations", or assertions
     */
    it("Resets the count back to zero after the stopwatch is reset", function(done) {
        $T.createComponent("c:Stopwatch", {}, true)
            .then(function(cmp) {
                cmp.start();
                window.setTimeout(function() {
                    cmp.reset();
                    expect(cmp.get("v.isStopwatchActive")).toBe(false);
                    expect(cmp.get("v.totalMsCount")).toBe(0);

                    let hoursLabel = document.getElementById('hours').innerText;
                    expect(hoursLabel).toBe('00'); // toBe : ===
                    let minutesLabel = document.getElementById('minutes').innerText;
                    expect(minutesLabel).toBe('00');
                    let secondsLabel = document.getElementById('seconds').innerText;
                    expect(secondsLabel).toBe('00');
                    let msLabel = document.getElementById('milliseconds').innerText;
                    expect(msLabel).toBe('000');

                    done();
                }, 1000);
            })
            .catch(function(e) {
                done.fail(e);
            });
    });

    it("Initially shows a zero count and is not running", function(done) {
        $T.createComponent("c:Stopwatch", {}, true)
            .then(function(cmp) {
                let hoursLabel = document.getElementById('hours').innerText;
                expect(hoursLabel).toBe('00'); // toBe : ===
                let minutesLabel = document.getElementById('minutes').innerText;
                expect(minutesLabel).toBe('00');
                let secondsLabel = document.getElementById('seconds').innerText;
                expect(secondsLabel).toBe('00');
                let msLabel = document.getElementById('milliseconds').innerText;
                expect(msLabel).toBe('000');

                expect(cmp.get("v.isStopwatchActive")).toBe(false);
                done();
            })
            .catch(function(e) {
                // If there's an error, fail the test and report the exception
                done.fail(e);
            });
    });

    it("Starts counting when the stopwatch is started", function(done) {
        $T.createComponent("c:Stopwatch", {}, true)
            .then(function(cmp) {
                let initialCount = cmp.get("v.totalMsCount");
                cmp.start();
                expect(cmp.get("v.isStopwatchActive")).toBe(true);
                // let the stopwatch run for 1 second
                window.setTimeout(function() {
                    let futureCount = cmp.get("v.totalMsCount");
                    expect(initialCount).not.toBe(futureCount);
                    done();
                }, 1000);
            })
            .catch(function(e) {
                done.fail(e);
            });
    });

    it("Stops counting when the stopwatch is stopped", function(done) {
        $T.createComponent("c:Stopwatch", {}, true)
            .then(function(cmp) {
                cmp.start();
                // Let run for a second
                window.setTimeout(function() {
                    cmp.stop();
                    let stopCount = cmp.get("v.totalMsCount");
                    expect(cmp.get("v.isStopwatchActive")).toBe(false);
                    // Let run for another second
                    window.setTimeout(function() {
                        let futureCount = cmp.get("v.totalMsCount");
                        expect(stopCount).toBe(futureCount);
                        done();
                    }, 1000);
                }, 1000);
            })
            .catch(function(e) {
                done.fail(e);
            });
    });

    it("Counts real time accurately", function(done) {
        $T.createComponent("c:Stopwatch", {}, true)
            .then(function(cmp) {
                let timeRunMs = 1000;
                cmp.start();
                window.setTimeout(function() {
                    cmp.stop();
                    // Quick and dirty assertion - err tolerance accounts for timing taken to
                    // run test method, run method to stop stopwatch, etc
                    let errTolerance = 25; // 25ms
                    expect(cmp.get("v.totalMsCount") >= (timeRunMs - errTolerance)).toBe(true);
                    expect(cmp.get("v.totalMsCount") <= (timeRunMs + errTolerance)).toBe(true);
                    done();
                }, timeRunMs);
            })
            .catch(function(e) {
                done.fail(e);
            });
    });

    it("Renders the total time elapsed in hours, minutes, seconds, and milliseconds", function(done) {
        $T.createComponent("c:Stopwatch", {}, true)
            .then(function(cmp) {
                // To adequately test the hours portion, we will set v.totalMsCount programmatically
                // instead of letting the timer run
                const hours = 3;
                const minutes = 3;
                const seconds = 3;
                const ms = 3;
                let totalMsCount = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000) + ms;
                cmp.set("v.totalMsCount", totalMsCount);

                let hoursLabel = document.getElementById('hours').innerText;
                expect(hoursLabel).toBe('0' + hours.toString());
                let minutesLabel = document.getElementById('minutes').innerText;
                expect(minutesLabel).toBe('0' + minutes.toString());
                let secondsLabel = document.getElementById('seconds').innerText;
                expect(secondsLabel).toBe('0' + seconds.toString());
                let msLabel = document.getElementById('milliseconds').innerText;
                expect(msLabel).toBe('00' + ms.toString());
                done();
            })
            .catch(function(e) {
                done.fail(e);
            });
    });

});

