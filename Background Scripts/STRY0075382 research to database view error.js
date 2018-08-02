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

/* example output
 * 
*** Script: sys_meta: sys_meta
*** Script: start: 2018-07-24 16:06:45
*** Script: sys_mod_count: 1
*** Script: calculation_complete: true
*** Script: sys_updated_on: 2018-07-31 23:00:52
*** Script: duration: 1970-01-08 06:54:02
*** Script: sys_id: aada027cdb2b9fc8706c309e7c9619cd
*** Script: business_duration:
*** Script: sys_updated_by: system
*** Script: sys_created_on: 2018-07-24 16:06:50
*** Script: field_value: 786178d950368500528ad44054e28fca
*** Script: definition: 39d43745c0a808ae0062603b77018b90
*** Script: end: 2018-07-31 23:00:47
*** Script: id: a0da02b8db239b88ae383ede7c9619b3
*** Script: value: IET Inbox
*** Script: table: incident
*** Script: sys_created_by: system
*** Script: field: assignment_group
*** Script: ---
*** Script: sys_meta: sys_meta
*** Script: parent:
*** Script: caused_by:
*** Script: watch_list: slpkaur@ucdavis.edu,gaaksoy@ucdavis.edu
*** Script: upon_reject: cancel
*** Script: sys_updated_on: 2018-07-31 23:00:47
*** Script: u_warning: <font color="#990000">This can be used to restrict visibility of an incident that contains sensitive information. <strong>Do not</strong> store personally identifiable information (PII), FERPA, or HIPAA data on the ServiceNow platform.
*** Script: approval_history:
*** Script: skills:
*** Script: number: INC0633128
*** Script: u_affiliation: a1d86a016f0b0100091f52a03f3ee4e8
*** Script: u_guest_name:
*** Script: u_header:
*** Script: state: 7
*** Script: u_reopened_ticket: false
*** Script: sys_created_by: jrgerdes
*** Script: u_set_awaiting:
*** Script: knowledge: false
*** Script: order: 0
*** Script: delivery_plan:
*** Script: cmdb_ci: 09e2022d6f538100091f52a03f3ee4f9
*** Script: u_requested_for:
*** Script: impact: 3
*** Script: u_has_headers: true
*** Script: active: false
*** Script: work_notes_list:
*** Script: priority: 5
*** Script: rejection_goto:
*** Script: group_list:
*** Script: business_duration: 1970-01-01 06:22:14
*** Script: approval_set:
*** Script: wf_activity:
*** Script: short_description: Multiple IT Accounts Requiring Manual Merge
*** Script: delivery_task:
*** Script: correlation_display:
*** Script: work_start:
*** Script: additional_assignee_list:
*** Script: notify: 2
*** Script: service_offering:
*** Script: sys_class_name: incident
*** Script: follow_up:
*** Script: closed_by:
*** Script: parent_incident:
*** Script: u_external_system_number: PRB0040068
*** Script: u_call_id:
*** Script: reassignment_count: 0
*** Script: assigned_to: 93b8b6114f288b0006a6650f0310c7e4
*** Script: u_bomgar_sid:
*** Script: variables:
*** Script: variable_pool:
*** Script: hierarchical_variables: variable_pool
*** Script: u_restricted_group_list:
*** Script: sla_due:
*** Script: comments_and_work_notes:
*** Script: u_room:
*** Script: escalation: 0
*** Script: upon_approval: proceed
*** Script: correlation_id:
*** Script: u_first_response_duration: 1970-01-01 06:22:14
*** Script: made_sla: true
*** Script: u_emailed_from: jrgerdes@ucdavis.edu
*** Script: u_department_name: a60925db6fc77000091f52a03f3ee494
*** Script: child_incidents: 0
*** Script: u_open_alerts:
*** Script: u_building:
*** Script: u_restricted_user_list:
*** Script: resolved_by: 93b8b6114f288b0006a6650f0310c7e4
*** Script: sys_updated_by: system
*** Script: user_input:
*** Script: opened_by: 54eaa11b6f0b7000091f52a03f3ee417
*** Script: sys_created_on: 2018-07-24 16:06:43
*** Script: sys_domain: global
*** Script: calendar_stc: 22934
*** Script: u_customer_responded: false
*** Script: closed_at: 2018-07-31 23:00:47
*** Script: business_service:
*** Script: rfc:
*** Script: time_worked: 1970-01-01 00:55:58
*** Script: expected_start:
*** Script: opened_at: 2018-07-24 16:06:43
*** Script: u_do_not_send_notification: false
*** Script: work_end:
*** Script: resolved_at: 2018-07-24 22:28:57
*** Script: caller_id: 54eaa11b6f0b7000091f52a03f3ee417
*** Script: u_has_ia: false
*** Script: subcategory: change
*** Script: work_notes:
*** Script: close_code: Solved Remotely (Permanently)
*** Script: assignment_group: 786178d950368500528ad44054e28fca
*** Script: u_task_caller_id: 54eaa11b6f0b7000091f52a03f3ee417
*** Script: business_stc: 22934
*** Script: description:
*** Script: calendar_duration: 1970-01-01 06:22:14
*** Script: close_notes:
*** Script: sys_id: a0da02b8db239b88ae383ede7c9619b3
*** Script: contact_type: email
*** Script: incident_state: 7
*** Script: urgency: 3
*** Script: problem_id:
*** Script: u_auto_reminder: false
*** Script: company:
*** Script: u_submitted_for: false
*** Script: u_type:
*** Script: u_first_response_at: 2018-07-24 22:28:57
*** Script: u_restricted: false
*** Script: activity_due:
*** Script: severity: 3
*** Script: u_request:
*** Script: u_search: Multiple IT Accounts Requiring Manual Merge
*** Script: comments:
*** Script: approval: not requested
*** Script: due_date:
*** Script: sys_mod_count: 9
*** Script: reopen_count: 0
*** Script: sys_tags:
*** Script: u_task_requested_for:
*** Script: location:
*** Script: category: request
*** Script: u_emailed_to: ithelp@ucdavis.edu
*** Script: ---
*** Script: 1532448405000
*** Script: 1532448403000
*** Script: 2000
*** Script: compare: true
*/

} 