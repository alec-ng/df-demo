/**
 * Created by Alec on 2018-09-03.
 */
({
    // holds the id of the timer that was set
    counterTimeout: null,

    // timestamp of when the timer is started for the first time
    resetTimetamp : null,

    constants: {
        MS_HOUR_CONVERSION: 3600000, // 1000 * 60 * 60
        MS_MINUTE_CONVERSION: 60000, // 1000 * 60
        MS_SECOND_CONVERSION : 1000
    }
})