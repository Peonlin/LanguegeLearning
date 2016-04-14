var path = require('path');
var mongoose = require('mongoose');
var xlsx = require('node-xlsx');
var http = require('http');

exports.getNext = function(req, res) {
	//res.redirect('login');
	var tour = req.body.tour;
	var unit = req.body.unit;
	var type = req.body.type;

	var name = path.dirname(__dirname);
	var obj = xlsx.parse(name + "/app/excel/SCRIPT.xlsx");
	var data = obj[0].data;
	var i = 1;
	for (i = 1; i < data.length; i++) {
		if (data[i][0] != undefined) {
			if (data[i][0] != tour)
				continue;
			else {
				while (i < data.length && data[i][1] != unit) {
					i++;
				}
				while (i < data.length && data[i][2] != type) {
					i++;
				}
				if (i < data.length && i != data.length - 1) {
					i++;
				}
				else
					console.log('last one');
				break;
			}
		}
	}
	if (i < data.length) {
		var res_url = '/' + data[i][2] + '?language=en&tour=' + tour + '&unit=' + unit + '&set=' + data[i][3];
		res.send(res_url);
	}
};
