export class validation{
    validationTNNV(tknv){
        const regex = /^[0-9]{4,6}$/;
        if (!tknv) return "Tài khoản không được để trống";
        if (!regex.test(tknv)) return "Tài khoản phải từ 4 đến 6 ký tự số";
        return "";
    }   
    
    validateName(name) {    
        const regex = /^[a-zA-Z\s]+$/;
        if (!name) return "Tên nhân viên không được để trống";
        if (!regex.test(name)) return "Tên nhân viên chỉ chứa chữ cái";
        return "";
    }
    validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!email) return "Email không được để trống";
        if (!regex.test(email)) return "Email không hợp lệ";
        return "";
    }
    
    validatePassword(password) {
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{6,10}$/;
        if (!password) return "Mật khẩu không được để trống";
        if (!regex.test(password)) return "Mật khẩu phải từ 6-10 ký tự, có ít nhất 1 số, 1 chữ hoa, và 1 ký tự đặc biệt";
        return "";
    }
    
    validateDate(datepicker) {
        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        if (!datepicker) return "Ngày làm không được để trống";
        if (!regex.test(datepicker)) return "Ngày làm không hợp lệ (định dạng mm/dd/yyyy)";
        return "";
    }

    validateLuongCB(luongCB) {
        if (!luongCB) return "Lương cơ bản không được để trống";
        if (luongCB < 1000000 || luongCB > 20000000) return "Lương cơ bản phải từ 1 triệu đến 20 triệu";
        return "";
    }

    validateChucVu(chucvu) {
        const validChucVu = ["Sếp", "Trưởng phòng", "Nhân viên"];
        if (!chucvu) return "Chức vụ không được để trống";
        if (!validChucVu.includes(chucvu)) return "Chức vụ phải là Sếp, Trưởng phòng, hoặc Nhân viên";
        return "";
    }
    
    validateGioLam(gioLam) {
        if (!gioLam) return "Giờ làm không được để trống";
        if (gioLam < 80 || gioLam > 200) return "Giờ làm phải từ 80 đến 200 giờ";
        return "";
    }
}