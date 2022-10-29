const catchAsync = require('../utils/catchAsync');
const { studentService } = require('../services');

const studentController = {
    createSampleData: catchAsync(async (req, res) => {
        await studentService.create({
            name: 'Nguyễn Tấn Phát',
            studentId: '52000698',
            tuition: 11000000,
        });

        await studentService.create({
            name: 'Nguyễn Hoài Thanh',
            studentId: '52000716',
            tuition: 11000000,
        });

        await studentService.create({
            name: 'Lý Gia Bảo',
            studentId: '52000011',
            tuition: 12000000,
        });
    }),
};

module.exports = studentController;
