( () => {
    window.track123Widget = {
        init: i,
        changeTab: function(e) {
            window.track123Widget.activeTab = e,
            window.track123Widget.init(window.track123Widget.config)
        },
        search: function(e, t) {
            let a = document.getElementById("track123-widget-search-num-input").value;
            a = a && (a = a.trim()).replace(/[\p{C}]/gu, "");
            var i = document.getElementById("track123-widget-iframe");
            i.src = "" + e + t + `/widgetIframe?trackNos=${a}&type=1`,
            i.style = a ? "height: 595px; border: 1px solid #E6E9EE; " : "height: 0; border: none;"
        },
        cargoSearch: function(e, t) {
            let a = document.getElementById("track123-widget-iframe")
              , i = document.getElementById("track123-widget-search-containerNo-input").value
              , r = document.getElementById("track123-widget-search-trackingNo-input").value;
            i = i && (i = i.trim()).replace(/[\p{C}]/gu, "");
            r = r && (r = r.trim()).replace(/[\p{C}]/gu, "");
            var c = document.getElementById("track123-widget-cargo-select")
              , n = window.track123Widget.cargoCompanyList[c.selectedIndex - 1]
              , d = document.getElementById("track123-widget-cargo-warning")
              , o = document.getElementById("track123-widget-search-cargo-warning")
              , o = (o.style = `display: ${c.selectedIndex ? "none" : "block"};`,
            document.getElementById("track123-widget-cargo-label"));
            o.style = `display: ${c.selectedIndex ? "block" : "none"};`,
            c.selectedIndex ? i || r ? (d.style = "display: none;",
            a.src = "" + e + t + `/widgetIframe?type=2&containerNo=${i}&trackingNo=${r}&carrierCode=` + n.carrierCode,
            a.style = "height: 595px;border: 1px solid #E6E9EE;") : (d.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16ZM7 6.9996C7 7.55188 7.44772 7.9996 8 7.9996C8.55229 7.9996 9 7.55188 9 6.9996V4.9996C9 4.44732 8.55229 3.9996 8 3.9996C7.44772 3.9996 7 4.44732 7 4.9996V6.9996ZM7 10.9996C7 11.5519 7.44772 11.9996 8 11.9996C8.55229 11.9996 9 11.5519 9 10.9996C9 10.4473 8.55229 9.9996 8 9.9996C7.44772 9.9996 7 10.4473 7 10.9996Z" fill="#E52E2E"/>
                </svg>
                <span>${window.track123Widget.languageMatch["请输入箱号或提单号/订舱号"]}</span>
            `,
            d.style = "display: flex;",
            a.style = "height: 0; border: none;") : d.style = "display: none;"
        },
        matchCargoCompany: function(e) {
            let t = "";
            "containerNo" === e ? t = document.getElementById("track123-widget-search-containerNo-input").value : "trackingNo" === e && (t = document.getElementById("track123-widget-search-trackingNo-input").value);
            fetch(window.track123Widget.baseUrl + "/tk/api/v1/anonymous/ocean/matching-courier", {
                method: "POST",
                body: JSON.stringify({
                    type: 1,
                    trackingNo: t
                }),
                headers: {
                    Accept: "application/json, */*",
                    "Content-Type": "application/json;charset=utf8"
                }
            }).then(e => e.json()).then(a => {
                let i = document.getElementById("track123-widget-cargo-select");
                "00000" === a.code && a.data && a.data.carrierCode && window.track123Widget.cargoCompanyList.forEach( (e, t) => {
                    e.carrierCode === a.data.carrierCode && (i.selectedIndex = t + 1)
                }
                )
            }
            )
        },
        activeTab: "1",
        cargoCompanyList: [],
        baseUrl: "https://www.track123.com"
    };
    var e = window.track123Widget.baseUrl + "/widget/index.css"
      , t = void 0
      , a = document.createElement("link");
    async function i() {
        let t = window.track123WidgetConfig || {};
        var e = document.getElementById("track123-tracking-widget")
          , a = t.language && "zh_CN" !== t.language ? "/" + t.language.split("_")[0] : ""
          , i = (i = t.language,
        await fetch(window.track123Widget.baseUrl + "/tk/api/v2/anonymous/track/language/list", {
            method: "POST",
            body: JSON.stringify({
                contentKey: "",
                localeLang: i,
                moduleName: "track123_toc"
            }),
            headers: {
                Accept: "application/json, */*",
                "Content-Type": "application/json;charset=utf8"
            }
        }).then(e => e.json()).then(e => {
            if ("00000" !== e.code)
                return {};
            {
                let t = {};
                return e.data.forEach(e => {
                    t[e.contentKey] = e.contentValue
                }
                ),
                t
            }
        }
        ));
        window.track123Widget.languageMatch = i,
        (2 == t.provider_type || 3 == t.provider_type && "2" === window.track123Widget.activeTab) && (window.track123Widget.cargoCompanyList = await fetch(window.track123Widget.baseUrl + "/tk/api/v1/anonymous/ocean/list-courier").then(e => e.json()).then(e => "00000" === e.code ? e.data : [])),
        e.style = "fixed" === t.width_type && t.width_value ? `width: ${t.width_value}px; min-width: 320px;` : "",
        e.innerHTML = `
            <div class="track123-widget-wrapper">
                <div class="track123-widget-search-container" style="${"fixed" === t.width_type && t.width_value && t.width_value < 500 ? "width: 100%;" : ""}">
                    ${3 == t.provider_type ? `
                            <div class="track123-widget-search-tab">
                                <div 
                                    onclick="window.track123Widget.changeTab('1')"
                                    class="track123-tab-item ${"1" === window.track123Widget.activeTab ? "track123-active-tab" : ""}"
                                    style="${"1" === window.track123Widget.activeTab ? "background: " + t.theme_color : ""}">
                                    ${i["快递&空运"]}
                                </div>
                                <div 
                                    onclick="window.track123Widget.changeTab('2')"
                                    class="track123-tab-item ${"2" === window.track123Widget.activeTab ? "track123-active-tab" : ""}"
                                    style="${"2" === window.track123Widget.activeTab ? "background: " + t.theme_color : ""}">
                                    ${i["海运"]}
                                </div>
                            </div>
                        ` : ""}
                    ${1 == t.provider_type || 3 == t.provider_type && "1" === window.track123Widget.activeTab ? `
                            <div class="track123-widget-search-input-content" style="${"fixed" === t.width_type && t.width_value && t.width_value < 500 ? "width: 100%;" : ""}">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C12.8487 19 14.551 18.3729 15.9056 17.3199L19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L17.3199 15.9056C18.3729 14.551 19 12.8487 19 11C19 6.58172 15.4183 3 11 3ZM5 11C5 7.68629 7.68629 5 11 5C14.3137 5 17 7.68629 17 11C17 14.3137 14.3137 17 11 17C7.68629 17 5 14.3137 5 11Z" fill="#A5ABB2"/>
                                </svg>
                                <input 
                                    type="text" 
                                    id="track123-widget-search-num-input" 
                                    value="" 
                                    placeholder="${i["请输入单号"]}" 
                                    style="border-color: ${t.theme_color};"/>
                            </div>
                            <div 
                                class="track123-widget-search-btn" 
                                style="background: ${t.theme_color};"
                                onclick="window.track123Widget.search('${t.api_base}','${a}')">
                                ${i["查询"]}
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5356 7.00012L7.24264 3.70718L8.65685 2.29297L14.3137 7.94982L8.65685 13.6067L7.24264 12.1925L10.435 9.00012H2V7.00012H10.5356Z" fill="white"/>
                                </svg>
                            </div>
                            <a href="https://www.track123.com/en?utm_medium=tracking_page" target="_blank" style="display: block !important;visibility: visible !important;text-align: center;font-size: 12px!important;color: #A5ABB2 !important;line-height: 16px!important;margin-top: 16px; cursor: pointer;font-size: 14px;">
                                Powered by Track123
                            </a>
                        ` : ""}
                    ${2 == t.provider_type || 3 == t.provider_type && "2" === window.track123Widget.activeTab ? `
                            <div class="track123-widget-cargo-search-container" style="border-color: ${t.theme_color};">
                                <div class="track123-widget-cargo-search-input-content">
                                    <div class="title">${i["柜号"]}</div>
                                    <input 
                                        type="text" 
                                        id="track123-widget-search-containerNo-input" 
                                        value="" 
                                        onchange="window.track123Widget.matchCargoCompany('containerNo')"
                                        placeholder="${i["请输入"]}" />
                                    <div class="track123-widget-warning" id="track123-widget-search-containerNo-warning">${i["请输入柜号"]}</div>
                                </div>
                                <div class="track123-widget-cargo-search-input-content">
                                    <div class="title">${i["提单号/订舱号"]}</div>
                                    <input 
                                        type="text" 
                                        id="track123-widget-search-trackingNo-input" 
                                        value="" 
                                        onchange="window.track123Widget.matchCargoCompany('trackingNo')"
                                        placeholder="${i["请输入"]}" />
                                    <div class="track123-widget-warning" id="track123-widget-search-trackingNo-warning">${i["请输入提单号/订舱号"]}</div>
                                </div>
                                <div class="track123-widget-cargo-search-input-content">
                                    <div id="track123-widget-cargo-label" class="title">${i["船公司"]}</div>
                                    <div class="track123-widget-warning" id="track123-widget-search-cargo-warning">${i["请选择船公司"]}</div>
                                    <select id="track123-widget-cargo-select">
                                        <option value='' disabled selected style='display:none;'>${i["请选择"]}</option>
                                        ${window.track123Widget.cargoCompanyList.map(e => `<option value="${e.carrierCode}">${"zh_CN" === t.language ? e.carrierNameCN : e.carrierNameEN}</option>`)}
                                    </select>
                                </div>
                            </div>
                            <div id="track123-widget-cargo-warning"></div>
                            <div 
                                class="track123-widget-search-btn" 
                                style="background: ${t.theme_color};"
                                onclick="window.track123Widget.cargoSearch('${t.api_base}','${a}')">
                                ${i["查询"]}
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5356 7.00012L7.24264 3.70718L8.65685 2.29297L14.3137 7.94982L8.65685 13.6067L7.24264 12.1925L10.435 9.00012H2V7.00012H10.5356Z" fill="white"/>
                                </svg>
                            </div>
                            <a href="https://www.track123.com/en?utm_medium=tracking_page" target="_blank" style="display: block !important;visibility: visible !important;text-align: center;font-size: 12px!important;color: #A5ABB2 !important;line-height: 16px!important;margin-top: 16px; cursor: pointer;font-size: 14px;">
                                Powered by Track123
                            </a>
                        ` : ""}
                </div>
                ${1 == t.provider_type || 3 == t.provider_type && "1" === window.track123Widget.activeTab ? `<iframe id="track123-widget-iframe" src="${t.api_base}${a}/widgetIframe?type=1"></iframe>` : ""}
                ${2 == t.provider_type || 3 == t.provider_type && "2" === window.track123Widget.activeTab ? `<iframe id="track123-widget-iframe" src="${t.api_base}${a}/widgetIframe?type=2"></iframe>` : ""}
            </div>
        `;
        let r = document.getElementById("track123-widget-cargo-select");
        r && r.addEventListener("change", () => {
            r.value && (document.getElementById("track123-widget-search-cargo-warning").style = "display: none;",
            document.getElementById("track123-widget-cargo-label").style = "display: block;")
        }
        ),
        window.addEventListener("message", function(e) {
            e.data && "ToTrack123Widget" === e.data.type && (document.getElementById("track123-widget-iframe").style = `height: ${e.data.height || 595}px; border: 1px solid #E6E9EE;`)
        })
    }
    a.setAttribute("rel", "stylesheet"),
    a.setAttribute("href", e),
    t && a.setAttribute("media", t),
    document.getElementsByTagName("head")[0].appendChild(a),
    i()
}
)();
