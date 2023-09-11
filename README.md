# Description
Đây là Nodejs base source xài design partten IOC và cơ sở dữ liệu là postgres sử dụng 2 loại ORM là Typeorm và Prisma.
# Config
Việc chọn Typeorm hay Prisma là do config ở file .env 1 là typeorm 2 là prisma.
# Chức năng:
+ Quản lý  table nhân viên. gồm CRUD ( thêm xóa sửa....) với schema, email, password validation
+ Upload hình ảnh/video.
+ Xử lý size, type và resolution của ảnh/video được upload, tạo thumbnail grayscale từ video
+ Được dùng để so sánh giữa TypeORM và Prisma với dữ liệu tự insert > 100k dòng
+ Register/Login
+ Hashing password
+ Filter data
