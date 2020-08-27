//css .slide_wrap>.slide_img 에 transtion: 0.4s; 추가
//js jquery-visible-min 추가
//html <div class="slide_btn"> 안에 a태그 div로 변경
//css .slide_btn>a -> .slide_btn>div 로 변경
//css .no-drag 추가
//html <div class="slide_btn"> -> <div class="slide_btn no-drag"> 로 변경
//membership_slide>ul li요소 순서 바꿈
//html .sub_left .sub_clicked .sub_right 제거
//css addtion_text opacity 0 줌
//css sub_clicked > addtion_textopacity: 1; transition: 0.4s; 줌
//html <div class="top_text">sdc</div> membership -> <div class="slide_title"><div class="top_text">sdc</div> membership</div> slide_title로 감쌈
//css .sub_clicked > .slide_title > .top_text{padding: 0; display: inline;} 추가
//<div class="membership_card"> 내부요소 순서 수정
//css .membership_card > div > div 등 여러 코드 추가
//html <div class="membership_information"> 내부 변경 및 추가
//html .membership_information > .info_writing_box 추가
//css .membership_information > .info_writing_box > .info_writing 등 여러 코드 추가
//css next prev 에 no-drag추가
//html .pic_btn 내부 요소 순서 바꿈
// css .photos>div:nth-child(6) 관련 이벤트 .photos>.select_photo>img 로 옮김
//html <div class="slide_img"></div> 하나 더 추가
//css .slide_wrap>.slide_img:nth-child(6) 추가

$(document).ready(function () { ready_event() })
$(document).on("click", ".slide_navi > div", function () { main_click_event($('.slide_navi > div').index(this) + 1) });
$(document).on("click", ".slide_btn > div", function () { member_direction_control($('.slide_btn > div').index(this)) });
$(document).on("click", ".pic_btn > div", function () { photos_direction_control($('.pic_btn > div').index(this)) });
$(document).on("click", ".news-count > span", function () { news_direction_control($('.news-count > span').index(this)) });
var view_slide_img = 1
var bar_nth = 1
var loading_for
var bar_gauge = 0;

//side menu
$(document).scroll(function () {
    const target = document.getElementById('target'); // 요소의 id 값이 target이라 가정
    const clientRect = target.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
    const relativeTop = clientRect.top; // Viewport의 시작지점을 기준으로한 상대좌표 Y 값.
    // console.log(relativeTop)
    if (relativeTop<=10) {
        $('.side-tab').css({ 'left': '0' })
    } else {
        $('.side-tab').css({ 'left': '-100%' })
    }
})
function getCurrentScrollPercentage(){
    // window.scrollY//스크롤된값
    // window.innerHeight//현재 보여지는 높이
    // document.body.clientHeight//전체 높이
    return ( window.innerHeight + window.scrollY) / document.body.clientHeight * 100
}
//slide_img + white bar
function ready_event() {
    member_card_view_control()
    white_bar()
    member_card_event_control()
    $('.photos>div:nth-child(6)').attr('class', 'select_photo')
    $(".citizenship_card").css({ 'opacity': '1' })
}

function white_bar() {
    bar_gauge = 0;
    loading_for = setInterval(() => {
        bar_gauge += 0.08;
        $('.repeat_bar > div').css({ 'background-color': 'white', 'width': `${bar_gauge}%` })
        if (bar_gauge >= 100) {
            bar_gauge = 0
            bar_nth = (bar_nth % 5) + 1
            main_click_event(bar_nth)
        }
    }, 1);
}

function main_click_event(select_bar) {
    main_bar_Emphasis(select_bar)
    $(`.slide_img:nth-child(${select_bar})`).css({ 'opacity': '1'})
    $(`.slide_img:nth-child(6)`).css({'background-image':`url(./img/bg_main_banner_${select_bar}.jpg)`})//뒷배경 하나 더 깔아서 깔쌈하게
    if (select_bar != view_slide_img){
        $(`.slide_img:nth-child(${view_slide_img})`).css({'opacity': '0'})
        bar_nth = select_bar
        white_bar()
    }   
    view_slide_img = select_bar
    clearTimeout(loading_for)    
}

function main_bar_Emphasis(select_bar) {
    $(`.slide_navi>div:nth-child(${select_bar})`).css({ 'background': '#111', 'height': '160px' })
    if (select_bar != view_slide_img)
        $(`.slide_navi>div:nth-child(${view_slide_img})`).css({ 'background': '#333', 'height': '100px' })
}

//card events
var member_arr = [0, 1, 2]
var select_member = member_arr[1];
function select_member_func() {
    select_member = member_arr[1];
}

function card_event(event_number) {//카드 한장있는건 안움직여
    if (event_number != 2) {
        $(".membership_card > .view_card>div:nth-child(1)").css({ 'left': '0' })
        $(".membership_card > .view_card>div:nth-child(3)").css({ 'right': '0' })
    }
}

var view_time
function member_card_event_control() {
    view_time = 0

    const view_time_cheak = setInterval(() => {
        view_time += 0.1
        // if (!$(".citizenship_card").visible()) {
        //     clearTimeout(view_time_cheak)
        //     member_card_event_control()
        // }삭제
        if (view_time >= 0.9) {
            // console.log("카드 펼쳐짐")
            card_event(select_member)

            clearTimeout(view_time_cheak)
            view_time = 0;
            member_card_event_control()
        }
    }, 100)
}

function member_direction_control(direction) {

    $(".vip_card:nth-child(1)").css({ 'left': 'calc(100%/5)' })
    $(".vip_card:nth-child(3)").css({ 'right': 'calc(100%/5)' })
    $(".citizenship_card:nth-child(1)").css({ 'left': 'calc(100%/5)' })
    $(".citizenship_card:nth-child(3)").css({ 'right': 'calc(100%/5)' })
    if (direction == 0) {
        //[0,1,2] - > [1,2,0]
        for (var i = 0; i < member_arr.length; i++) {
            member_arr[i] = (member_arr[i] + 1) % 3
        }
    } else {
        //[0,1,2] - > [2,0,1]
        for (var i = 0; i < member_arr.length; i++) {
            member_arr[i] = member_arr[i] - 1 == -1 ? 2 : member_arr[i] - 1;
        }
    }
    // console.log(member_arr)
    view_time = 0;
    member_card_view_control()
    select_member_func()//select_member 재정의
}

function member_card_view_control() {
    member_card_view_title()
    member_card_view_card()
    info_writing_view_control()
}

function member_card_view_title() {
    $(`.membership_slide>ul>li:nth-child(${member_arr[0] + 1})>div`).attr('class', 'slide_name sub_left')
    $(`.membership_slide>ul>li:nth-child(${member_arr[1] + 1})>div`).attr('class', 'slide_name sub_clicked')
    $(`.membership_slide>ul>li:nth-child(${member_arr[1] + 1})>div>.slide_title`).css({ 'opacity': '0' })        //clicked될때 부드러운 효과 동시에 겹치는건 못해먹것다
    $(`.membership_slide>ul>li:nth-child(${member_arr[1] + 1})>div>.slide_title`).stop().animate({ 'opacity': '1' }, 200)
    $(`.membership_slide>ul>li:nth-child(${member_arr[2] + 1})>div`).attr('class', 'slide_name sub_right')
}

function member_card_view_card() {//카드 순서에 따른 효과(class) 부여
    $(`.membership_card>div:nth-child(${member_arr[0] + 1})`).attr('class', '')
    $(`.membership_card>div:nth-child(${member_arr[1] + 1})`).attr('class', 'view_card')
    $(`.membership_card>div:nth-child(${member_arr[2] + 1})`).attr('class', '')
}
function info_writing_view_control() {//info_writing제어
    $(`.membership_information>.info_writing_box>.info_writing:nth-child(${member_arr[0] + 1})`).attr('class', 'info_writing')
    $(`.membership_information>.info_writing_box>.info_writing:nth-child(${member_arr[1] + 1})`).attr('class', 'info_writing view_writing')
    $(`.membership_information>.info_writing_box>.info_writing:nth-child(${member_arr[2] + 1})`).attr('class', 'info_writing')
}

//스페셜 이벤트ㅡㅡㅡㅡㅡㅡ
var click_chack = 0
function photos_direction_control(direction) {
    if (direction == 0 && click_chack == 0) {
        click_chack = 1
        $('.photos').stop().animate({ 'left': '460px' }, 200)
        $('.photos>div:nth-child(5)').attr('class', 'select_photo')
        $('.photos>div:nth-child(6)').attr('class', '')
        setTimeout(function () {
            $('.photos>div:nth-child(11)').insertBefore('.photos>div:nth-child(1)')
            $('.photos').stop().css({ 'left': '0' })
            // console.log(click_chack)
            click_chack = 0;
        }, 200)
    } else if (direction == 1 && click_chack == 0) {
        click_chack = 1
        $('.photos').stop().animate({ 'left': '-460px' }, 200)
        $('.photos>div:nth-child(7)').attr('class', 'select_photo')
        $('.photos>div:nth-child(6)').attr('class', '')
        setTimeout(function () {
            $('.photos>div:nth-child(1)').insertAfter('.photos>div:nth-child(11)')
            $('.photos').stop().css({ 'left': '0' })
            // console.log(click_chack)
            click_chack = 0;
        }, 200)
    }
}

// NEWS
var news_cnt = 1
function news_direction_control(direction){
    if (direction == 0) {
        news_cnt = news_cnt-1 == 0 ? 3 : news_cnt-1
    } else {
        news_cnt = news_cnt+1 == 4 ? 1 : news_cnt+1
    }
    news_count()
    news_change()
}
function news_count(){
    $('.news_num').text(`0${news_cnt} / 03`)
}
function news_change(){
    // news-slide
    $(`.news-slide>div`).css({'opacity':'0'});
    $(`.news-slide>div:nth-child(${news_cnt})`).css({'opacity':'1'});
}

