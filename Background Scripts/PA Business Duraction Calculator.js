findValue();
function findValue() {

    var gr = new GlideRecord('incident');
    gr.get('31d87e2cdbaf1fc8706c309e7c961922');
    var start = gr.opened_at;
    var end = gr.sys_updated_on;

    var startDT = new GlideDateTime(start);
    var endDT = new GlideDateTime(end);

    var sched = new GlideSchedule('d22a6e68dbd5cb400abf9c94db961921', 'US/Pacific');
    var bus_duration = sched.duration(startDT, endDT);
    //var bus_duration = gs.calDateDiff(start, end, false);

    var diff = function (x, y) { return y.dateNumericValue() - x.dateNumericValue(); };
    var hours = function (x, y) { return diff(x, y) / (60 * 60 * 1000); };
    var metric = hours(start, end);

    var bus_duration_hours = bus_duration.getNumericValue() / (60 * 60 * 1000);
    var starttype = typeof start;

    gs.print('start : ' + start);
    gs.print('end : ' + end);
    gs.print('startDT : ' + startDT);
    gs.print('endDT : ' + endDT);
    gs.print('sched : ' + sched);
    gs.print('bus_duration: ' + bus_duration);
    gs.print('-');
    gs.print('hours: ' + metric);
    gs.print('starttype: ' + starttype);
    gs.print('bus_duration_hours: ' + bus_duration_hours);
} 

/* or how it would appear in the PA script
 * 
 var hours=function(x,y){
	var startDT = new GlideDateTime(x);
	var endDT = new GlideDateTime(y);

	var sched = new GlideSchedule('d22a6e68dbd5cb400abf9c94db961921','US/Pacific');
	var bus_duration = sched.duration(startDT, endDT);

	var bus_duration_hours = bus_duration.getNumericValue()/(60*60*1000);
	return bus_duration_hours;
};
hours(current.opened_at, score_end);
 * 
 * 
 */