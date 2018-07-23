if (current.caller_id != gs.getUserID() && current.u_requested_for != gs.getUserID()) {
    calcFirstResponse();
}
/* calcFirstResponse sets the First Response fields on incident records.
/  
/  First Response At: is set when a user with the itil role comments on an existing ticket. 
/  If there is already a value in First Response At, it is not updated.
/ 
/  First Response Duration: is calculated as the difference between the Opened time of the
/  incident and the First Response At time. If the assignment group has a schedule associated
/  with it, the duration will be calculated against the group's schedule.
*/
function calcFirstResponse() {
    var firstResponseAt, firstResponseDuration;

    // If First Response At is empty, set it to now
    // Otherwise, use the specified First Response At value
    if (current.u_first_response_at == '') {
        firstResponseAt = new GlideDateTime();
        current.u_first_response_at = firstResponseAt;
    }
    else {
        firstResponseAt = current.u_first_response_at;
    }

    if (current.u_first_response_at != previous.u_first_response_at) {

        firstResponseDuration = calcGroupDurationSchedule(current.opened_at, firstResponseAt, current.assignment_group);

        current.u_first_response_duration = firstResponseDuration;
    }
    //END calcFirstResponse

    //Helper function to calculate duration based on group schedules
    function calcGroupDurationSchedule(start, end, group) {
        var schedule, timezone, duration;

        var startDT, endDT; //needed for call to GlideSchedule.duration()
        startDT = new GlideDateTime(start);
        endDT = new GlideDateTime(end);

        // Get the assignment group's schedule
        if (group) {
            schedule = group.u_business_hours;
            timezone = group.u_time_zone;
        }

        //If timezone is empty, use the system default
        if (!timezone) {
            timezone = gs.getProperty('glide.sys.default.tz');
        }

        //If schedule is empty, use 8-5 excluding holidays
        if (!schedule) {
            schedule = '090eecae0a0a0b260077e1dfa71da828';
        }

        //Create a GlideSchedule object (Calgary and later) to calculate the duratino
        var sched = new GlideSchedule(schedule, timezone);
        // Get duration based on schedule/timezone
        duration = sched.duration(startDT, endDT);

        return duration;
    }
}