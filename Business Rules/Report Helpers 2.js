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