findValue();
function findValue() {

    var gr = new GlideRecord('metric_instance');
    gr.get('325946b8dbe79fc8706c309e7c9619f5');

    for (key in gr) {
        gs.print(key + ': ' + gr[key]);
    }
    gs.print('---');
    var gr2 = new GlideRecord('incident');
    gr2.get('81598270db239b88ae383ede7c96193c');

    for (key in gr2) {
        gs.print(key + ': ' + gr2[key]);
    }
    gs.print('---');
    var compare2 = false;

    gs.print(gr.start.dateNumericValue());
    gs.print(gr2.sys_created_on.dateNumericValue());
    gs.print(gr.start.dateNumericValue() - gr2.sys_created_on.dateNumericValue());

    if (Math.abs(gr.start.dateNumericValue() - gr2.sys_created_on.dateNumericValue()) < 5000) compare2 = true;
    gs.print('compare: ' + compare2);

} 