export class nhanVien {
    constructor(taiKhoan, matKhau, hoten, email, ngayLam, chucVu, tongLuong, gioLam) {
        this.taiKhoan = taiKhoan;
        this.matKhau = matKhau;
        this.hoten = hoten;
        this.email = email;
        this.ngayLam = ngayLam;
        this.chucVu = chucVu;
        this.tongLuong = tongLuong;
        this.gioLam = gioLam;
    }

    xepLoai() {
        if(this.gioLam >= 192){
            return "Xuất sắc"
        }else if(this.gioLam >= 176){
            return "Giỏi"
        }else if(this.gioLam >=160){
            return "Khá"
        }else{
            return "Trung bình";
        }
    }

    tinhTongLuong() {
        if (this.chucVu === "Sếp") {
            return this.tongLuong * 3;
        } else if (this.chucVu === "Trưởng phòng") {
            return this.tongLuong * 2;
        } else if (this.chucVu === "Nhân viên") {
            return this.tongLuong;
        }
    }
}