import gs.TweenLite;

class AsFlipPage extends MovieClip
{
    var _width, _height, stage_mc, stage_w, stage_h, pax, pay, pbx, pby, pcx, pcy, pdx, pdy, pex, pey, pfx, pfy, fullscreen_b, HighModeSetting_object, setContextMenuFun_b, if_net_loading_b, Register_user, attachMovie, logo_test_txt, book_mc, on_mc, on_page_v, bottom_shadow_b, shadow_bottom2, shadow_bottom1, page_side_b, page_side1_mc, page_side2_mc, all_page_v, on_loading_page_n, OneTimeLoadingPages, createEmptyMovieClip, load_page_title_array, on_LoadingPar_n, drag_area, triangle, flip_mc, next_triangle, next_mc, on_triangle, hit_area_object, _ymouse, _xmouse, stop_time_si, FlipOnRelease_b, press_xmouse, press_ymouse, CueHitArea, onEnterFrame, flip_win, aim_x, aim_y, BufferCoefficient, end_filp_distance_v, removeMovieClip, if_auto_filp, StartFilpInclineX, StartFilpInclineY, go_to_page_v, bg_sound_array, bg_sound_v, bg_sound, bg_sound_position, shadow_b, shadow1_mc, shadow2_mc, shadow3_mc, mask1_shadow, mask2_shadow, mask3_shadow, shadow_alpha_v, auto_filp_time, page_title_array, so_gl, local_stop_time_si, filp_sound_str, filping_sound, list_page_v, events_fun_object, _parent, my_pj, _root_empiremue, empiremue, menu, exit_mc_str, if_set_local, _x, _y, FlipOnKeyUpDown_b, onKeyUp, onKeyDown, FlipKey_object;
    function AsFlipPage () {
        super();
        init();
    }
    function init() {
        super.init();
        var _local3 = _width;
        var _local4 = _height;
        _width = 746;
        _height = 535;
        stage_mc._x = 0;
        stage_mc._y = 0;
        stage_w = (stage_mc._width = _local3);
        stage_h = (stage_mc._height = _local4);
        pax = stage_mc._x;
        pay = stage_mc._y;
        pbx = stage_mc._x;
        pby = stage_mc._y + stage_h;
        pcx = stage_mc._x + (stage_w / 2);
        pcy = stage_mc._y;
        pdx = stage_mc._x + (stage_w / 2);
        pdy = stage_mc._y + stage_h;
        pex = stage_mc._x + stage_w;
        pey = stage_mc._y;
        pfx = stage_mc._x + stage_w;
        pfy = stage_mc._y + stage_h;
        setFullscreenFun(fullscreen_b);
        stage_mc._visible = false;
        if ((HighModeSetting_object.RightBottomShadowMC == "default") || (HighModeSetting_object.RightBottomShadowMC == "")) {
            HighModeSetting_object.RightBottomShadowMC = "shadow_bottom1";
        }
        if ((HighModeSetting_object.LeftBottomShadowMC == "default") || (HighModeSetting_object.LeftBottomShadowMC == "")) {
            HighModeSetting_object.LeftBottomShadowMC = "shadow_bottom2";
        }
        if ((HighModeSetting_object.RightPageSideMC == "default") || (HighModeSetting_object.RightPageSideMC == "")) {
            HighModeSetting_object.RightPageSideMC = "page_side1_mc";
        }
        if ((HighModeSetting_object.LeftPageSideMC == "default") || (HighModeSetting_object.LeftPageSideMC == "")) {
            HighModeSetting_object.LeftPageSideMC = "page_side2_mc";
        }
        if ((HighModeSetting_object.FlipShadowMC1 == "default") || (HighModeSetting_object.FlipShadowMC1 == "")) {
            HighModeSetting_object.FlipShadowMC1 = "shadow1_mc";
        }
        if ((HighModeSetting_object.FlipShadowMC2 == "default") || (HighModeSetting_object.FlipShadowMC2 == "")) {
            HighModeSetting_object.FlipShadowMC2 = "shadow2_mc";
        }
        init_copy_mc_fun();
        remove_flip_next_page_fun();
        getLocalFun();
        FlipOnKeyUpDown_fun();
        _root_setContextMenuFun();
        if (setContextMenuFun_b) {
            setContextMenuFun();
        }
        if (if_net_loading_b) {
            ahead_loading_pages_fun();
        }
    }
    function init_copy_mc_fun() {
        Register_user = _SN;
        Register_ed = true;/*
        this.attachMovie("logo_test_txt", "logo_test_txt", 9998);
        logo_test_txt._x = pcx;
        logo_test_txt._y = pcy + (stage_h / 2);*/
        this.attachMovie(book_mc, "on_mc", 90);
        on_mc.gotoAndStop(on_page_v);
        on_mc._x = pcx;
        on_mc._y = pcy;
        on_mc_MovieClipLoader_fun(on_mc);
        if (bottom_shadow_b) {
            this.attachMovie(HighModeSetting_object.RightBottomShadowMC, "shadow_bottom1", 10);
            this.attachMovie(HighModeSetting_object.LeftBottomShadowMC, "shadow_bottom2", 20);
            shadow_bottom1._x = (shadow_bottom2._x = pcx);
            shadow_bottom1._y = (shadow_bottom2._y = pcy);
            shadow_bottom1._width = (shadow_bottom2._width = (stage_w / 2) + 10);
            shadow_bottom1._height = (shadow_bottom2._height = stage_h + 10);
        }
        if (page_side_b) {
            this.attachMovie(HighModeSetting_object.RightPageSideMC, "page_side1_mc", 30);
            this.attachMovie(HighModeSetting_object.LeftPageSideMC, "page_side2_mc", 40);
            page_side1_mc._x = pex;
            page_side1_mc._y = pey;
            page_side2_mc._x = pax;
            page_side2_mc._y = pay;
            page_side1_mc._height = (page_side2_mc._height = stage_h);
        }
    }
    function ahead_loading_pages_fun() {
        var _local2 = 0;
        while (_local2 < all_page_v) {
            loading_page_array[_local2] = 0;
            loading_page_number_array[_local2] = 0;
            _local2++;
        }
        on_loading_page_n = 1;
        if (OneTimeLoadingPages > 5) {
            OneTimeLoadingPages = 5;
        }
        _local2 = 1;
        while (_local2 <= OneTimeLoadingPages) {
            this.createEmptyMovieClip("loading_pages_mc" + _local2, 994 + _local2);
            this["loading_pages_mc" + _local2]._x = -9999;
            this["loading_pages_mc" + _local2].v = _local2;
            this["mclListener" + _local2] = new Object ();
            this["mclListener" + _local2].onLoadInit = function (target_mc) {
                target_mc._x = -9999;
                var _local2 = target_mc._name.substr(-1);
                var _local3 = target_mc._parent.loading_page_number_array[_local2 - 1];
                target_mc._parent.loading_page_array[_local3 - 1] = _local3;
                target_mc._parent.load_next_pages_fun(_local2);
                target_mc._parent.OnLoadingPages();
            };
            this["mclListener" + _local2].onLoadError = function (target_mc, errorCode, httpStatus) {
                target_mc._x = -9999;
                var _local2 = target_mc._name.substr(-1);
                var _local3 = target_mc._parent.loading_page_number_array[_local2 - 1];
                target_mc._parent.loading_page_array[_local3 - 1] = -1;
                target_mc._parent.load_next_pages_fun(_local2);
                target_mc._parent.OnLoadingPages();
            };
            this["mclListener" + _local2].onLoadProgress = function (target_mc, bytesLoaded, bytesTotal) {
                target_mc._x = -9999;
                var _local4 = int ((bytesLoaded / bytesTotal) * 100);
                var _local2 = target_mc._name.substr(-1);
                var _local3 = target_mc._parent.loading_page_number_array[_local2 - 1];
                target_mc._parent.loading_page_array[_local3 - 1] = _local4 / 100;
                target_mc._parent.OnLoadingPages();
            };
            this["load_pages_mcl" + _local2] = new MovieClipLoader ();
            this["load_pages_mcl" + _local2].addListener(this["mclListener" + _local2]);
            load_next_pages_fun(_local2);
            _local2++;
        }
    }
    function load_next_pages_fun(v) {
        var _local2 = if_load_pages_fun();
        if (_local2 != false) {
            var _local3 = load_page_title_array[_local2 - 1];
            if (((_local3.length > 4) && (_local3 != undefined)) && (_local3 != null)) {
                this["load_pages_mcl" + v].loadClip(_local3, this["loading_pages_mc" + v]);
                loading_page_number_array[v - 1] = _local2;
            } else {
                loading_page_array[_local2 - 1] = -1;
                OnLoadingPages();
                load_next_pages_fun(v);
             }
        } else {
            unloadClip_fun();
         }
    }
    function if_load_pages_fun() {
        var _local2 = 0;
        while (_local2 < loading_page_array.length) {
            if (((loading_page_array[_local2] >= 0) && (loading_page_array[_local2] < 1)) && if_loading_pages_fun(_local2 + 1)) {
                return (_local2 + 1);
            }
            _local2++;
        }
        return (false);
    }
    function if_loading_pages_fun(v) {
        var _local2 = 1;
        while (_local2 <= OneTimeLoadingPages) {
            if (loading_page_number_array[_local2 - 1] == v) {
                return (false);
            }
            _local2++;
        }
        return (true);
    }
    function unloadClip_fun() {
        var _local2 = 0;
        while (_local2 < loading_page_array.length) {
            if ((loading_page_array[_local2] >= 0) && (loading_page_array[_local2] < 1)) {
                return (false);
            }
            _local2++;
        }
        _local2 = 1;
        while (_local2 <= OneTimeLoadingPages) {
            this["load_pages_mcl" + _local2].unloadClip(this["loading_pages_mc" + _local2]);
            _local2++;
        }
    }
    function on_mc_MovieClipLoader_fun(_mc) {
        on_LoadingPar_n = 0;
        _mc.Loader_mc.removeMovieClip(this);
        var _local3 = load_page_title_array[on_page_v - 1];
        if ((_local3.length > 3) && (_local3 != undefined)) {
            _mc.createEmptyMovieClip("Loader_mc", 100);
            _mc.Loader_mc._x = (-stage_w) / 2;
            _mc.Loader_mc._y = 0;
            _mc._mcl = new MovieClipLoader ();
            _mc._Listener = new Object ();
            _mc._Listener.onLoadStart = function (target_mc) {
                target_mc._x = (-target_mc._parent._parent.stage_w) / 2;
                target_mc._y = 0;
            };
            _mc._Listener.onLoadComplete = function (target_mc) {
                target_mc._x = (-target_mc._parent._parent.stage_w) / 2;
                target_mc._y = 0;
            };
            _mc._Listener.onLoadProgress = function (target_mc, bytesLoaded, bytesTotal) {
                target_mc._x = (-target_mc._parent._parent.stage_w) / 2;
                target_mc._y = 0;
                var _local2 = int ((bytesLoaded / bytesTotal) * 100) / 100;
                target_mc._parent._parent.on_LoadingPar_n = _local2;
            };
            _mc._Listener.onLoadInit = function (target_mc) {
                target_mc._x = (-target_mc._parent._parent.stage_w) / 2;
                target_mc._y = 0;
                target_mc._parent._parent.on_LoadingPar_n = 1;
                /*  
                 * modified by onenature. 2008-3-14
                 * add fadein effect
                 * * modify at 200-812-22
                 * *   use TweenLite create fadein effect
                 */
				target_mc._alpha = 0;
				TweenLite.to(target_mc, 0.4, {_alpha:100});
            };
            _mc._mcl.addListener(_mc._Listener);
            _mc._mcl.loadClip(_local3, _mc.Loader_mc);
        }
    }
    function getPlayingPar() {
        var _local4 = on_mc.Loader_mc._currentframe;
        var _local3 = on_mc.Loader_mc._totalframes;
        var _local2 = int ((_local4 / _local3) * 100) / 100;
        return (_local2);
    }
    function getLoadingPar() {
        return (on_LoadingPar_n);
    }
    function set_mc_color_fun(mc, c) {
        if (c.length > 2) {
            var _local2 = Number (c);
            var _local1 = Math.floor((_local2 / 256) / 256);
            var _local3 = Math.floor((_local2 - ((_local1 * 256) * 256)) / 256);
            var _local6 = Math.floor(((_local2 - ((_local1 * 256) * 256)) / 256) - (_local3 * 256));
            var _local5 = new Color (mc);
            var _local4 = new Object ();
            _local4 = {ra:"100", rb:_local1, ga:"100", gb:_local3, ba:"100", bb:_local6, aa:"100", ab:"0"};
            _local5.setTransform(_local4);
        }
    }
    function getDist(px1, py1, px2, py2) {
        var _local1 = px2 - px1;
        var _local2 = py2 - py1;
        var _local3 = Math.sqrt(Math.pow(_local1, 2) + Math.pow(_local2, 2));
        return (_local3);
    }
    function getAngle(px1, py1, px2, py2) {
        var _local2 = px2 - px1;
        var _local3 = py2 - py1;
        var _local6 = Math.sqrt(Math.pow(_local2, 2) + Math.pow(_local3, 2));
        var _local5 = _local2 / _local6;
        var _local4 = Math.acos(_local5);
        var _local1 = 180 / (Math.PI / _local4);
        if (_local3 < 0) {
            _local1 = -_local1;
        } else if ((_local3 == 0) && (_local2 < 0)) {
            _local1 = 180;
        }
        return (_local1);
    }
    function point_xy_arry_fun() {
        switch (drag_area) {
            case 1 : 
                var _local2 = getDist(pfx, pfy, point_xy_arry[0].x, point_xy_arry[0].y) / 2;
                var _local3 = (pfx - point_xy_arry[0].x) / 2;
                point_xy_arry[1].x = pfx - ((_local2 * _local2) / _local3);
                point_xy_arry[1].y = pfy;
                if (point_xy_arry[1].x < pdx) {
                    point_xy_arry[1].x = pdx;
                    point_xy_arry[1].y = pdy;
                    var _local14 = pdx + (((point_xy_arry[0].x - pdx) * (stage_w / 2)) / getDist(pdx, pdy, point_xy_arry[0].x, point_xy_arry[0].y));
                    var _local16 = pdy + ((((point_xy_arry[0].y - pdy) * stage_w) / 2) / getDist(pdx, pdy, point_xy_arry[0].x, point_xy_arry[0].y));
                    point_xy_arry[0].x = _local14;
                    point_xy_arry[0].y = _local16;
                    _local2 = getDist(pfx, pfy, point_xy_arry[0].x, point_xy_arry[0].y) / 2;
                }
                _local3 = (pfy - point_xy_arry[0].y) / 2;
                var _local6 = (_local2 * _local2) / _local3;
                point_xy_arry[2].x = pfx;
                point_xy_arry[2].y = pfy - _local6;
                if ((point_xy_arry[2].y < pey) || (point_xy_arry[0].y > pfy)) {
                    var _local4 = pex - (((pfx - point_xy_arry[1].x) * (pey - point_xy_arry[2].y)) / _local6);
                    var _local5 = pey;
                    if (_local4 < pcx) {
                        _local4 = pcx;
                        var _local12 = Math.atan2(point_xy_arry[0].y - pcy, point_xy_arry[0].x - pcx);
                        var _local11 = Math.acos((stage_w / 2) / getDist(pcx, pcy, point_xy_arry[0].x, point_xy_arry[0].y));
                        var _local7 = _local12 - _local11;
                        var _local8 = pcx + ((stage_w / 2) * Math.cos(_local7));
                        var _local9 = pcy + ((stage_w / 2) * Math.sin(_local7));
                        var _local10 = (stage_h / Math.sqrt(Math.pow(getDist(pcx, pcy, point_xy_arry[0].x, point_xy_arry[0].y), 2) - Math.pow(stage_w / 2, 2))) * 0.999;
                        var _local15 = _local8 + ((point_xy_arry[0].x - _local8) * _local10);
                        var _local17 = _local9 + ((point_xy_arry[0].y - _local9) * _local10);
                        point_xy_arry[0].x = _local15;
                        point_xy_arry[0].y = _local17;
                        point_xy_arry_fun();
                        return (undefined);
                    }
                    var _local13 = getDist(point_xy_arry[2].x, point_xy_arry[2].y, _local4, _local5);
                    _local2 = ((pex - _local4) * (pey - point_xy_arry[2].y)) / _local13;
                    _local3 = (_local2 * _local2) / (pex - _local4);
                    point_xy_arry[3].x = pex - (_local3 * 2);
                    _local3 = (_local2 * _local2) / (pey - point_xy_arry[2].y);
                    point_xy_arry[3].y = pey - (_local3 * 2);
                    point_xy_arry[2].x = _local4;
                    point_xy_arry[2].y = _local5;
                } else {
                    point_xy_arry[3].x = point_xy_arry[2].x;
                    point_xy_arry[3].y = point_xy_arry[2].y;
                 }
                break;
            case 2 : 
                var _local2 = getDist(pbx, pby, point_xy_arry[0].x, point_xy_arry[0].y) / 2;
                var _local3 = (point_xy_arry[0].x - pbx) / 2;
                point_xy_arry[1].x = pbx + ((_local2 * _local2) / _local3);
                point_xy_arry[1].y = pby;
                if (point_xy_arry[1].x > pdx) {
                    point_xy_arry[1].x = pdx;
                    point_xy_arry[1].y = pdy;
                    var _local14 = pdx + (((point_xy_arry[0].x - pdx) * (stage_w / 2)) / getDist(pdx, pdy, point_xy_arry[0].x, point_xy_arry[0].y));
                    var _local16 = pdy + ((((point_xy_arry[0].y - pdy) * stage_w) / 2) / getDist(pdx, pdy, point_xy_arry[0].x, point_xy_arry[0].y));
                    point_xy_arry[0].x = _local14;
                    point_xy_arry[0].y = _local16;
                    _local2 = getDist(pbx, pby, point_xy_arry[0].x, point_xy_arry[0].y) / 2;
                }
                _local3 = (pby - point_xy_arry[0].y) / 2;
                var _local6 = (_local2 * _local2) / _local3;
                point_xy_arry[2].x = pbx;
                point_xy_arry[2].y = pby - _local6;
                if ((point_xy_arry[2].y < pay) || (point_xy_arry[0].y > pby)) {
                    var _local4 = pax + (((point_xy_arry[1].x - pbx) * (pay - point_xy_arry[2].y)) / _local6);
                    var _local5 = pay;
                    if (_local4 > pcx) {
                        _local4 = pcx;
                        var _local12 = Math.atan2(point_xy_arry[0].y - pcy, point_xy_arry[0].x - pcx);
                        var _local11 = Math.acos((stage_w / 2) / getDist(pcx, pcy, point_xy_arry[0].x, point_xy_arry[0].y));
                        var _local7 = _local12 - _local11;
                        var _local8 = pcx + ((stage_w / 2) * Math.cos(_local7));
                        var _local9 = pcy + ((stage_w / 2) * Math.sin(_local7));
                        var _local10 = (stage_h / Math.sqrt(Math.pow(getDist(pcx, pcy, point_xy_arry[0].x, point_xy_arry[0].y), 2) - Math.pow(stage_w / 2, 2))) * 0.999;
                        var _local15 = _local8 + ((point_xy_arry[0].x - _local8) * _local10);
                        var _local17 = _local9 + ((point_xy_arry[0].y - _local9) * _local10);
                        point_xy_arry[0].x = _local15;
                        point_xy_arry[0].y = _local17;
                        point_xy_arry_fun();
                        return (undefined);
                    }
                    var _local13 = getDist(point_xy_arry[2].x, point_xy_arry[2].y, _local4, _local5);
                    _local2 = ((_local4 - pax) * (pay - point_xy_arry[2].y)) / _local13;
                    _local3 = (_local2 * _local2) / (_local4 - pax);
                    point_xy_arry[3].x = pax + (_local3 * 2);
                    _local3 = (_local2 * _local2) / (pay - point_xy_arry[2].y);
                    point_xy_arry[3].y = pay - (_local3 * 2);
                    point_xy_arry[2].x = _local4;
                    point_xy_arry[2].y = _local5;
                } else {
                    point_xy_arry[3].x = point_xy_arry[2].x;
                    point_xy_arry[3].y = point_xy_arry[2].y;
                 }
                break;
            case 3 : 
                var _local2 = getDist(pex, pey, tem_array[0].x, tem_array[0].y) / 2;
                var _local3 = (pex - tem_array[0].x) / 2;
                tem_array[1].x = pex - ((_local2 * _local2) / _local3);
                tem_array[1].y = pey;
                if (tem_array[1].x < pcx) {
                    tem_array[1].x = pcx;
                    tem_array[1].y = pcy;
                    var _local14 = pcx + (((tem_array[0].x - pcx) * (stage_w / 2)) / getDist(pcx, pcy, tem_array[0].x, tem_array[0].y));
                    var _local16 = pcy + (((tem_array[0].y - pcy) * (stage_w / 2)) / getDist(pcx, pcy, tem_array[0].x, tem_array[0].y));
                    tem_array[0].x = _local14;
                    tem_array[0].y = _local16;
                    _local2 = getDist(pex, pey, tem_array[0].x, tem_array[0].y) / 2;
                }
                _local3 = (pey - tem_array[0].y) / 2;
                var _local6 = (_local2 * _local2) / _local3;
                tem_array[2].x = pex;
                tem_array[2].y = pey - _local6;
                if ((tem_array[2].y > pfy) || (tem_array[0].y < pey)) {
                    var _local4 = pfx - (((pex - tem_array[1].x) * (pfy - tem_array[2].y)) / _local6);
                    var _local5 = pfy;
                    if (_local4 < pdx) {
                        _local4 = pdx;
                        var _local12 = Math.atan2(tem_array[0].y - pdy, tem_array[0].x - pdx);
                        var _local11 = Math.acos((stage_w / 2) / getDist(pdx, pdy, tem_array[0].x, tem_array[0].y));
                        var _local7 = _local12 - _local11;
                        var _local8 = pdx + ((stage_w / 2) * Math.cos(_local7));
                        var _local9 = pdy + ((stage_w / 2) * Math.sin(_local7));
                        var _local10 = (stage_h / Math.sqrt(Math.pow(getDist(pdx, pdy, tem_array[0].x, tem_array[0].y), 2) - Math.pow(stage_w / 2, 2))) * 0.999;
                        var _local15 = _local8 + ((tem_array[0].x - _local8) * _local10);
                        var _local17 = _local9 + ((tem_array[0].y - _local9) * _local10);
                        tem_array[0].x = _local15;
                        tem_array[0].y = _local17;
                        point_xy_arry_fun();
                        return (undefined);
                    }
                    var _local13 = getDist(tem_array[2].x, tem_array[2].y, _local4, _local5);
                    _local2 = ((pfx - _local4) * (pfy - tem_array[2].y)) / _local13;
                    _local3 = (_local2 * _local2) / (pfx - _local4);
                    tem_array[3].x = pfx - (_local3 * 2);
                    _local3 = (_local2 * _local2) / (pfy - tem_array[2].y);
                    tem_array[3].y = pfy - (_local3 * 2);
                    tem_array[2].x = _local4;
                    tem_array[2].y = _local5;
                } else {
                    tem_array[3].x = tem_array[2].x;
                    tem_array[3].y = tem_array[2].y;
                 }
                point_xy_arry[0].x = tem_array[3].x;
                point_xy_arry[0].y = tem_array[3].y;
                point_xy_arry[1].x = tem_array[2].x;
                point_xy_arry[1].y = tem_array[2].y;
                point_xy_arry[2].x = tem_array[1].x;
                point_xy_arry[2].y = tem_array[1].y;
                point_xy_arry[3].x = tem_array[0].x;
                point_xy_arry[3].y = tem_array[0].y;
                break;
            case 4 : 
                var _local2 = getDist(pax, pay, tem_array[0].x, tem_array[0].y) / 2;
                var _local3 = (pax - tem_array[0].x) / 2;
                tem_array[1].x = pax - ((_local2 * _local2) / _local3);
                tem_array[1].y = pey;
                if (tem_array[1].x > pcx) {
                    tem_array[1].x = pcx;
                    tem_array[1].y = pcy;
                    var _local14 = pcx + (((tem_array[0].x - pcx) * (stage_w / 2)) / getDist(pcx, pcy, tem_array[0].x, tem_array[0].y));
                    var _local16 = pcy + (((tem_array[0].y - pcy) * (stage_w / 2)) / getDist(pcx, pcy, tem_array[0].x, tem_array[0].y));
                    tem_array[0].x = _local14;
                    tem_array[0].y = _local16;
                    _local2 = getDist(pax, pay, tem_array[0].x, tem_array[0].y) / 2;
                }
                _local3 = (pay - tem_array[0].y) / 2;
                var _local6 = (_local2 * _local2) / _local3;
                tem_array[2].x = pax;
                tem_array[2].y = pay - _local6;
                if ((tem_array[2].y > pby) || (tem_array[0].y < pay)) {
                    var _local4 = pbx - (((pax - tem_array[1].x) * (pby - tem_array[2].y)) / _local6);
                    var _local5 = pby;
                    if (_local4 > pdx) {
                        _local4 = pdx;
                        var _local12 = Math.atan2(tem_array[0].y - pdy, tem_array[0].x - pdx);
                        var _local11 = Math.acos((stage_w / 2) / getDist(pdx, pdy, tem_array[0].x, tem_array[0].y));
                        var _local7 = _local12 - _local11;
                        var _local8 = pdx + ((stage_w / 2) * Math.cos(_local7));
                        var _local9 = pdy + ((stage_w / 2) * Math.sin(_local7));
                        var _local10 = (stage_h / Math.sqrt(Math.pow(getDist(pdx, pdy, tem_array[0].x, tem_array[0].y), 2) - Math.pow(stage_w / 2, 2))) * 0.999;
                        var _local15 = _local8 + ((tem_array[0].x - _local8) * _local10);
                        var _local17 = _local9 + ((tem_array[0].y - _local9) * _local10);
                        tem_array[0].x = _local15;
                        tem_array[0].y = _local17;
                        point_xy_arry_fun();
                        return (undefined);
                    }
                    var _local13 = getDist(tem_array[2].x, tem_array[2].y, _local4, _local5);
                    _local2 = ((pbx - _local4) * (pby - tem_array[2].y)) / _local13;
                    _local3 = (_local2 * _local2) / (pbx - _local4);
                    tem_array[3].x = pbx - (_local3 * 2);
                    _local3 = (_local2 * _local2) / (pby - tem_array[2].y);
                    tem_array[3].y = pby - (_local3 * 2);
                    tem_array[2].x = _local4;
                    tem_array[2].y = _local5;
                } else {
                    tem_array[3].x = tem_array[2].x;
                    tem_array[3].y = tem_array[2].y;
                 }
                point_xy_arry[0].x = tem_array[3].x;
                point_xy_arry[0].y = tem_array[3].y;
                point_xy_arry[1].x = tem_array[2].x;
                point_xy_arry[1].y = tem_array[2].y;
                point_xy_arry[2].x = tem_array[1].x;
                point_xy_arry[2].y = tem_array[1].y;
                point_xy_arry[3].x = tem_array[0].x;
                point_xy_arry[3].y = tem_array[0].y;
                break;
        }
    }
    function drawMask1_fun() {
        this.createEmptyMovieClip("triangle", 301);
        with (triangle) {
            beginFill(16777215, 100);
            moveTo(_parent.point_xy_arry[0].x, _parent.point_xy_arry[0].y);
            lineTo(_parent.point_xy_arry[1].x, _parent.point_xy_arry[1].y);
            lineTo(_parent.point_xy_arry[2].x, _parent.point_xy_arry[2].y);
            lineTo(_parent.point_xy_arry[3].x, _parent.point_xy_arry[3].y);
            lineTo(_parent.point_xy_arry[0].x, _parent.point_xy_arry[0].y);
            endFill();
        }
        flip_mc.setMask(triangle);
    }
    function drawMask2_fun() {
        this.createEmptyMovieClip("next_triangle", 201);
        with (next_triangle) {
            beginFill(16777215, 100);
            moveTo(_parent.point_xy_arry[1].x, _parent.point_xy_arry[1].y);
            if ((_parent.drag_area == 1) || (_parent.drag_area == 3)) {
                lineTo(_parent.pfx, _parent.pfy);
                lineTo(_parent.pex, _parent.pey);
            } else if ((_parent.drag_area == 2) || (_parent.drag_area == 4)) {
                lineTo(_parent.pbx, _parent.pby);
                lineTo(_parent.pax, _parent.pay);
            }
            lineTo(_parent.point_xy_arry[2].x, _parent.point_xy_arry[2].y);
            lineTo(_parent.point_xy_arry[1].x, _parent.point_xy_arry[1].y);
            endFill();
        }
        next_mc.setMask(next_triangle);
    }
    function drawMask3_fun() {
        this.createEmptyMovieClip("on_triangle", 101);
        with (on_triangle) {
            beginFill(16777215, 100);
            if ((!_parent.flip_end) || _parent.CueHitArea_ing) {
                moveTo(_parent.point_xy_arry[1].x, _parent.point_xy_arry[1].y);
                if (_parent.drag_area == 1) {
                    lineTo(_parent.pbx, _parent.pby);
                    lineTo(_parent.pax, _parent.pay);
                    if (_parent.point_xy_arry[2].y > _parent.pcy) {
                        lineTo(_parent.pex, _parent.pey);
                        lineTo(_parent.point_xy_arry[2].x, _parent.point_xy_arry[2].y);
                    } else {
                        lineTo(_parent.point_xy_arry[2].x, _parent.point_xy_arry[2].y);
                     }
                } else if (_parent.drag_area == 3) {
                    if (_parent.point_xy_arry[1].y < _parent.pdy) {
                        lineTo(_parent.pfx, _parent.pfy);
                    }
                    lineTo(_parent.pbx, _parent.pby);
                    lineTo(_parent.pax, _parent.pay);
                    lineTo(_parent.point_xy_arry[2].x, _parent.point_xy_arry[2].y);
                } else if (_parent.drag_area == 2) {
                    lineTo(_parent.pfx, _parent.pfy);
                    lineTo(_parent.pex, _parent.pey);
                    if (_parent.point_xy_arry[2].y > _parent.pcy) {
                        lineTo(_parent.pax, _parent.pay);
                        lineTo(_parent.point_xy_arry[2].x, _parent.point_xy_arry[2].y);
                    } else {
                        lineTo(_parent.point_xy_arry[2].x, _parent.point_xy_arry[2].y);
                     }
                } else if (_parent.drag_area == 4) {
                    if (_parent.point_xy_arry[1].y < _parent.pdy) {
                        lineTo(_parent.pbx, _parent.pby);
                    }
                    lineTo(_parent.pfx, _parent.pfy);
                    lineTo(_parent.pex, _parent.pey);
                    lineTo(_parent.point_xy_arry[2].x, _parent.point_xy_arry[2].y);
                }
                lineTo(_parent.point_xy_arry[1].x, _parent.point_xy_arry[1].y);
                endFill();
            } else {
                moveTo(_parent.pax, _parent.pay);
                lineTo(_parent.pex, _parent.pey);
                lineTo(_parent.pfx, _parent.pfy);
                lineTo(_parent.pbx, _parent.pby);
                lineTo(_parent.pax, _parent.pay);
                endFill();
             }
        }
        on_mc.setMask(on_triangle);
        if (CueHitArea_ing) {
            return (undefined);
        }
    }
    function set_flip_mc_fun() {
        var _local4 = getAngle(point_xy_arry[0].x, point_xy_arry[0].y, point_xy_arry[3].x, point_xy_arry[3].y);
        flip_mc._rotation = _local4 + 90;
        var _local2 = getDist(pbx, pby, pcx, pcy);
        if (drag_area == 1) {
            var _local3 = getAngle(pbx, pby, pcx, pcy);
            flip_mc._x = point_xy_arry[0].x + (Math.cos(((flip_mc._rotation + _local3) * Math.PI) / 180) * _local2);
            flip_mc._y = point_xy_arry[0].y + (Math.sin(((flip_mc._rotation + _local3) * Math.PI) / 180) * _local2);
        } else if (drag_area == 2) {
            var _local3 = getAngle(pfx, pfy, pcx, pcy);
            flip_mc._x = point_xy_arry[0].x + (Math.cos(((flip_mc._rotation + _local3) * Math.PI) / 180) * _local2);
            flip_mc._y = point_xy_arry[0].y + (Math.sin(((flip_mc._rotation + _local3) * Math.PI) / 180) * _local2);
        } else if (drag_area == 3) {
            flip_mc._x = point_xy_arry[3].x + ((Math.cos((flip_mc._rotation * Math.PI) / 180) * stage_w) / 2);
            flip_mc._y = point_xy_arry[3].y + ((Math.sin((flip_mc._rotation * Math.PI) / 180) * stage_w) / 2);
        } else if (drag_area == 4) {
            flip_mc._x = point_xy_arry[3].x - ((Math.cos((flip_mc._rotation * Math.PI) / 180) * stage_w) / 2);
            flip_mc._y = point_xy_arry[3].y - ((Math.sin((flip_mc._rotation * Math.PI) / 180) * stage_w) / 2);
        }
    }
    function onMouseDown() {
        //Stage.showMenu = true;
        if ((!flip_ing) && flip_end) {
            if (if_out_page_area_fun()) {
                var _local3;
                var _local4;
                var _local2;
                if ((_xmouse > (pfx - hit_area_object.RightBottomWidth)) && (_ymouse > (pfy - hit_area_object.RightBottomHigh))) {
                    _local2 = 1;
                    _local3 = pfx;
                    _local4 = pfy;
                } else if ((_xmouse < (pbx + hit_area_object.LiftBottomWidth)) && (_ymouse > (pby - hit_area_object.LiftBottomHigh))) {
                    _local2 = 2;
                    _local3 = pbx;
                    _local4 = pby;
                } else if ((_xmouse > (pex - hit_area_object.RightTopWidth)) && (_ymouse < (pey + hit_area_object.RightTopHigh))) {
                    _local2 = 3;
                    _local3 = pex;
                    _local4 = pey;
                } else if ((_xmouse < (pax + hit_area_object.LiftTopWidth)) && (_ymouse < (pay + hit_area_object.LiftTopHigh))) {
                    _local2 = 4;
                    _local3 = pax;
                    _local4 = pay;
                } else {
                    _local2 = 0;
                 }
                if ((((_local2 == 1) || (_local2 == 3)) && (on_page_v < all_page_v)) || (((_local2 == 2) || (_local2 == 4)) && (on_page_v > 1))) {
                    drag_area = _local2;
                    OnStartFlip();
                    clearInterval(stop_time_si);
                    if (FlipOnRelease_b) {
                        press_xmouse = _xmouse;
                        press_ymouse = _ymouse;
                    }
                    if (CueHitArea) {
                        point_xy_arry[0].x = (tem_array[0].x = _xmouse);
                        point_xy_arry[0].y = (tem_array[0].y = _ymouse);
                    } else {
                        point_xy_arry[0].x = (tem_array[0].x = _local3);
                        point_xy_arry[0].y = (tem_array[0].y = _local4);
                     }
                    if (CueHitArea_ing) {
                        CueHitArea_ing = false;
                        OnFinishCueHitAreaing();
                    }
                    flip_ing = true;
                    flip_end = false;
                    on_mc._visible = true;
                    this.attachMovie(book_mc, "flip_mc", 300);
                    this.attachMovie(book_mc, "next_mc", 200);
                    next_mc._x = pcx;
                    next_mc._y = pcy;
                    if ((drag_area == 1) || (drag_area == 3)) {
                        //next_mc.gotoAndStop(on_page_v + 1);
                        //flip_mc.gotoAndStop(on_page_v + 1);
                        __setPagesFrame(next_mc, on_page_v + 1);
                        __setPagesFrame(flip_mc, on_page_v + 1);
                    } else if ((drag_area == 2) || (drag_area == 4)) {
                        //next_mc.gotoAndStop(on_page_v - 1);
                        //flip_mc.gotoAndStop(on_page_v - 1);
                        __setPagesFrame(next_mc, on_page_v - 1);
                        __setPagesFrame(flip_mc, on_page_v - 1);
                    }
                    onEnterFrame = onMouseMove_filp_fun;
                    onMouseMove_filp_fun();
                }
            }
        }
    }
    function press_filp_fun() {
        if (FlipOnRelease_b) {
            var _local2 = 8;
            if (Math.sqrt(Math.pow(press_xmouse - _xmouse, 2) + Math.pow(press_ymouse - _ymouse, 2)) <= _local2) {
                return (true);
            } else {
                return (false);
             }
        } else {
            return (false);
         }
    }
    function onMouseUp() {
        if (flip_ing) {
            flip_ing = false;
            flip_end = false;
            if (drag_area == 1) {
                if ((point_xy_arry[0].x < pcx) || press_filp_fun()) {
                    flip_win = true;
                    aim_x = pbx;
                    aim_y = pby;
                    filp_sound_fun();
                    onEnterFrame = function () {
                        this.point_xy_arry[0].x = this.point_xy_arry[0].x + ((this.aim_x - this.point_xy_arry[0].x) / (1 + this.flip_speed));
                        this.point_xy_arry[0].y = this.point_xy_arry[0].y + ((this.aim_y - this.point_xy_arry[0].y) / (1 + this.flip_speed));
                        this.flip_ing_fun();
                        if (Math.sqrt(Math.pow(this.point_xy_arry[0].x - this.aim_x, 2) + Math.pow(this.point_xy_arry[0].y - this.aim_y, 2)) <= this.end_filp_distance_v) {
                            this.show_next_page_fun();
                        }
                    };
                } else {
                    flip_win = false;
                    aim_x = pfx;
                    aim_y = pfy;
                    filp_sound_fun();
                    onEnterFrame = function () {
                        this.point_xy_arry[0].x = this.point_xy_arry[0].x + ((this.aim_x - this.point_xy_arry[0].x) / (1 + this.flip_speed));
                        this.point_xy_arry[0].y = this.point_xy_arry[0].y + ((this.aim_y - this.point_xy_arry[0].y) / (1 + this.flip_speed));
                        this.flip_ing_fun();
                        if (Math.sqrt(Math.pow(this.point_xy_arry[0].x - this.aim_x, 2) + Math.pow(this.point_xy_arry[0].y - this.aim_y, 2)) <= this.end_filp_distance_v) {
                            this.no_flip_page_fun();
                        }
                    };
                 }
            } else if (drag_area == 3) {
                if ((point_xy_arry[3].x < pcx) || press_filp_fun()) {
                    flip_win = true;
                    aim_x = pax;
                    aim_y = pay;
                    filp_sound_fun();
                    onEnterFrame = function () {
                        this.tem_array[0].x = this.tem_array[0].x + ((this.aim_x - this.tem_array[0].x) / (1 + this.flip_speed));
                        this.tem_array[0].y = this.tem_array[0].y + ((this.aim_y - this.tem_array[0].y) / (1 + this.flip_speed));
                        this.flip_ing_fun();
                        if (Math.sqrt(Math.pow(this.point_xy_arry[3].x - this.aim_x, 2) + Math.pow(this.point_xy_arry[3].y - this.aim_y, 2)) <= this.end_filp_distance_v) {
                            this.show_next_page_fun();
                        }
                    };
                } else {
                    flip_win = false;
                    aim_x = pex;
                    aim_y = pey;
                    filp_sound_fun();
                    onEnterFrame = function () {
                        this.tem_array[0].x = this.tem_array[0].x + ((this.aim_x - this.tem_array[0].x) / (1 + this.flip_speed));
                        this.tem_array[0].y = this.tem_array[0].y + ((this.aim_y - this.tem_array[0].y) / (1 + this.flip_speed));
                        this.flip_ing_fun();
                        if (Math.sqrt(Math.pow(this.point_xy_arry[3].x - this.aim_x, 2) + Math.pow(this.point_xy_arry[3].y - this.aim_y, 2)) <= this.end_filp_distance_v) {
                            this.no_flip_page_fun();
                        }
                    };
                 }
            } else if (drag_area == 2) {
                if ((point_xy_arry[0].x > pcx) || press_filp_fun()) {
                    flip_win = true;
                    aim_x = pfx;
                    aim_y = pfy;
                    filp_sound_fun();
                    onEnterFrame = function () {
                        this.point_xy_arry[0].x = this.point_xy_arry[0].x + ((this.aim_x - this.point_xy_arry[0].x) / (1 + this.flip_speed));
                        this.point_xy_arry[0].y = this.point_xy_arry[0].y + ((this.aim_y - this.point_xy_arry[0].y) / (1 + this.flip_speed));
                        this.flip_ing_fun();
                        if (Math.sqrt(Math.pow(this.point_xy_arry[0].x - this.aim_x, 2) + Math.pow(this.point_xy_arry[0].y - this.aim_y, 2)) <= this.end_filp_distance_v) {
                            this.show_prev_page_fun();
                        }
                    };
                } else {
                    flip_win = false;
                    aim_x = pbx;
                    aim_y = pby;
                    filp_sound_fun();
                    onEnterFrame = function () {
                        this.point_xy_arry[0].x = this.point_xy_arry[0].x + ((this.aim_x - this.point_xy_arry[0].x) / (1 + this.flip_speed));
                        this.point_xy_arry[0].y = this.point_xy_arry[0].y + ((this.aim_y - this.point_xy_arry[0].y) / (1 + this.flip_speed));
                        this.flip_ing_fun();
                        if (Math.sqrt(Math.pow(this.point_xy_arry[0].x - this.aim_x, 2) + Math.pow(this.point_xy_arry[0].y - this.aim_y, 2)) <= this.end_filp_distance_v) {
                            this.no_flip_page_fun();
                        }
                    };
                 }
            } else if (drag_area == 4) {
                if ((point_xy_arry[3].x > pcx) || press_filp_fun()) {
                    flip_win = true;
                    aim_x = pex;
                    aim_y = pey;
                    filp_sound_fun();
                    onEnterFrame = function () {
                        this.tem_array[0].x = this.tem_array[0].x + ((this.aim_x - this.tem_array[0].x) / (1 + this.flip_speed));
                        this.tem_array[0].y = this.tem_array[0].y + ((this.aim_y - this.tem_array[0].y) / (1 + this.flip_speed));
                        this.flip_ing_fun();
                        if (Math.sqrt(Math.pow(this.point_xy_arry[3].x - this.aim_x, 2) + Math.pow(this.point_xy_arry[3].y - this.aim_y, 2)) <= this.end_filp_distance_v) {
                            this.show_prev_page_fun();
                        }
                    };
                } else {
                    flip_win = false;
                    aim_x = pax;
                    aim_y = pay;
                    filp_sound_fun();
                    onEnterFrame = function () {
                        this.tem_array[0].x = this.tem_array[0].x + ((this.aim_x - this.tem_array[0].x) / (1 + this.flip_speed));
                        this.tem_array[0].y = this.tem_array[0].y + ((this.aim_y - this.tem_array[0].y) / (1 + this.flip_speed));
                        this.flip_ing_fun();
                        if (Math.sqrt(Math.pow(this.point_xy_arry[3].x - this.aim_x, 2) + Math.pow(this.point_xy_arry[3].y - this.aim_y, 2)) <= this.end_filp_distance_v) {
                            this.no_flip_page_fun();
                        }
                    };
                 }
            }
        }
    }
    function onMouseMove_filp_fun() {
        var _local2;
        var _local3;
        if (drag_area == 1) {
            if (_xmouse > pfx) {
                _local2 = pfx - 0.01;
                _local3 = pfy - 0.01;
            } else {
                _local2 = _xmouse;
                _local3 = _ymouse;
             }
        } else if (drag_area == 3) {
            if (_xmouse > pfx) {
                _local2 = pex - 0.01;
                _local3 = pey + 0.01;
            } else {
                _local2 = _xmouse;
                _local3 = _ymouse;
             }
        } else if (drag_area == 2) {
            if (_xmouse < pax) {
                _local2 = pbx + 0.01;
                _local3 = pby - 0.01;
            } else {
                _local2 = _xmouse;
                _local3 = _ymouse;
             }
        } else if (drag_area == 4) {
            if (_xmouse < pax) {
                _local2 = pax + 0.01;
                _local3 = pay + 0.01;
            } else {
                _local2 = _xmouse;
                _local3 = _ymouse;
             }
        }
        if ((drag_area == 1) || (drag_area == 2)) {
            point_xy_arry[0].x = point_xy_arry[0].x + ((_local2 - point_xy_arry[0].x) / BufferCoefficient);
            point_xy_arry[0].y = point_xy_arry[0].y + ((_local3 - point_xy_arry[0].y) / BufferCoefficient);
        } else if ((drag_area == 3) || (drag_area == 4)) {
            tem_array[0].x = tem_array[0].x + ((_local2 - tem_array[0].x) / BufferCoefficient);
            tem_array[0].y = tem_array[0].y + ((_local3 - tem_array[0].y) / BufferCoefficient);
        }
        flip_ing_fun();
    }
    function set_CueHitArea_fun() {
        var _local2;
        var _local3;
        if (!CueHitArea_ing) {
            if (if_out_page_area_fun()) {
                if ((_xmouse > (pfx - hit_area_object.RightBottomWidth)) && (_ymouse > (pfy - hit_area_object.RightBottomHigh))) {
                    drag_area = 1;
                    _local2 = pfx;
                    _local3 = pfy;
                } else if ((_xmouse < (pbx + hit_area_object.LiftBottomWidth)) && (_ymouse > (pby - hit_area_object.LiftBottomHigh))) {
                    drag_area = 2;
                    _local2 = pbx;
                    _local3 = pby;
                } else if ((_xmouse > (pex - hit_area_object.RightTopWidth)) && (_ymouse < (pey + hit_area_object.RightTopHigh))) {
                    drag_area = 3;
                    _local2 = pex;
                    _local3 = pey;
                } else if ((_xmouse < (pax + hit_area_object.LiftTopWidth)) && (_ymouse < (pay + hit_area_object.LiftTopHigh))) {
                    drag_area = 4;
                    _local2 = pax;
                    _local3 = pay;
                } else {
                    drag_area = 0;
                 }
                if ((((drag_area == 1) || (drag_area == 3)) && (on_page_v < all_page_v)) || (((drag_area == 2) || (drag_area == 4)) && (on_page_v > 1))) {
                    clearInterval(stop_time_si);
                    point_xy_arry[0].x = (tem_array[0].x = _local2);
                    point_xy_arry[0].y = (tem_array[0].y = _local3);
                    on_mc._visible = true;
                    this.attachMovie(book_mc, "flip_mc", 300);
                    this.attachMovie(book_mc, "next_mc", 200);
                    next_mc._x = pcx;
                    next_mc._y = pcy;
                    if ((drag_area == 1) || (drag_area == 3)) {
                       // next_mc.gotoAndStop(on_page_v + 1);
                        //flip_mc.gotoAndStop(on_page_v + 1);
                        __setPagesFrame(next_mc, on_page_v + 1);
                        __setPagesFrame(flip_mc, on_page_v + 1);
                    } else if ((drag_area == 2) || (drag_area == 4)) {
                        //next_mc.gotoAndStop(on_page_v - 1);
                        //flip_mc.gotoAndStop(on_page_v - 1);
                        __setPagesFrame(next_mc, on_page_v - 1);
                        __setPagesFrame(flip_mc, on_page_v - 1);
                    }
                    onMouseMove_filp_fun();
                    CueHitArea_ing = true;
                    OnStartCueHitAreaing();
                }
            }
        } else {
            if (drag_area == 1) {
                if (((_xmouse < (pfx - hit_area_object.RightBottomWidth)) || (_ymouse < (pfy - hit_area_object.RightBottomHigh))) || (!if_out_page_area_fun())) {
                    _local2 = pfx;
                    _local3 = pfy;
                    if (Math.sqrt(Math.pow(point_xy_arry[0].x - _local2, 2) + Math.pow(point_xy_arry[0].y - _local3, 2)) <= end_filp_distance_v) {
                        no_flip_page_fun();
                    }
                } else {
                    _local2 = _xmouse;
                    _local3 = _ymouse;
                 }
            } else if (drag_area == 3) {
                if (((_xmouse < (pex - hit_area_object.RightTopWidth)) || (_ymouse > (pey + hit_area_object.RightTopHigh))) || (!if_out_page_area_fun())) {
                    _local2 = pex;
                    _local3 = pey;
                    if (Math.sqrt(Math.pow(tem_array[0].x - _local2, 2) + Math.pow(tem_array[0].y - _local3, 2)) <= end_filp_distance_v) {
                        no_flip_page_fun();
                    }
                } else {
                    _local2 = _xmouse;
                    _local3 = _ymouse;
                 }
            } else if (drag_area == 2) {
                if (((_xmouse > (pbx + hit_area_object.LiftBottomWidth)) || (_ymouse < (pby - hit_area_object.LiftBottomHigh))) || (!if_out_page_area_fun())) {
                    _local2 = pbx;
                    _local3 = pby;
                    if (Math.sqrt(Math.pow(point_xy_arry[0].x - _local2, 2) + Math.pow(point_xy_arry[0].y - _local3, 2)) <= end_filp_distance_v) {
                        no_flip_page_fun();
                    }
                } else {
                    _local2 = _xmouse;
                    _local3 = _ymouse;
                 }
            } else if (drag_area == 4) {
                if (((_xmouse > (pax + hit_area_object.LiftTopWidth)) || (_ymouse > (pay + hit_area_object.LiftTopHigh))) || (!if_out_page_area_fun())) {
                    _local2 = pax;
                    _local3 = pay;
                    if (Math.sqrt(Math.pow(tem_array[0].x - _local2, 2) + Math.pow(tem_array[0].y - _local3, 2)) <= end_filp_distance_v) {
                        no_flip_page_fun();
                    }
                } else {
                    _local2 = _xmouse;
                    _local3 = _ymouse;
                 }
            }
            if ((drag_area == 1) || (drag_area == 2)) {
                point_xy_arry[0].x = point_xy_arry[0].x + ((_local2 - point_xy_arry[0].x) / BufferCoefficient);
                point_xy_arry[0].y = point_xy_arry[0].y + ((_local3 - point_xy_arry[0].y) / BufferCoefficient);
            } else if ((drag_area == 3) || (drag_area == 4)) {
                tem_array[0].x = tem_array[0].x + ((_local2 - tem_array[0].x) / BufferCoefficient);
                tem_array[0].y = tem_array[0].y + ((_local3 - tem_array[0].y) / BufferCoefficient);
            }
            flip_ing_fun();
         }
    }
    function if_out_page_area_fun() {
        if ((((_xmouse > pax) && (_xmouse < pex)) && (_ymouse > pay)) && (_ymouse < pby)) {
            return (true);
        } else {
            return (false);
         }
    }
    /*
     * created by peanut [2008-3-27]
     */
    private function __setPagesFrame(clip:MovieClip, v:Number):Void{
    	if(v==1 || v == all_page_v)
    		clip.gotoAndStop(v);
    	else
    		clip.gotoAndStop(2);
    }
    function show_next_page_fun() {
        flip_end = true;
        on_page_v++;
        //on_mc.gotoAndStop(on_page_v);
        __setPagesFrame(on_mc, on_page_v);
        
        remove_flip_next_page_fun();
        on_mc_MovieClipLoader_fun(on_mc);
    }
    function show_prev_page_fun() {
        flip_end = true;
        on_page_v--;
        //on_mc.gotoAndStop(on_page_v);
        __setPagesFrame(on_mc, on_page_v);
        
        remove_flip_next_page_fun();
        on_mc_MovieClipLoader_fun(on_mc);
    }
    function show_the_page_fun(v) {
        flip_end = true;
        on_page_v = v;
        //on_mc.gotoAndStop(on_page_v);
        __setPagesFrame(on_mc, on_page_v);
        
        remove_flip_next_page_fun();
        on_mc_MovieClipLoader_fun(on_mc);
    }
    function no_flip_page_fun() {
        flip_end = true;
        remove_flip_next_page_fun();
    }
    function remove_flip_next_page_fun() {
        delete onEnterFrame;
        if (!shadow_bottom1._visible) {
            shadow_bottom1._visible = true;
            shadow_bottom1._alpha = 0;
            shadow_bottom1.onEnterFrame = function () {
                this._visible = true;
                this._alpha = this._alpha + 20;
                if (this._alpha >= 100) {
                    delete this.onEnterFrame;
                }
            };
        }
        if (!shadow_bottom2._visible) {
            shadow_bottom2._visible = true;
            shadow_bottom2._alpha = 0;
            shadow_bottom2.onEnterFrame = function () {
                this._visible = true;
                this._alpha = this._alpha + 20;
                if (this._alpha >= 100) {
                    delete this.onEnterFrame;
                }
            };
        }
        if (on_page_v == 1) {
            shadow_bottom2._visible = false;
            delete shadow_bottom2.onEnterFrame;
        } else if (on_page_v == all_page_v) {
            shadow_bottom1._visible = false;
            delete shadow_bottom1.onEnterFrame;
        }
        if (!page_side1_mc._visible) {
            page_side1_mc._visible = true;
            page_side1_mc._alpha = 0;
            page_side1_mc.onEnterFrame = function () {
                this._visible = true;
                this._alpha = this._alpha + 20;
                if (this._alpha >= 100) {
                    delete this.onEnterFrame;
                }
            };
        }
        if (!page_side2_mc._visible) {
            page_side2_mc._visible = true;
            page_side2_mc._alpha = 0;
            page_side2_mc.onEnterFrame = function () {
                this._visible = true;
                this._alpha = this._alpha + 20;
                if (this._alpha >= 100) {
                    delete this.onEnterFrame;
                }
            };
        }
        if ((on_page_v == 1) || (on_page_v == all_page_v)) {
            page_side2_mc._visible = false;
            delete page_side2_mc.onEnterFrame;
            page_side1_mc._visible = false;
            delete page_side1_mc.onEnterFrame;
        }
        drawMask3_fun();
        on_mc._visible = true;
        flip_mc._visible = false;
        next_mc._visible = false;
        next_triangle._visible = false;
        triangle._visible = false;
        this.removeMovieClip();
        this.removeMovieClip();
        this.removeMovieClip();
        this.removeMovieClip();
        set_bg_sound_fun();
        set_page_title_fun();
        set_end_shadow_fun();
        if (if_auto_filp != "NO") {
            auto_filp_fun();
        }
        if (CueHitArea) {
            if (CueHitArea_ing) {
                CueHitArea_ing = false;
                OnFinishCueHitAreaing();
            } else {
                OnFinishFlip();
             }
            onEnterFrame = set_CueHitArea_fun;
        } else {
            OnFinishFlip();
         }
    }
    function go_next_page_fun() {
        if ((on_page_v < all_page_v) && flip_end) {
            OnStartFlip();
            clearInterval(stop_time_si);
            flip_ing = false;
            flip_end = false;
            drag_area = 1;
            flip_win = true;
            this.attachMovie(book_mc, "flip_mc", 300);
            this.attachMovie(book_mc, "next_mc", 200);
            next_mc._x = pcx;
            next_mc._y = pcy;
            //next_mc.gotoAndStop(on_page_v + 1);
            //flip_mc.gotoAndStop(on_page_v + 1);
            __setPagesFrame(next_mc, on_page_v + 1);
            __setPagesFrame(flip_mc, on_page_v + 1);
            on_mc._visible = true;
            point_xy_arry[0].x = pfx - StartFilpInclineX;
            point_xy_arry[0].y = pfy - StartFilpInclineY;
            flip_ing_fun();
            aim_x = pbx;
            aim_y = pby;
            filp_sound_fun();
            onEnterFrame = function () {
                this.point_xy_arry[0].x = this.point_xy_arry[0].x + ((this.aim_x - this.point_xy_arry[0].x) / (1 + this.flip_speed));
                this.point_xy_arry[0].y = this.point_xy_arry[0].y + ((this.aim_y - this.point_xy_arry[0].y) / (1 + this.flip_speed));
                this.flip_ing_fun();
                if (Math.sqrt(Math.pow(this.point_xy_arry[0].x - this.aim_x, 2) + Math.pow(this.point_xy_arry[0].y - this.aim_y, 2)) <= this.end_filp_distance_v) {
                    this.show_next_page_fun();
                }
            };
        }
    }
    function go_prev_page_fun() {
        if ((on_page_v > 1) && flip_end) {
            OnStartFlip();
            clearInterval(stop_time_si);
            flip_ing = false;
            flip_end = false;
            drag_area = 2;
            flip_win = true;
            this.attachMovie(book_mc, "flip_mc", 300);
            this.attachMovie(book_mc, "next_mc", 200);
            next_mc._x = pcx;
            next_mc._y = pcy;
            //next_mc.gotoAndStop(on_page_v - 1);
            //flip_mc.gotoAndStop(on_page_v - 1);
            __setPagesFrame(next_mc, on_page_v - 1);
            __setPagesFrame(flip_mc, on_page_v - 1);
            on_mc._visible = true;
            point_xy_arry[0].x = pbx + StartFilpInclineX;
            point_xy_arry[0].y = pby - StartFilpInclineY;
            flip_ing_fun();
            aim_x = pfx;
            aim_y = pfy;
            filp_sound_fun();
            onEnterFrame = function () {
                this.point_xy_arry[0].x = this.point_xy_arry[0].x + ((this.aim_x - this.point_xy_arry[0].x) / (1 + this.flip_speed));
                this.point_xy_arry[0].y = this.point_xy_arry[0].y + ((this.aim_y - this.point_xy_arry[0].y) / (1 + this.flip_speed));
                this.flip_ing_fun();
                if (Math.sqrt(Math.pow(this.point_xy_arry[0].x - this.aim_x, 2) + Math.pow(this.point_xy_arry[0].y - this.aim_y, 2)) <= this.end_filp_distance_v) {
                    this.show_prev_page_fun();
                }
            };
        }
    }
    function go_to_page_fun(v) {
        if ((((v >= 1) && (v <= all_page_v)) && (v != on_page_v)) && flip_end) {
            OnStartFlip();
            clearInterval(stop_time_si);
            go_to_page_v = v;
            flip_ing = false;
            flip_end = false;
            if (v > on_page_v) {
                drag_area = 1;
                point_xy_arry[0].x = pfx - StartFilpInclineX;
                point_xy_arry[0].y = pfy - StartFilpInclineY;
                aim_x = pbx;
                aim_y = pby;
            } else {
                drag_area = 2;
                point_xy_arry[0].x = pbx + StartFilpInclineX;
                point_xy_arry[0].y = pby - StartFilpInclineY;
                aim_x = pfx;
                aim_y = pfy;
             }
            if (v == 1) {
                shadow_bottom2._visible = false;
            } else if (v == all_page_v) {
                shadow_bottom1._visible = false;
            }
            if (v <= 1) {
                page_side2_mc._visible = false;
            } else if (v >= all_page_v) {
                page_side1_mc._visible = false;
            }
            flip_win = true;
            this.attachMovie(book_mc, "flip_mc", 300);
            this.attachMovie(book_mc, "next_mc", 200);
            next_mc._x = pcx;
            next_mc._y = pcy;
            //next_mc.gotoAndStop(v);
            //flip_mc.gotoAndStop(v);
            __setPagesFrame(next_mc, v);
            __setPagesFrame(flip_mc, v);
            on_mc._visible = true;
            flip_ing_fun();
            filp_sound_fun();
            onEnterFrame = function () {
                this.point_xy_arry[0].x = this.point_xy_arry[0].x + ((this.aim_x - this.point_xy_arry[0].x) / (1 + this.flip_speed));
                this.point_xy_arry[0].y = this.point_xy_arry[0].y + ((this.aim_y - this.point_xy_arry[0].y) / (1 + this.flip_speed));
                this.flip_ing_fun();
                if (Math.sqrt(Math.pow(this.point_xy_arry[0].x - this.aim_x, 2) + Math.pow(this.point_xy_arry[0].y - this.aim_y, 2)) <= this.end_filp_distance_v) {
                    this.show_the_page_fun(this.go_to_page_v);
                }
            };
        }
    }
    function set_bg_sound_fun() {
        if ((bg_sound_v != bg_sound_array[on_page_v - 1]) || pauseBgSound_b) {
            pauseBgSound_b = false;
            bg_sound_v = bg_sound_array[on_page_v - 1];
            bg_sound.stop();
            bg_sound = new Sound (stage_mc);
            var _local2 = String (bg_sound_v);
            if (_local2 != "undefined") {
                if (_local2.length < 5) {
                    bg_sound.attachSound("bg_sound" + bg_sound_v);
                    bg_sound.setVolume(bg_s_volume);
                    bg_sound.start(0, 1);
                } else {
                    bg_sound.loadSound(bg_sound_v, true);
                    bg_sound.onLoad = function (success) {
                        if (success) {
                            this.bg_sound.start(0, 1);
                        }
                    };
                 }
            }
            bg_sound.onSoundComplete = function () {
                this.start(0, 1);
            };
        }
    }
    function setBgSoundVolumeFun(v) {
        bg_sound.setVolume(v);
    }
    function pauseBgSoundFun() {
        pauseBgSound_b = true;
        bg_sound_position = bg_sound.position / 1000;
        bg_sound.stop();
    }
    function continueBgSoundFun() {
        pauseBgSound_b = false;
        bg_sound.stop();
        bg_sound.start(bg_sound_position, 1);
        bg_sound.onSoundComplete = function () {
            this.start(0, 1);
        };
    }
    function set_shadow_fun() {
        if (shadow_b) {
            on_triangle.duplicateMovieClip("mask3_shadow", 492);
            next_triangle.duplicateMovieClip("mask2_shadow", 502);
            triangle.duplicateMovieClip("mask1_shadow", 512);
            if ((drag_area == 1) || (drag_area == 3)) {
                this.attachMovie(HighModeSetting_object.FlipShadowMC1, "shadow1_mc", 511);
                this.attachMovie(HighModeSetting_object.FlipShadowMC2, "shadow2_mc", 501);
                this.attachMovie(HighModeSetting_object.FlipShadowMC1, "shadow3_mc", 491);
            } else if ((drag_area == 2) || (drag_area == 4)) {
                this.attachMovie(HighModeSetting_object.FlipShadowMC1, "shadow2_mc", 501);
                this.attachMovie(HighModeSetting_object.FlipShadowMC2, "shadow1_mc", 511);
                this.attachMovie(HighModeSetting_object.FlipShadowMC2, "shadow3_mc", 491);
            }
            shadow1_mc._visible = true;
            shadow2_mc._visible = true;
            shadow3_mc._visible = true;
            var _local2 = getAngle(point_xy_arry[1].x, point_xy_arry[1].y, point_xy_arry[2].x, point_xy_arry[2].y);
            var _local3 = getDist(point_xy_arry[1].x, point_xy_arry[1].y, point_xy_arry[2].x, point_xy_arry[2].y);
            shadow1_mc._x = (shadow2_mc._x = (shadow3_mc._x = point_xy_arry[1].x));
            shadow1_mc._y = (shadow2_mc._y = (shadow3_mc._y = point_xy_arry[1].y));
            shadow1_mc.shadow_mc._width = (shadow2_mc.shadow_mc._width = (shadow3_mc.shadow_mc._width = _local3 + 250));
            shadow3_mc.shadow_mc._yscale = shadow1_mc.shadow_mc._yscale * 0.3;
            shadow1_mc._rotation = (shadow2_mc._rotation = (shadow3_mc._rotation = _local2));
            shadow1_mc.setMask(mask1_shadow);
            shadow2_mc.setMask(mask2_shadow);
            shadow3_mc.setMask(mask3_shadow);
        }
    }
    function set_end_shadow_fun() {
        if (shadow_b) {
            shadow_alpha_v = 100;
            stage_mc.onEnterFrame = function () {
                this._parent.shadow_alpha_v = this._parent.shadow_alpha_v - 20;
                this._parent.shadow1_mc._alpha = (this._parent.shadow2_mc._alpha = (this._parent.shadow3_mc._alpha = this._parent.shadow_alpha_v));
                if (this._parent.shadow_alpha_v <= 0) {
                    this._parent.shadow1_mc._visible = false;
                    this._parent.shadow2_mc._visible = false;
                    this._parent.shadow3_mc._visible = false;
                    delete this.stage_mc.onEnterFrame;
                }
            };
        }
    }
    function set_bottom_shadow_fun() {
        if (bottom_shadow_b) {
            if (on_page_v >= (all_page_v - 1)) {
                if ((drag_area == 1) || (drag_area == 3)) {
                    shadow_bottom1._visible = false;
                    if (!shadow_bottom2._visible) {
                        shadow_bottom2._visible = true;
                        shadow_bottom2._alpha = 0;
                        shadow_bottom2.onEnterFrame = function () {
                            this._alpha = this._alpha + 20;
                            if (this._alpha == 100) {
                                delete this.onEnterFrame;
                            }
                        };
                    }
                }
            } else if (on_page_v <= 2) {
                if ((drag_area == 2) || (drag_area == 4)) {
                    shadow_bottom2._visible = false;
                    if (!shadow_bottom1._visible) {
                        shadow_bottom1._visible = true;
                        shadow_bottom1._alpha = 0;
                        shadow_bottom1.onEnterFrame = function () {
                            this._alpha = this._alpha + 20;
                            if (this._alpha == 100) {
                                delete this.onEnterFrame;
                            }
                        };
                    }
                }
            }
        }
        if (page_side_b) {
            if (on_page_v >= (all_page_v - 1)) {
                if ((drag_area == 1) || (drag_area == 3)) {
                    page_side1_mc._visible = false;
                }
            } else if (on_page_v <= 2) {
                if ((drag_area == 2) || (drag_area == 4)) {
                    page_side2_mc._visible = false;
                }
            }
        }
    }
    function auto_filp_fun() {
        stop_time_si = setInterval(this, "auto_go_next_filp_fun", auto_filp_time * 1000);
    }
    function auto_go_next_filp_fun() {
        if ((on_page_v == all_page_v) && (if_auto_filp == "Circle")) {
            go_to_page_fun(1);
        } else {
            go_next_page_fun();
         }
        clearInterval(stop_time_si);
    }
    function set_page_title_fun() {
        return (page_title_array[on_page_v - 1]);
    }
    function play_one_sound_fun() {
        var _local3 = new Sound (on_mc);
        _local3.setVolume(100);
        var _local4 = new Sound (flip_mc);
        _local4.setVolume(0);
        var _local2 = new Sound (next_mc);
        _local2.setVolume(0);
    }
    function getLocalFun() {
        so_gl = SharedObject.getLocal("AsFlipPage");
        if (so_gl.data.if_show == 1) {
            local_stop_time_si = setInterval(this, "on_open_go_to_page_fun", 200, so_gl.data.n_page);
        }
    }
    function on_open_go_to_page_fun(v) {
        go_to_page_fun(Number (v));
        clearInterval(local_stop_time_si);
    }
    function setLocalFun(b) {
        so_gl = SharedObject.getLocal("AsFlipPage");
        so_gl.data.n_page = on_page_v;
        if (b) {
            so_gl.data.if_show = 1;
        } else {
            so_gl.data.if_show = 0;
         }
        so_gl.flush();
        fscommand ("quit");
    }
    function filp_sound_fun() {
        if (filp_sound_str.length > 0) {
            filping_sound = new Sound (this);
            filping_sound.attachSound(filp_sound_str);
            filping_sound.start(0, 1);
        }
    }
    function flipNextPage() {
        go_next_page_fun();
    }
    function flipPrevPage() {
        go_prev_page_fun();
    }
    function flipCertainPage(v) {
        go_to_page_fun(v);
    }
    function flipCoverPage() {
        go_to_page_fun(1);
    }
    function flipBackPage() {
        go_to_page_fun(all_page_v);
    }
    function flipListPage() {
        go_to_page_fun(list_page_v);
    }
    function stopAutoFilp() {
        if_auto_filp = "NO";
        clearInterval(stop_time_si);
    }
    function startAutoFilp(st) {
        if_auto_filp = st;
        auto_filp_fun();
    }
    function getPageNumber() {
        return (on_page_v);
    }
    function getAllPageNumber() {
        return (all_page_v);
    }
    function getPageTitle() {
        return (set_page_title_fun());
    }
    function getStageWidth() {
        return (stage_w);
    }
    function getStageHeight() {
        return (stage_h);
    }
    function setLoadPageTitle(arry) {
        load_page_title_array = arry;
    }
    function getOnBgsound() {
        return (bg_sound_array[on_page_v]);
    }
    function OnStartFlip() {
        _parent[events_fun_object.OnStartFlip].apply(null, [on_page_v]);
    }
    function OnFinishFlip() {
        _parent[events_fun_object.OnFinishFlip].apply(null, [on_page_v, set_page_title_fun()]);
    }
    function OnStartCueHitAreaing() {
        _parent[events_fun_object.OnStartCueHitAreaing].apply(null, []);
    }
    function OnFinishCueHitAreaing() {
        _parent[events_fun_object.OnFinishCueHitAreaing].apply(null, []);
    }
    function OnLoadingPages() {
        _parent[events_fun_object.OnLoadingPages].apply(null, [loading_page_array]);
    }
    function SetPrintJob() {
        my_pj = new PrintJob ();
        my_pj.start();
        my_pj.addPage("_root", {printAsBitmap:true});
        my_pj.send();
        delete my_pj;
    }
    function flip_ing_fun() {
        point_xy_arry_fun();
        drawMask1_fun();
        drawMask2_fun();
        drawMask3_fun();
        set_flip_mc_fun();
        set_shadow_fun();
        set_bottom_shadow_fun();
        play_one_sound_fun();
    }
    function _root_setContextMenuFun() {
        _root_empiremue = new ContextMenu ();
        _root_empiremue.hideBuiltInItems();
        if (!Register_ed) {
            _root_empiremue.customItems.push(new ContextMenuItem ("AsFlipPage5.0.0 ", link_web_fun, true));
            _root_empiremue.customItems.push(new ContextMenuItem ("\u6CE8\u518C:" + Register_user, link_web_fun));
        }
        _root.menu = _root_empiremue;
    }
    function setContextMenuFun() {
        empiremue = new ContextMenu ();
        empiremue.hideBuiltInItems();
        empiremue.customItems.push(new ContextMenuItem ("\u9996\u9875", menu_cover_page_fun));
        empiremue.customItems.push(new ContextMenuItem ("\u76EE\u5F55", menu_list_page_fun));
        empiremue.customItems.push(new ContextMenuItem ("\u4E0B\u4E00\u9875", menu_next_page_fun));
        empiremue.customItems.push(new ContextMenuItem ("\u4E0A\u4E00\u9875", menu_prev_page_fun));
        empiremue.customItems.push(new ContextMenuItem ("\u5C3E\u9875", menu_back_page_fun));
        empiremue.customItems.push(new ContextMenuItem ("\u9000\u51FA", mouseFlashExitFun));
        if (!Register_ed) {
            empiremue.customItems.push(new ContextMenuItem ("AsFlipPage5.0.0", link_web_fun, true));
            empiremue.customItems.push(new ContextMenuItem ("\u6CE8\u518C\uFF1A" + Register_user, link_web_fun));
        }
        menu = empiremue;
    }
    function menu_cover_page_fun(item, item_menu) {
        item.flipCoverPage();
    }
    function menu_list_page_fun(item, item_menu) {
        item.flipListPage();
    }
    function menu_next_page_fun(item, item_menu) {
        item.flipNextPage();
    }
    function menu_prev_page_fun(item, item_menu) {
        item.flipPrevPage();
    }
    function menu_back_page_fun(item, item_menu) {
        item.flipBackPage();
    }
    function link_web_fun(item, item_menu) {
        item.getURL_fun();
    }
    function mouseFlashExitFun(item, item_menu) {
        if (item.if_set_local && (item.exit_mc_str.length >= 1)) {
            item._parent[item.exit_mc_str].swapDepths(item._parent.getNextHighestDepth());
            item._parent[item.exit_mc_str]._x = item._x + (item.stage_w / 2);
            item._parent[item.exit_mc_str]._y = item._y + (item.stage_h / 2);
            clearInterval(item.stop_time_si);
        } else {
            fscommand ("quit");
         }
    }
    function FlashExitFun() {
        if (if_set_local && (exit_mc_str.length >= 1)) {
            _parent[exit_mc_str].swapDepths(_parent.getNextHighestDepth());
            _parent[exit_mc_str]._x = _x + (stage_w / 2);
            _parent[exit_mc_str]._y = _y + (stage_h / 2);
            clearInterval(stop_time_si);
        } else {
            fscommand ("quit");
         }
    }
    function CancelFlashExitFun() {
        _parent[exit_mc_str]._x = -1000;
        if (if_auto_filp != "NO") {
            auto_filp_fun();
        }
    }
    function getFullscreenFun() {
        return (fullscreen_b);
    }
    function setFullscreenFun(b) {
        if (b) {
            fullscreen_b = b;
            fscommand ("fullscreen", true);
        } else {
            fullscreen_b = b;
            fscommand ("fullscreen", false);
         }
    }
    function FlipOnKeyUpDown_fun() {
        if (FlipOnKeyUpDown_b == "OnKeyUp") {
            onKeyUp = OnKeyUpDown_fun;
            Key.addListener(this);
        } else if (FlipOnKeyUpDown_b == "OnKeyDown") {
            onKeyDown = OnKeyUpDown_fun;
            Key.addListener(this);
        }
    }
    function OnKeyUpDown_fun() {
        var _local2 = Key.getCode();
        if (_local2 == FlipKey_object.PrevPageKey) {
            flipPrevPage();
        } else if (_local2 == FlipKey_object.NextPageKey) {
            flipNextPage();
        } else if (_local2 == FlipKey_object.CoverPageKey) {
            flipCoverPage();
        } else if (_local2 == FlipKey_object.BackPageKey) {
            flipBackPage();
        } else if (_local2 == FlipKey_object.ListPageKey) {
            flipListPage();
        }
    }
    var _RN = "0";
    var _SN = "0";
    var _RNU = "0";
    var bg_s_volume = 100;
    var loading_page_array = [];
    var loading_page_number_array = [];
    var point_xy_arry = [{}, {}, {}, {}];
    var tem_array = [{}, {}, {}, {}];
    var pauseBgSound_b = false;
    var Register_ed = false;
    var flip_end = true;
    var flip_ing = false;
    var CueHitArea_ing = false;
}
