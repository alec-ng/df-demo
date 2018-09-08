describe("Stopwatch", function() {

    beforeEach(function() {
        // Nothing needs to be done here.
    });

    afterEach(function() {
        // Each spec (test) renders its components into the same div,
        // so we need to clear that div out at the end of each spec.
        $T.clearRenderedTestComponents();
    });

    it("Initially shows a zero count", function() {
        $T.createComponent("c:Stopwatch", {}, true)
            .then(function(cmp) {

            })
            .catch(function(e) {
                done.fail(e);
            });
    });

    it("Starts counting when the stopwatch is started", function() {
        $T.createComponent("c:Stopwatch", {}, true)
            .then(function(cmp) {

            })
            .catch(function(e) {
                done.fail(e);
            });
    });

    it("Stops counting when the stopwatch is stopped", function() {
        $T.createComponent("c:Stopwatch", {}, true)
            .then(function(cmp) {

            })
            .catch(function(e) {
                done.fail(e);
            });
    });

    it("Resets the count back to zero after the stopwatch is reset", function() {
        $T.createComponent("c:Stopwatch", {}, true)
            .then(function(cmp) {

            })
            .catch(function(e) {
                done.fail(e);
            });
    });

});

