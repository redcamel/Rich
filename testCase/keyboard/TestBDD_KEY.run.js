Rich.init(
    "../asset/cssPage.css"
).then(function() {
    var t0, i, j, k;
    var temp, temp2, root, subRoot;
    var type1, type2
    var make
////////////////////////////////////////////
//TODO: 너무더러우니 코드정리좀 -_-;
////////////////////////////////////////////
    make = function (parentBox, data) {
        i = data.length
        while (i--) {
            data[i] = data[i].split('_').reverse()
            j = data[i].length
            temp = Rich.Dom('div').S('<', parentBox, 'text-align', 'center')
            while (j--) {
                temp2 = Rich.Dom('button').S(
                    '@id', 'key_' + data[i][j],
                    'html', data[i][j].toUpperCase(),
                    'display', 'inline-block',
                    'width', 40, 'height', 40,
                    'border-radius', 4,
                    'font-size', 12,
                    'border-top', '1px solid #f5f5f5',
                    'box-shadow', 'inset 0 0 25px #e8e8e8, 0 1px 0 #c3c3c3, 0 2px 0 #c9c9c9, 0 2px 3px #333',
                    'margin', 4, 'background', '#eff0f2', '<', temp
                )
                if ('key_' + data[i][j] == 'key_space') temp2.S('width', 430)
                if ('key_' + data[i][j] == 'key_shift') temp2.S('width', 127)
                if (
                    'key_' + data[i][j] == 'key_alt' ||
                    'key_' + data[i][j] == 'key_altRight' ||
                    'key_' + data[i][j] == 'key_window' ||
                    'key_' + data[i][j] == 'key_control'
                ) temp2.S('width', 65)
                if (
                    'key_' + data[i][j] == 'key_windowRight' ||
                    'key_' + data[i][j] == 'key_controlRight'
                ) temp2.S('width', 100)
                if (
                    'key_' + data[i][j] == 'key_scrollLock' ||
                    'key_' + data[i][j] == 'key_pause' ||
                    'key_' + data[i][j] == 'key_insert' ||
                    'key_' + data[i][j] == 'key_home' ||
                    'key_' + data[i][j] == 'key_pageUp' ||
                    'key_' + data[i][j] == 'key_devare' ||
                    'key_' + data[i][j] == 'key_end' ||
                    'key_' + data[i][j] == 'key_pageDown' ||
                    ('key_' + data[i][j]).indexOf('key_num') > -1
                ) temp2.S('width', 80)
            }
        }
    }
    Rich.Dom('textArea').S('width', '90%', 'height', 150, 'margin-top', 30, 'margin-left', '5%', '<', 'body', '@placeHolder', '영문을 쳐보아라')
    Rich.Css('html,body').S('height', '100%', 'margin', '0px', 'padding', '0px')
    Rich.Css('button').S('outline', 'none', 'border', 0, 'margin', 1, 'background', 'transparent', 'margin', 0)
    Rich.Css('.keyCode').S('display', 'inline-block', 'background', '#593971', 'padding', 8, 'border-radius', 3, 'margin', 3)
    root = Rich.Dom('button').S('<', 'body', 'width', '100%', 'margin-top', 30)
    subRoot = Rich.Dom('button').S('<', 'body', 'width', '100%', 'margin-top', 30)
    make(root,
        ("" +
            "esc__" +
            "`_1_2_3_4_5_6_7_8_9_0_-_=_\\_back__" +
            "tab_q_w_e_r_t_y_u_i_o_p_[_]__" +
            "caps_a_s_d_f_g_h_j_k_l_;_'_enter__" +
            "shift_z_x_c_v_b_n_m_,_._/__" +
            "control_window_alt_space_altRight_windowRight_controlRight"
        ).split('__').reverse()
    )

    make(Rich.Dom('button').S('width', '50%', '<', subRoot),
        ("" +
            "scrollLock_pause__" +
            "insert_home_pageUp__" +
            "devare_end_pageDown__" +
            "up__" +
            "left_down_right").split('__').reverse()
    )
    make(Rich.Dom('button').S('width', '50%', '<', subRoot),
        ("" +
            "numLock_numPad/_numPad*_numPad-__" +
            "numPad7_numPad8_numPad9_numPad+__" +
            "numPad4_numPad5_numPad6__" +
            "numPad1_numPad2_numPad3__" +
            "numPad0_numPad.").split('__').reverse()
    )
    temp = Rich.Dom('div').S('<', 'body', 'text-align', 'center', 'margin-top', 30, 'left', '5%', 'right', '5%')
    temp.S('html', '지원키 목록')
    temp.S(
        '>', type1 = Rich.Dom('div').S('padding', 5, 'margin-bottom', 5),
        '>', type2 = Rich.Dom('div').S('padding', 5)
    )
    var tList = []
    for (k in Rich.KEY.name2code) {
        tList.push(k)

    }
    tList.sort()
    tList.forEach(function (v) {
        if (v.length == 1) type1.S('>', Rich.Dom('div').S('html', v, '@className', 'keyCode'))
        else type2.S('>', Rich.Dom('div').S('html', v, '@className', 'keyCode'))
    })
    Rich.LOOPER.addMainLoop('keyTest', (function () {
        var k
        return function () {
            for (k in Rich.KEY.downList) {

                if (Rich.KEY.downList[k]) document.getElementById('key_' + k).style.background = '#ccc'
            }
            for (k in Rich.KEY.upList) {

                if (Rich.KEY.upList[k]) document.getElementById('key_' + k).style.background = 'white'
            }
        }
    })())
})