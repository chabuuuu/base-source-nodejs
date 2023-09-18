# Description
Đây là Nodejs API base source xài design partten IOC và cơ sở dữ liệu là postgres sử dụng 2 loại ORM là Typeorm và Prisma.
# Config
Việc chọn Typeorm hay Prisma là do config ở file .env 1 là typeorm 2 là prisma.
# Chức năng:
+ Quản lý  table nhân viên. gồm CRUD ( thêm xóa sửa....)
+ Schema, email, password validation
+ Upload hình ảnh/video.
+ Xử lý size, type và resolution của ảnh/video được upload, tạo thumbnail grayscale từ video.
+ Có thể chuyển qua lại giữa 2 ORM là Prisma và TypeORM
+ Register/Login, tạo Token bằng JWT
+ Hashing password
+ Filter data
