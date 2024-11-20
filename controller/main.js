import { nhanVien } from "../model/nhanVien.js";
import { nhanVienServices } from "../model/nhanVienServices.js";
import { validation } from "../model/validation.js";

const nhanVienServiceInstance = new nhanVienServices();
let nhanVienToEdit = null


const validator = new validation();

const showError = (elementId, message) => {
    const element = document.getElementById(elementId);
    if (element) {  // Kiểm tra phần tử có tồn tại không
        element.classList.add("d-block");
        element.innerText = message;
    }else {
        console.error(`Không tìm thấy phần tử với id: ${elementId}`);
    }
};

const layThongTinNhanVien = () => {
    const taiKhoan = document.getElementById('tknv').value;
    const hoTen = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const matKhau = document.getElementById('password').value;
    const ngayLam = document.getElementById('datepicker').value;
    const luong = parseInt(document.getElementById('luongCB').value.replace(/\s/g, ''));
    const chucVu = document.getElementById('chucvu').value;
    const gioLam = document.getElementById('gioLam').value;

    // Validate
    let errors = {};
    errors.tknv = validator.validationTNNV(taiKhoan);
    errors.name = validator.validateName(hoTen);
    errors.email = validator.validateEmail(email);
    errors.passWord = validator.validatePassword(matKhau);
    errors.datepicker = validator.validateDate(ngayLam);
    errors.luongCB = validator.validateLuongCB(luong);
    errors.chucvu = validator.validateChucVu(chucVu);
    errors.gioLam = validator.validateGioLam(gioLam);

    showError("tbTKNV", errors.tknv);
    showError("tbTen", errors.name);
    showError("tbEmail", errors.email);
    showError("tbMatKhau", errors.passWord);
    showError("tbNgay", errors.datepicker);
    showError("tbLuongCB", errors.luongCB);
    showError("tbChucVu", errors.chucvu);
    showError("tbGiolam", errors.gioLam);

    for (let error in errors) {
        const errorElement = document.getElementById(`tb${error.charAt(0).toUpperCase() + error.slice(1)}`);
        console.log(errorElement);  // Kiểm tra xem phần tử có tồn tại không
        if (errorElement) {
            // errorElement.classList.add('sp-thongbao');
            errorElement.style.display = 'inline'; // Hiển thị thông báo lỗi
        }
        
    }

    for (let error in errors) {
        if (errors[error]) {
            return null;
        }
    }



    const list = new nhanVien(taiKhoan, matKhau, hoTen, email, ngayLam, chucVu, luong, gioLam)

    return list 
}

const render = () => {
    const danhSachNhanVien = nhanVienServiceInstance.list;
    let htmlContent = '';

    danhSachNhanVien.forEach((item) => {
        htmlContent += `
        <tr>
            <td>${item.taiKhoan}</td>
            <td>${item.hoten}</td>
            <td>${item.email}</td>
            <td>${item.ngayLam}</td>
            <td>${item.chucVu}</td>
            <td>${item.tinhTongLuong()}</td>
            <td>${item.xepLoai()}</td>
            <td>
                <div class="modal-footer" id="modal-footer">
                    <button class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick="editNhanVien('${item.taiKhoan}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteNhanVien('${item.taiKhoan}')">Delete</button>
                </div>
            </td>
        </tr>
        `;
    });
    document.getElementById('tableDanhSach').innerHTML = htmlContent;
}

const saveToLocalStorage = () => {
    localStorage.setItem('danhSachNhanVien', JSON.stringify(nhanVienServiceInstance.danhSachNhanVien));
};

const loadFromLocalStorage = () =>{
    const data = localStorage.getItem('danhSachNhanVien');
    if(data){
        nhanVienServiceInstance.danhSachNhanVien = JSON.parse(data).map(item => new nhanVien(
            item.taiKhoan,
            item.matKhau,
            item.hoten,
            item.email,
            item.ngayLam,
            item.chucVu,
            item.tongLuong,
            item.gioLam
        ));
    }
};


document.addEventListener('DOMContentLoaded', () => {
    // Xử lý khi nhấn nút "Thêm nhân viên"
    document.getElementById('btnThem').onclick = () => {
        // Reset các ô input
        document.getElementById('tknv').value = '';
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('datepicker').value = '';
        document.getElementById('luongCB').value = '';
        document.getElementById('chucvu').value = 'Chọn chức vụ';
        document.getElementById('gioLam').value = '';
        
        // Hiển thị nút "Thêm nhân viên", ẩn nút "Cập nhật"
        document.getElementById('btnThemNV').style.display = 'block';
        document.getElementById('btnCapNhat').style.display = 'none';
    };

    // Xử lý khi nhấn nút "Thêm mới"
    document.getElementById('btnThemNV').onclick = (event) => {
        event.preventDefault();
        const nhanVien = layThongTinNhanVien();
        if (nhanVien) {
            nhanVienServiceInstance.addNhanVien(nhanVien);
            render();
            saveToLocalStorage();
            $('#myModal').modal('hide'); // Đóng modal
        }
    };

    // Xử lý khi nhấn nút "Cập nhật"
    document.getElementById('btnCapNhat').onclick = (event) => {
        event.preventDefault();
        const nhanVien = layThongTinNhanVien();
        if (nhanVien) {
            nhanVienServiceInstance.editNhanVien(nhanVien);
            render();
            saveToLocalStorage();
            $('#myModal').modal('hide'); // Đóng modal
        }
    };

    // Load dữ liệu từ LocalStorage khi trang được tải
    loadFromLocalStorage();
    render();
});  

window.editNhanVien = (taiKhoan) => {
    nhanVienToEdit = nhanVienServiceInstance.list.find(item => item.taiKhoan === taiKhoan);
    if (nhanVienToEdit) {
        document.getElementById('tknv').value = nhanVienToEdit.taiKhoan;
        document.getElementById('name').value = nhanVienToEdit.hoten;
        document.getElementById('email').value = nhanVienToEdit.email;
        document.getElementById('password').value = nhanVienToEdit.matKhau;
        document.getElementById('datepicker').value = nhanVienToEdit.ngayLam;
        document.getElementById('luongCB').value = nhanVienToEdit.tongLuong;
        document.getElementById('chucvu').value = nhanVienToEdit.chucVu;
        document.getElementById('gioLam').value = nhanVienToEdit.gioLam;

        // Hiển thị nút "Cập nhật", ẩn nút "Thêm nhân viên"
        document.getElementById('btnThemNV').style.display = 'none';
        document.getElementById('btnCapNhat').style.display = 'block';
    }
};


window.deleteNhanVien = (taiKhoan)=>{
    nhanVienServiceInstance.deleteNhanVien(taiKhoan);
    render()
    saveToLocalStorage();
}

document.getElementById('searchName').addEventListener('input',()=>{ 
    const loai = document.getElementById('searchName').value.trim();
    if(loai){
        renderNhanVienTheoLoai(loai);
    }
    else{
        render()
    }
})

const renderNhanVienTheoLoai = (loai)=>{
    const danhSachNhanVien = nhanVienServiceInstance.findNhanVienTheoLoai(loai);
    let htmlContent = '';
    if(danhSachNhanVien.length > 0){
        danhSachNhanVien.forEach((item)=>{
            htmlContent += `
        <tr>
            <td>${item.taiKhoan}</td>
            <td>${item.hoten}</td>
            <td>${item.email}</td>
            <td>${item.ngayLam}</td>
            <td>${item.chucVu}</td>
            <td>${item.tinhTongLuong()}</td>
            <td>${item.xepLoai()}</td>
            <td>
                <div class="button-container">
                    <button class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick="editNhanVien('${item.tknv}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteNhanVien('${item.tknv}')">Delete</button>
                </div>
            </td>
        </tr>
        `;
        })
    }else{
        htmlContent = `<tr><td colspan="7" class="text-center">Không tìm thấy nhân viên loại "${loai}"</td></tr>`; 
    }
    document.getElementById('tableDanhSach').innerHTML = htmlContent;
}