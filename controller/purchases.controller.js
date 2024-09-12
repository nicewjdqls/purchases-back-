const { connection } = require('../model/Task');

async function reservation(req, res) {
    console.log(req.body);
    try {
        const { userId, sitNum, reserveDate, startTime, endTime } = req.body;

        // 시작 시간과 종료 시간을 reserveDate와 결합하여 full datetime으로 변환
        const startDateTime = `${reserveDate} ${startTime}`;
        const endDateTime = `${reserveDate} ${endTime}`;

        // SQL 쿼리 실행 (reservation 테이블에 데이터 삽입)
        const query = `
            INSERT INTO reservation (user_id, room_number, start_time, end_time)
            VALUES (?, ?, ?, ?)
        `;

        // 데이터 삽입
        await connection.promise().query(query, [userId, sitNum, startDateTime, endDateTime]);

        // 성공 응답
        return res.status(200).json({ success: true, message: "성공" });
    } catch (error) {
        console.error('예약 오류:', error);
        return res.status(500).json({ success: false, message: '예약 중 오류가 발생했습니다.' });
    }
}

module.exports = {
    reservation
};
