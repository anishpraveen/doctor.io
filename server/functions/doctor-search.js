module.exports = {
    search: function (res, filterQuery) {
        var connection = require('./db.js')
        var selectIdQuery = "SELECT doctors.id " +
            "FROM   doctors  " +
            "LEFT JOIN doctors_degree  " +
            "ON doctors.id = doctors_degree.idrid " +
            "LEFT JOIN degree  " +
            "ON degree.id = doctors_degree.idegreeid " +
            "LEFT JOIN timings  " +
            "ON timings.idrid = doctors.id " +
            "LEFT JOIN clinic  " +
            "ON clinic.id = timings.iclinicid " +
            filterQuery +
            "GROUP  BY doctors.id, " +
            "   clinic.cname LIMIT 0 , 10";
        connection.query(selectIdQuery, function (err, ids) {
            var id = []
            if (typeof ids[0] === 'undefined' || ids.length == 0) {
                res.json({ 'response': '-1', 'msg': '&nbsp No results as per criteria.' })
                return;
            }
            for (l = 0; l < ids.length; l++)
                id.push(ids[l].id)
            var Query = "SELECT doctors.id,doctors.cName, doctors.cPost, doctors.iExperience, doctors.cImage, clinic.cAddress, clinic.iCost, " +
                "GROUP_CONCAT(DISTINCT degree.cDegree SEPARATOR ', ' ) AS education,doctors.cImage, " +
                "GROUP_CONCAT(DISTINCT clinic.cName SEPARATOR ', ' ) as clinic, " +
                "timings.* " +
                "FROM  doctors " +
                "LEFT JOIN doctors_degree ON doctors.id = doctors_degree.iDrId " +
                "LEFT JOIN degree on degree.id = doctors_degree.iDegreeId " +
                "LEFT JOIN timings on timings.iDrId = doctors.id " +
                "LEFT JOIN clinic on clinic.id = timings.iClinicId " +
                "where doctors.id in (" + id + ") " +
                "GROUP BY doctors.id, clinic.cName";
            connection.query(Query, function (err, rows) {
                if (err) {
                    console.log("Error Selecting : %s ", err);
                }

                var dr = rows;
                var objs = [];
                var timings = []
                var clinic1Timing = []
                var clinic2Timing = []
                for (var i = 0; i < rows.length - 1; i++) {
                    for (var j = i; j < i + 2; j++) {
                        timings.push({ "day": "Monday", start: rows[j].iMonStart, end: rows[j].iMonEnd })
                        timings.push({ "day": "Tuesday", start: rows[j].iTueStart, end: rows[j].iTueEnd })
                        timings.push({ "day": "Wednesday", start: rows[j].iWedStart, end: rows[j].iWedEnd })
                        timings.push({ "day": "Thursday", start: rows[j].iThuStart, end: rows[j].iThuEnd })
                        timings.push({ "day": "Friday", start: rows[j].iFriStart, end: rows[j].iFriEnd })
                        timings.push({ "day": "Saturday", start: rows[j].iSatStart, end: rows[j].iSatEnd })
                        timings.push({ "day": "Sunday", start: rows[j].iSunStart, end: rows[j].iSunEnd })
                        if (j == i)
                            clinic1Timing = timings
                        else
                            clinic2Timing = timings
                        timings = [];
                    }
                    objs.push({
                        name: rows[i].cName, post: rows[i].cPost, exp: rows[i].iExperience,
                        image: rows[i].cImage, education: rows[i].education,
                        clinic: [
                            { name: rows[i].clinic, address: rows[i].cAddress, timing: clinic1Timing, cost: rows[i].iCost },
                            { name: rows[i + 1].clinic, address: rows[i + 1].cAddress, timing: clinic2Timing, cost: rows[i + 1].iCost }
                        ]
                    });
                    i++;
                }
                if (objs)
                    res.json(objs);
                else
                    res.json({ 'response': '-1', 'msg': '&nbsp No results as per criteria.' })
            });
        });
    }
}