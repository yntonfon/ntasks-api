"use strict";


import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

module.exports = app => {
	const Users = app.db.models.Users;
	const cfg = app.libs.config;
	const params = {
		secretOrKey: cfg.jwtSecret,
		jwtFromRequest: ExtractJwt.fromAuthHeader()
	};

	const strategy = init_auth_strategy(params, Users);
	passport.use(strategy);

	return {
		initialize: () => {
			return passport.initialize();
		},
		authenticate: () => {
			return passport.authenticate("jwt", cfg.jwtSession);
		}
	};
};

function init_auth_strategy (params, users) {
	return new Strategy(params, (payload, done) => {
		users.findById(payload.id)
		.then(user => {
			if (user) {
				return done(null, {
					id: user.id,
					email: user.email
				});
			}
		})
		.catch(error => done(error, null));
	});
}