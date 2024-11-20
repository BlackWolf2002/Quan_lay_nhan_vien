export class nhanVienServices {
    list = []
    constructor(){}
    addNhanVien(nhanVien){
        this.list.push(nhanVien)
    }

    editNhanVien(nhanVien){
        const index = this.list.findIndex((item)=> item.taiKhoan === nhanVien.taiKhoan)
        if(index !== -1){
            this.list[index] = nhanVien;
        }
    }

    deleteNhanVien(taiKhoan){
        const index = this.list.findIndex((item)=>item.taiKhoan === taiKhoan)
        if(index !== -1){
            this.list.splice(index,1)
        }
    }

    findNhanVienTheoLoai(loai){
        return this.list.filter((item)=>item.xepLoai() === loai) 
    }
}