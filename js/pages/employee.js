$(document).ready(function() {
    initEvents();
})

/**
 * Tạo các sự hiện cho element
 * Author: DDHUNG (06/11/2022)
 */

function initEvents() {
    try {
    // 1. Nhấn close ẩn dialog thông báo
    $(".icon-close.btn__close").click(function (e) { 
        $(".model").hide();
        e.preventDefault();
    });
    // 2. Nhấn button thêm, hiển thị dialog thêm nhân viên
    $(".btn__add-new").click(function (e) { 
        $(".model").css("display", "flex");
        e.preventDefault();
    });
    
    // Nhấn button hủy ở dialog chi tiết nhân viên, ẩn dialog
    $(".btn-cancel").click(function (e) { 
        $(".model").hide();
        e.preventDefault();
    });

    // Nhấn close dialog thông báo
    $(".close-dialog").click(function (e) { 
        $(".dialog-notice").hide();
        e.preventDefault();
    });

    // Nhấn close toast
    $(".icon-close.close-notice").click(function (e) { 
        $(".notice-success").hide();
        e.preventDefault();
    });

    } catch (error) {
        console.log(error);
    }
}