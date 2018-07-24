//
// Get the email address of the logged in user or username
//

function getUserEmail(name) {
	if (name.indexOf('@')>-1){
		return name;
	} else if (name){
		var gr = new GlideRecord('sys_user');
		gr.addQuery('user_name', name);
		gr.query();
		if (gr.next()){
			return gr.email;
		} else {
			return 'no user found';
		}
	} else {
		var u = gs.getUserID();
		var gr2 = new GlideRecord('sys_user');
		gr2.get(u);
		return gr2.email;
	}
}

//
// Return items with this tag
//
function filterTags(operator, tag) {
    if (operator == '', operator == null, tag == '' || tag == null) return 'Missing Operator or Tag';

    var gr3 = new GlideRecord('label_entry');

    if (operator == 'is' || operator == '=') {
        gr3.addQuery('label.name', tag);
    } else if (operator == 'starts with') {
        gr3.addQuery('label.name', 'STARTSWITH', tag);
    } else if (operator == 'ends with') {
        gr3.addQuery('label.name', 'ENDSWITH', tag);
    } else if (operator == 'contains') {
        gr3.addQuery('label.name', 'CONTAINS', tag);
    } else {
        return 'Invalid Operator';
    }

    var currentUser = gs.getUserID() + '';
    var labelArray = [];

    var gr4 = new GlideRecord('label_user_m2m');
    gr4.addQuery('user', currentUser);
    gr4.query();
    while (gr4.next()) {
        labelArray.push(gr4.label + '');
    }

    var gr5 = new GlideRecord('label');
    gr5.addQuery('owner', currentUser);
    gr5.addQuery('type', 'standard');
    gr5.query();
    while (gr5.next()) {
        if (labelArray.indexOf(gr5.sys_id) == -1) {
            labelArray.push(gr5.sys_id + '');
        }
    }

    var sysIDs = [];

    gr3.query();
    while (gr3.next()) {
        if (labelArray.indexOf(gr3.label.sys_id + '') > -1) {
            sysIDs.push(gr3.table_key + '');
        }
    }
    gs.log('earl test: ' + labelArray);

    var answer = sysIDs + '';
    return answer;
}