"use strict";
const express = require("express");
let router = express.Router();
const db = require('../db');


router.route("/")
    .get(async (req, res) => {
        try {
            const data = await db.query("SELECT * FROM schedules ORDER BY id;");
            if (data.rows.length === 0) {
                res.status(404).json({
                    message: "Not Found",
                    results: 0,
                    data: {}
                });
            }
            else {
                res.status(200).json({
                    message: "Success",
                    results: data.rows.length,
                    data: data.rows
                });
            }

        }
        catch (err) {
            res.status(500).json({
                message: "Server Connection Error",
                err
            });
        }

    })

    .post(async (req, res) => {
        const handleData = (rows) => {
            if (rows.length === 0) {
                res.status(406).json({
                    message: "Not Acceptable",
                    data: {}
                });
            }
            else {
                res.status(201).json({
                    message: "Created",
                    data: rows[0]
                });
            }
        }
        try {
            const date_start = new Date(req.body.start_time);
            const date_end = new Date(req.body.end_time);
            // console.log(req.body.start_time);
            // console.log(req.body.end_time);
            if (req.body.recurrence_rule!=='Only Once') {
                const data = await db.query("INSERT INTO schedules (subject, start_time, end_time, isallday, recurrence_rule) VALUES ($1,$2,$3,$4,$5) returning *;", [req.body.subject, date_start, date_end, req.body.isallday, req.body.recurrence_rule]);
                handleData(data.rows);
            }
            else {                
                const data = await db.query("INSERT INTO schedules (subject, start_time, end_time, isallday) VALUES ($1,$2,$3,$4) returning *;", [req.body.subject, date_start, date_end, req.body.isallday]);
                handleData(data.rows);
            }
        }
        catch (err) {
            res.status(500).json({
                message: "Server Connection Error",
                err
            });
        }

    })

router.route("/:id")
    .get(async (req, res) => {
        try {
            const data = await db.query("SELECT * FROM schedules WHERE id=$1;", [req.params.id]);
            if (data.rows.length === 0)
                res.status(404).json({
                    message: "Not Found",
                    results: 0,
                    data: {}
                });
            else
                res.status(200).json({
                    message: "Success",
                    results: data.rows.length,
                    data: data.rows[0]
                });
        }
        catch (err) {
            res.status(500).json({
                message: "Server Connection Error",
                err
            });
        }

    })

    .put(async (req, res) => {
        const handleData = (rows) => {
            if (rows.length === 0) {
                res.status(406).json({
                    message: "Not Acceptable",
                    data: {}
                });
            }
            else {
                res.status(202).json({
                    message: "Accepted",
                    data: rows[0]
                });
            }
        }
        try {
            const date_start = new Date(req.body.start_time);
            const date_end = new Date(req.body.end_time);
            if (req.body.recurrence_rule!=='Only Once') {
                const data = await db.query("UPDATE schedules SET subject=$1, start_time=$2, end_time=$3, isallday=$4, recurrence_rule=$5 WHERE id=$6 returning *;", [req.body.subject, date_start, date_end, req.body.isallday, req.body.recurrence_rule, req.params.id]);
                handleData(data.rows);
            }
            else {
                const data = await db.query("UPDATE schedules SET subject=$1, start_time=$2, end_time=$3, isallday=$4, recurrence_rule=$5 WHERE id=$6 returning *;", [req.body.subject, date_start, date_end, req.body.isallday, null, req.params.id]);
                handleData(data.rows);
            }
        }
        catch (err) {
            res.status(500).json({
                message: "Server Connection Error",
                err
            });
        }

    })

    .delete(async (req, res) => {
        const handleData = (rows) => {
            if (rows.length === 0) {
                res.status(406).json({
                    message: "Not Acceptable",
                    data: {}
                });
            }
            else {
                res.status(202).json({
                    message: "Accepted",
                    data: rows[0]
                });
            }
        }
        try {
            const data = await db.query("DELETE FROM schedules WHERE id=$1;", [req.params.id]);
            res.status(204).json({
                message: "No Content"
            });
        }
        catch (err) {
            res.status(500).json({
                message: "Server Connection Error",
                err
            });
        }

    })

module.exports = router;