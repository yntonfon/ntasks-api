"use strict";

import cluster from "cluster";
import os from "os";

const CPUS = os.cpus();
if (cluster.isMaster) {
	CPUS.forEach(() => cluster.fork());
	cluster.on("listening", worker => {
		console.log("Cluster %d connected", worker.process.pid);
	});
	cluster.on("exit", worker => {
		console.log("Cluster %d is dead", worker.process.id);
		cluster.fork()
	});
} else {
	require("./index.js");
}