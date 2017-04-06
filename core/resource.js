"use strict";

module.exports = app => {
	return {
		authresource: (path) => {
			return app.route(path)
				.all(app.auth.authenticate());
		},
		noauthresource: (path) => {
			return app.route(path);
		}
	};
};