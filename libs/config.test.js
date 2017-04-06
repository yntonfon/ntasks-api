"use strict";

module.exports = {
	database: "ntasks_test",
	username: "",
	password: "",
	params: {
		dialect: "sqlite",
		storage: "ntasks.sqlite",
		logging: false,
		define: {
			underscored: true
		}
	},
	jwtSecret: "NTASK_TEST",
	jwtSession: {session: false}
};