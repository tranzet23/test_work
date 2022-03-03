

    $(".wrapper .tab").click(function() {
        $(".wrapper .tab").removeClass("active").eq($(this).index()).addClass("active");
        $(".content-item").hide().eq($(this).index()).fadeIn()
    }).eq(0).addClass("active");


//helpful slider

$('.helpful__slider-inner').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: $('.slick-prev'),
    nextArrow: $(".slick-next"),
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true
            },

        },
    ],

});

//services slider
$('.services__slider-inner').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
],
});


//hero slider
$('.hero__slider-inner').slick({
    dots: true,
    arrows: false,
    vertical : true
});

//advantages slider

$('.advantages__slider--inner').slick({
    arrows: false,
    dots: true,
});

// upload files

document.addEventListener("DOMContentLoaded", init, false);
var AttachmentArray = [];
var arrCounter = 0;
var filesCounterAlertStatus = false;
var ul = document.createElement("ul");
ul.className = "thumb-Images";
ul.id = "imgList";

function init() {
    document
        .querySelector("#files")
        .addEventListener("change", handleFileSelect, false);
}

function handleFileSelect(e) {
    if (!e.target.files) return;
    var files = e.target.files;
    for (var i = 0, f; (f = files[i]); i++) {
        var fileReader = new FileReader();
        fileReader.onload = (function(readerEvt) {
            return function(e) {
                ApplyFileValidationRules(readerEvt);
                RenderThumbnail(e, readerEvt);
                FillAttachmentArray(e, readerEvt);
            };
        })(f);
        fileReader.readAsDataURL(f);
    }
    document
        .getElementById("files")
        .addEventListener("change", handleFileSelect, false);
}

jQuery(function($) {
    $("div").on("click", ".img-wrap .close", function() {
        var id = $(this)
            .closest(".img-wrap")
            .find("img")
            .data("id");

        var elementPos = AttachmentArray.map(function(x) {
            return x.FileName;
        }).indexOf(id);
        if (elementPos !== -1) {
            AttachmentArray.splice(elementPos, 1);
        }

        $(this)
            .parent()
            .find("img")
            .not()
            .remove();

        $(this)
            .parent()
            .find("div")
            .not()
            .remove();

        $(this)
            .parent()
            .parent()
            .find("div")
            .not()
            .remove();

        var lis = document.querySelectorAll("#imgList li");
        for (var i = 0; (li = lis[i]); i++) {
            if (li.innerHTML == "") {
                li.parentNode.removeChild(li);
            }
        }
    });
});

function ApplyFileValidationRules(readerEvt) {
    if (CheckFileType(readerEvt.type) == false) {
        alert(
            "Этот файл(" +
            readerEvt.name +
            ") не имеет подходящий формат, вы можете загрузить файлы только в формате jpg/png/jpeg"
        );
        e.preventDefault();
        return;
    }

    if (CheckFileSize(readerEvt.size) == false) {
        alert(
            "Файл (" +
            readerEvt.name +
            ") Размер каждой фотографии не должен превышать 2 Мбайт."
        );
        e.preventDefault();
        return;
    }


    if (CheckFilesCount(AttachmentArray) == false) {
        if (!filesCounterAlertStatus) {
            filesCounterAlertStatus = true;
            alert(
                "Вы можете загрузить максимум 5 изображений"
            );
        }
        e.preventDefault();
        return;
    }
}


function CheckFileType(fileType) {
    if (fileType == "image/jpeg") {
        return true;
    } else if (fileType == "image/png") {
        return true;
    } else if (fileType == "image/jpg") {
        return true;
    } else {
        return false;
    }
    return true;
}


function CheckFileSize(fileSize) {
    if (fileSize < 2000000) {
        return true;
    } else {
        return false;
    }
    return true;
}

function CheckFilesCount(AttachmentArray) {
    var len = 0;
    for (var i = 0; i < AttachmentArray.length; i++) {
        if (AttachmentArray[i] !== undefined) {
            len++;
        }
    }

    if (len > 5) {
        return false;
    } else {
        return true;
    }
}


function RenderThumbnail(e, readerEvt) {
    var li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = [
        '<div class="img-wrap"> <span class="close">&times;</span>' +
        '<img class="thumb" src="',
        e.target.result,
        '" title="',
        escape(readerEvt.name),
        '" data-id="',
        readerEvt.name,
        '"/>' + "</div>"
    ].join("");

    var div = document.createElement("div");
    div.className = "FileNameCaptionStyle";
    li.appendChild(div);
    div.innerHTML = [readerEvt.name].join("");
    document.getElementById("Filelist").insertBefore(ul, null);
}

function FillAttachmentArray(e, readerEvt) {
    AttachmentArray[arrCounter] = {
        AttachmentType: 1,
        ObjectType: 1,
        FileName: readerEvt.name,
        FileDescription: "Attachment",
        NoteText: "",
        MimeType: readerEvt.type,
        Content: e.target.result.split("base64,")[1],
        FileSizeInBytes: readerEvt.size
    };
    arrCounter = arrCounter + 1;
}


// accordion tabs_page

    $(function() {

        //BEGIN
        $(".accordion__title").on("click", function(e) {

            e.preventDefault();
            var $this = $(this);

            if (!$this.hasClass("accordion-active")) {
                $(".accordion__content").slideUp(400);
                $(".accordion__title").removeClass("accordion-active");
                $('.accordion__arrow').removeClass('accordion__rotate');
            }

            $this.toggleClass("accordion-active");
            $this.next().slideToggle();
            $('.accordion__arrow',this).toggleClass('accordion__rotate');
        });
        //END

    });



    // Validate form
    function validateForms(form){
        $('.form__main').validate({
            rules:{
                name: {
                    required: true,
                    minlength: 2
                },
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста введите своё имя",
                    minlength: jQuery.validator.format("Введите {0} символов!")
                },
                phone: 'Пожалуйста введите свой номер телефон',
                email: {
                    required: "Пожалуйста введите свою почту",
                    email: "Неправильно введен адрес почты name@domain.com"
                }
            }
        });
    }
    validateForms('.form__main');



    if ($(window).width() < 768) {
        $('.wrapper__tabs').remove();

    } else {
        // код для окна больше 960
    }