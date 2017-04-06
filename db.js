"use strict";

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

let db = null;

module.exports = app => {
	if (!db) {
		const config = app.libs.config;
		const sequelize = _init_sequelize(config);

		db = _init_db_with_sequelize(sequelize);
		
		_add_models_to_db(db, sequelize);
		_associate_models(db);
	}
	return db;
};

function _init_sequelize (config) {
	return new Sequelize(
		config.database,
		config.username,
		config.password,
		config.params
	);
}

function _init_db_with_sequelize (sequelize) {
	return {
		sequelize,
		Sequelize,
		models: []
	};
}

function _add_models_to_db (db, sequelize) {
	const dir = path.join(__dirname, "models");
	fs.readdirSync(dir).forEach(file => {
		const modelDir = path.join(dir, file);
		const model = sequelize.import(modelDir);
		db.models[model.name] = model;
	});
}

function _associate_models (db) {
	Object.keys(db.models).forEach(key => {
		db.models[key].associate(db.models);
	});
}