//insert relevant kb articles for this new incident
(function runMailScript(current, template, email, email_action, event) {
    //check if group has attach_kb enabled
    if (!current.assignment_group.u_attach_kb_enable) {
        return;
    }

    var css_str = "<style> table {     font-family: arial, sans-serif;     border-collapse: collapse;     width: 100%; } tr {     border-bottom: 1px solid #ccc; } td, th {     text-align: left;     padding: 8px; } .myButton {     border: 1px solid #337fed;     display: inline-block;     cursor: pointer;     font-family: Arial;     font-size: 12px;     padding: 3px 20px;     text-decoration: none;     /* font-weight:bold; */ } .myButton:hover {     background-color: #1e62d0; }</style>";
    template.print(css_str);

    //start table
    template.print("<table>");
    if (current.assignment_group.u_attach_kb_method == "Manual") {
        var v1 = current.assignment_group.u_attach_kb_1;
        var v2 = current.assignment_group.u_attach_kb_2;
        var v3 = current.assignment_group.u_attach_kb_3;

        //this func also writes additional articles if < 3 are provided
        writeKb(v1, v2, v3);
    } else {
        //attach 3 kbs that match the search based on short desc
        writeKbMultiple(3);
    }

    template.print("</table>");
    //end table
})(current, template, email, email_action, event);

// Variables accessible from script:
// current: Current GlideRecord
// template: Handles printing to the email message
// email: EmailOutbound object (null when called from Client Template)
// email_action: GlideRecord for the email notification (null when called from Client Template)
// event: GlideRecord for the event that fired the notification (null when called from Client Template)


function writeKb(v1, v2, v3) {
    //count of how many kb's we need to query
    var count = 0;

    //check if [1, 3] kb is provided
    if (!v1) count++;
    if (!v2) count++;
    if (!v3) count++;

    //dynamically write 3, if mode is manual but 0 kbs are provided
    if (count == 3) {
        writeKbMultiple(count);
    } else {
        writeKbMixed(count, v1, v2, v3);
    }
}


function writeKbMixed(count, v1, v2, v3) {
    var base_url = "servicehub/?id=ucd_kb_article&sys_id=";
    var widget_base = "servicehub?id=incident_close_link&inc="; //need 15&kb=20

    // Set up basic query for IT - Public Knowledge base
    var query = "";
    query += 'kb_knowledge_base=7c2d56f42bd89200e0b209d417da153e'; // IT - Public
    query += '^roles=public'; //only show public ones so guests can see
    query += '^IR_OR_QUERY=' + current.short_description; //look for inc's short_desc
    query += '^workflow_state=published';

    var kbArt = new GlideRecord('kb_knowledge');
    kbArt.setLimit(count); //only need count maximum
    kbArt.addEncodedQuery(query);
    kbArt.query();

    //count    < 3 means {1,2,3} articles were provided
    //rowCount > 0 means {1+} articles were found
    //either case is good to display some kb articles
    if (count < 3 || kbArt.getRowCount > 0) {
        template.print("\n");
        template.print('Meanwhile, please see the following Knowledge Base articles to see if they might assist you with your inquiry:');
        template.print("\n");
    }

    //if kb is provided, write that one
    if (v1) {
        template.print("<tr>");

        //kb link
        template.print('<td><b><u><a href=' + base_url + v1.sys_id + ' target="_blank">' + v1.short_description + '</a></b></u></td>');

        //button
        var widget_url = widget_base + current.sys_id + "&kb=" + v1.sys_id + "&inc_num=" + current.number;
        template.print('<td><a href=' + widget_url + ' class="myButton" target="_blank">Close my ticket</a></td>');

        template.print("</tr>");
    }
    //else, write it from the query
    else {
        //if query has a kb
        if (kbArt.next()) {
            template.print("<tr>");

            //kb link
            template.print('<td><b><u><a href=' + base_url + kbArt.sys_id + ' target="_blank">' + kbArt.short_description + '</a></b></u></td>');

            //button
            var widget_url = widget_base + current.sys_id + "&kb=" + kbArt.sys_id + "&inc_num=" + current.number;
            template.print('<td><a href=' + widget_url + ' class="myButton" target="_blank">Close my ticket</a></td>');

            template.print("</tr>");
        }
        //else query didnt have a kb
        //dont do anything kek
    }

    if (v2) {
        template.print("<tr>");

        //kb link
        template.print('<td><b><u><a href=' + base_url + v2.sys_id + ' target="_blank">' + v2.short_description + '</a></b></u></td>');

        //button
        var widget_url = widget_base + current.sys_id + "&kb=" + v2.sys_id + "&inc_num=" + current.number;
        template.print('<td><a href=' + widget_url + ' class="myButton" target="_blank">Close my ticket</a></td>');

        template.print("</tr>");
    }
    //else, write it from the query
    else {
        //if query has a kb
        if (kbArt.next()) {
            template.print("<tr>");

            //kb link
            template.print('<td><b><u><a href=' + base_url + kbArt.sys_id + ' target="_blank">' + kbArt.short_description + '</a></b></u></td>');

            //button
            var widget_url = widget_base + current.sys_id + "&kb=" + kbArt.sys_id + "&inc_num=" + current.number;
            template.print('<td><a href=' + widget_url + ' class="myButton" target="_blank">Close my ticket</a></td>');

            template.print("</tr>");
        }
        //else query didnt have a kb
        //dont do anything kek
    }

    //if kb is provided, write that one
    if (v3) {
        template.print("<tr>");

        //kb link
        template.print('<td><b><u><a href=' + base_url + v3.sys_id + ' target="_blank">' + v3.short_description + '</a></b></u></td>');

        //button
        var widget_url = widget_base + current.sys_id + "&kb=" + v3.sys_id + "&inc_num=" + current.number;
        template.print('<td><a href=' + widget_url + ' class="myButton" target="_blank">Close my ticket</a></td>');

        template.print("</tr>");
    }
    //else, write it from the query
    else {
        //if query has a kb
        if (kbArt.next()) {
            template.print("<tr>");

            //kb link
            template.print('<td><b><u><a href=' + base_url + kbArt.sys_id + ' target="_blank">' + kbArt.short_description + '</a></b></u></td>');

            //button
            var widget_url = widget_base + current.sys_id + "&kb=" + kbArt.sys_id + "&inc_num=" + current.number;
            template.print('<td><a href=' + widget_url + ' class="myButton" target="_blank">Close my ticket</a></td>');

            template.print("</tr>");
        }
        //else query didnt have a kb
        //dont do anything kek
    }

}


function writeKbMultiple(count) {
    var base_url = "servicehub/?id=ucd_kb_article&sys_id=";
    var widget_base = "servicehub?id=incident_close_link&inc="; //need 15&kb=20

    // Set up basic query for IT - Public Knowledge base
    var query = "";
    query += 'kb_knowledge_base=7c2d56f42bd89200e0b209d417da153e'; // IT - Public
    query += '^roles=public'; //only show public ones so guests can see
    query += '^IR_OR_QUERY=' + current.short_description; //look for inc's short_desc
    query += '^workflow_state=published';

    var kbArt = new GlideRecord('kb_knowledge');
    kbArt.setLimit(count); //only need 3 maximum
    kbArt.addEncodedQuery(query);
    kbArt.query();

    if (kbArt.getRowCount > 0) {
        template.print("\n");
        template.print('Meanwhile, please see the following Knowledge Base articles to see if they might assist you with your inquiry:');
        template.print("\n");
    }

    //it's possible we don't get 3 articles back.
    //then just write as many as we get
    while (kbArt.next()) {
        template.print("<tr>");

        //kb link
        template.print('<td><b><u><a href=' + base_url + kbArt.sys_id + ' target="_blank">' + kbArt.short_description + '</a></b></u></td>');
        var widget_url = widget_base + current.sys_id + "&kb=" + kbArt.sys_id + "&inc_num=" + current.number;

        //button
        template.print('<td><a href=' + widget_url + ' class="myButton" target="_blank">Close my ticket</a></td>');

        template.print("</tr>");
    }
}
