function(spUtil, $scope) {
  /* widget controller */
  var c = this;
	spUtil.recordWatch($scope, c.data.table_name, c.data.encoded_query, function(name, data) {
		console.log(data);
		console.log(name);
		c.server.update();
	})
}